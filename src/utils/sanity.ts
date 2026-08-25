import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const SANITY_PROJECT_ID = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'b7wqv3yo';
const SANITY_DATASET = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, // false to ensure published changes appear immediately on refresh
  apiVersion: '2025-07-01'
})

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: any): string | null {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (source.asset) {
    try {
      return builder.image(source).auto('format').url();
    } catch {
      return null;
    }
  }
  return null;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderChildren(block: any): string {
  if (!block.children || !Array.isArray(block.children)) return '';
  
  const markDefsMap: Record<string, any> = {};
  if (block.markDefs && Array.isArray(block.markDefs)) {
    for (const def of block.markDefs) {
      if (def && def._key) {
        markDefsMap[def._key] = def;
      }
    }
  }

  return block.children.map((child: any) => {
    if (!child) return '';
    let text = escapeHtml(child.text || '');
    if (text) {
      text = text.replace(/\n/g, '<br />');
    }
    // If the text is empty or only whitespace/line-breaks, don't wrap it in
    // formatting marks — doing so (e.g. <strong><br /></strong>) produces
    // spurious new lines when Sanity emits boundary spans around bold text.
    if (!child.marks || !Array.isArray(child.marks) || child.marks.length === 0) {
      return text;
    }
    if (!child.text || !child.text.trim()) {
      return text;
    }

    for (const markKey of child.marks) {
      if (markKey === 'strong') {
        text = `<strong>${text}</strong>`;
      } else if (markKey === 'em') {
        text = `<em>${text}</em>`;
      } else if (markKey === 'underline') {
        text = `<u>${text}</u>`;
      } else if (markKey === 'strike-through') {
        text = `<s>${text}</s>`;
      } else if (markKey === 'code') {
        text = `<code>${text}</code>`;
      } else if (markKey.startsWith('color-')) {
        const colorName = markKey.replace('color-', '');
        text = `<span class="text-color-${colorName}">${text}</span>`;
      } else if (markDefsMap[markKey]) {
        const def = markDefsMap[markKey];
        if (def._type === 'link') {
          let href = def.href || '#';
          if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('/') && !href.startsWith('#')) {
            if (href.includes('@')) {
              href = `mailto:${href}`;
            }
          }
          // Append ?subject= for mailto: links when a subject is provided
          if (href.startsWith('mailto:') && def.subject) {
            href += `?subject=${encodeURIComponent(def.subject)}`;
          }
          const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
          text = `<a href="${escapeHtml(href)}"${target} class="content-link">${text}</a>`;
        } else if (def._type === 'fontFamily') {
          if (def.family && def.family !== 'default') {
            text = `<span class="font-family-${def.family}">${text}</span>`;
          }
        } else if (def._type === 'textColor') {
          if (def.color && def.color !== 'default' && def.color !== 'none') {
            text = `<span class="text-color-${def.color}">${text}</span>`;
          }
        } else if (def._type === 'fontSize') {
          if (def.size && def.size !== 'default') {
            text = `<span class="text-size-${def.size}">${text}</span>`;
          }
        } else if (def._type === 'textAlignment') {
          // Alignment is applied at the paragraph level (see portableTextToHtml),
          // never as an inline span — so we skip wrapping here intentionally.
        } else if (def._type === 'pdfDownload') {
          // Build CDN URL from Sanity file asset reference
          // ref format: "file-{hash}-pdf" → https://cdn.sanity.io/files/{projectId}/{dataset}/{hash}.pdf
          const assetRef = def.file?.asset?._ref || '';
          let pdfUrl = '';
          if (assetRef) {
            const parts = assetRef.replace(/^file-/, '').split('-');
            const ext = parts.pop(); // last part is the extension (e.g. "pdf")
            const hash = parts.join('-');
            pdfUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${hash}.${ext}`;
          }
          if (pdfUrl) {
            const dlAttr = def.filename ? ` download="${escapeHtml(def.filename)}"` : ' download';
            text = `<a href="${pdfUrl}"${dlAttr} class="content-link pdf-download-link" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline;vertical-align:-1px;margin-right:3px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>${text}</a>`;
          }
        } else if (def._type === 'lineSpacing') {
          if (def.spacing && def.spacing !== 'default') {
            text = `<span class="line-spacing-${def.spacing}">${text}</span>`;
          }
        }
      }
    }
    return text;
  }).join('');
}

export function portableTextToHtml(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') {
    return `<p class="block-paragraph">${escapeHtml(blocks).replace(/\n/g, '<br />')}</p>`;
  }
  if (!Array.isArray(blocks)) return '';

  let html = '';
  let currentListType: string | null = null;

  const closeList = () => {
    if (currentListType === 'bullet') {
      html += '</ul>';
    } else if (currentListType === 'number') {
      html += '</ol>';
    }
    currentListType = null;
  };

  for (const block of blocks) {
    if (!block) continue;

    // 1. Line Separator element
    if (block._type === 'separator' || block._type === 'hr' || block._type === 'lineBreak') {
      closeList();
      const style = block.style || 'thin';
      html += `<hr class="content-separator separator-${style}" />`;
      continue;
    }

    // 2. Quote Block element
    if (block._type === 'quote') {
      closeList();
      const quoteText = block.text || '';
      const author = block.author || '';
      const role = block.role || '';
      const borderStyle = block.borderStyle || 'accent-left';
      html += `
        <blockquote class="content-quote quote-${borderStyle}">
          <p class="quote-text">"${escapeHtml(quoteText)}"</p>
          ${(author || role) ? `<cite class="quote-author">— ${escapeHtml(author)}${role ? `, <span class="quote-role">${escapeHtml(role)}</span>` : ''}</cite>` : ''}
        </blockquote>
      `;
      continue;
    }

    // 3. Embedded Image element
    if (block._type === 'image' || block._type === 'imageBlock') {
      closeList();
      const imgUrl = urlForImage(block);
      if (imgUrl) {
        html += `
          <figure class="content-embedded-image">
            <img src="${imgUrl}" alt="${escapeHtml(block.alt || '')}" loading="lazy" />
            ${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ''}
          </figure>
        `;
      }
      continue;
    }

    // 4. Standard Block element (Paragraphs, Headings, Lists)
    if (block._type === 'block') {
      const isListItem = Boolean(block.listItem);
      const listType = block.listItem; // 'bullet' or 'number'

      if (isListItem) {
        if (currentListType !== listType) {
          closeList();
          currentListType = listType;
          html += listType === 'bullet' ? '<ul class="content-list bullet-list">' : '<ol class="content-list number-list">';
        }
        let innerText = renderChildren(block);
        if (!innerText || !innerText.trim()) {
          innerText = '<br />';
        }
        html += `<li>${innerText}</li>`;
      } else {
        closeList();
        let innerText = renderChildren(block);
        if (!innerText || !innerText.trim()) {
          innerText = '<br />';
        }
        const style = block.style || 'normal';
        let alignClass = '';
        if (style === 'center') alignClass = ' text-align-center';
        else if (style === 'right') alignClass = ' text-align-right';
        else if (style === 'left') alignClass = ' text-align-left';
        else if (style === 'justify') alignClass = ' text-align-justify';

        // Also pick up textAlignment annotation if applied to any child span
        if (!alignClass && block.markDefs && Array.isArray(block.markDefs)) {
          const alignDef = block.markDefs.find(
            (def: any) => def._type === 'textAlignment' && def.alignment && def.alignment !== 'default'
          );
          if (alignDef) alignClass = ` text-align-${alignDef.alignment}`;
        }

        let tag = 'p';
        if (style === 'h2') tag = 'h2';
        else if (style === 'h3') tag = 'h3';
        else if (style === 'h4') tag = 'h4';
        else if (style === 'blockquote') tag = 'blockquote';

        let extraClass = style === 'lead' ? ' lead-text' : '';
        if (tag === 'blockquote') extraClass += ' content-quote quote-accent-left';

        html += `<${tag} class="block-paragraph${alignClass}${extraClass}">${innerText}</${tag}>`;
      }
    }
  }

  closeList();
  return html;
}
