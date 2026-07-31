import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'b7wqv3yo',
  dataset: 'production',
  useCdn: false, // Set to false to bypass cache and get fresh content immediately in development
  apiVersion: '2024-01-01'
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
    if (!child.marks || !Array.isArray(child.marks) || child.marks.length === 0) {
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
          const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
          text = `<a href="${escapeHtml(href)}"${target} class="content-link">${text}</a>`;
        } else if (def._type === 'fontFamily') {
          const fontClass = `font-family-${def.family || 'sans'}`;
          text = `<span class="${fontClass}">${text}</span>`;
        } else if (def._type === 'textColor') {
          const colorClass = `text-color-${def.color || 'brand-red'}`;
          text = `<span class="${colorClass}">${text}</span>`;
        } else if (def._type === 'fontSize') {
          const sizeClass = `text-size-${def.size || 'md'}`;
          text = `<span class="${sizeClass}">${text}</span>`;
        } else if (def._type === 'textAlignment') {
          const alignClass = `text-align-${def.alignment || 'left'}`;
          text = `<span class="${alignClass}">${text}</span>`;
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
        if (style === 'center') alignClass = ' text-center';
        else if (style === 'right') alignClass = ' text-right';
        else if (style === 'left') alignClass = ' text-left';
        else if (style === 'justify') alignClass = ' text-justify';

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
