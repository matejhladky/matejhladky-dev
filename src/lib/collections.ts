// Reads the plain-text lists in src/data/ and turns them into what the library
// page needs. Format of a list file (also explained at the top of each file):
//
//   # priority                ← section headers, exactly these three
//   - Author: Title
//   - Author: Title https://… ← optional shop link at the end
//
//   # other
//   - Author: Title
//
//   # hidden                  ← never rendered
//   - Author: Title
//
// Any other line starting with # is a comment; blank lines don't matter.
// The split is at the first colon, so titles may contain colons; authors can't.
//
// Record covers: put an image in src/data/covers/ named after the record,
// e.g. "Lana Del Rey: Blue Banisters" → lana-del-rey-blue-banisters.jpg.
// Records without one get a placeholder.

import type { ImageMetadata } from 'astro';
import booksText from '../data/books.txt?raw';
import lpsText from '../data/lps.txt?raw';

/** One row on the library page. `by` is the author or the artist. */
export interface Item {
  title: string;
  by: string;
  /** Where to buy it. Without it the title is plain text. */
  url?: string;
  /** Records only: the cover image, if there is one. */
  cover?: ImageMetadata;
}

export interface List {
  priority: Item[];
  other: Item[];
}

type Sections = [priority: Item[], other: Item[], hidden: Item[]];
const HEADERS = ['# priority', '# other', '# hidden'];

function parse(text: string, file: string): Sections {
  const sections: Sections = [[], [], []];
  let section = -1;

  text.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    const where = `${file}:${i + 1}`;

    if (line === '') return;
    if (HEADERS.includes(line.toLowerCase())) {
      section = HEADERS.indexOf(line.toLowerCase());
      return;
    }
    if (line.startsWith('#')) return;
    if (section === -1) {
      throw new Error(`${where}: entry before any "# priority", "# other" or "# hidden" header`);
    }

    let entry = line.replace(/^-\s*/, '');
    let url: string | undefined;
    const link = entry.match(/\s(https?:\/\/\S+)$/);
    if (link) {
      url = link[1];
      entry = entry.slice(0, link.index).trim();
    }

    const colon = entry.indexOf(':');
    const by = entry.slice(0, colon).trim();
    const title = entry.slice(colon + 1).trim();
    if (colon === -1 || !by || !title) {
      throw new Error(`${where}: expected "- Author: Title", got "${line}"`);
    }

    sections[section].push({ title, by, url });
  });

  return sections;
}

/** Public part of a list, in the order it's written in the file. */
function publish([priority, other]: Sections): List {
  return { priority, other };
}

/** "Lana Del Rey: Blue Banisters" → "lana-del-rey-blue-banisters" */
export function slug(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents: ž → z
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Every image in src/data/covers/, keyed by file name without the extension.
const coverFiles = import.meta.glob<ImageMetadata>('../data/covers/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});
const covers = new Map(
  Object.entries(coverFiles).map(([path, image]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), image]),
);

const recordSections = parse(lpsText, 'src/data/lps.txt');
const used = new Set<string>();
for (const item of recordSections.flat()) {
  const name = slug(`${item.by} ${item.title}`);
  item.cover = covers.get(name);
  if (item.cover) used.add(name);
}
for (const name of covers.keys()) {
  if (!used.has(name)) console.warn(`[covers] src/data/covers/${name}.* doesn't match any record in lps.txt`);
}

export const library = publish(parse(booksText, 'src/data/books.txt'));
export const records = publish(recordSections);
