function createBookListItem(book) {
  const listItem = document.createElement('li');

  // strip numbers at the beginning of the title
  const strippedTitle = book.title.replace(/^\d+\.\s*/, '');

  const authorSpan = document.createElement('span');
  authorSpan.textContent = book.author || "Unknown Author";
  authorSpan.className = 'author';

  const titleSpan = document.createElement('span');
  titleSpan.textContent = `: ${strippedTitle || "Untitled"}`;
  titleSpan.className = 'title';

  listItem.appendChild(authorSpan);
  listItem.appendChild(titleSpan);

  return listItem;
}


async function fetchAndDisplayBooks() {
  const loader = document.getElementById('loader');
  const prioritizedList = document.getElementById('prioritized-list');
  const otherList = document.getElementById('other-list');

  loader.style.display = 'block';
  prioritizedList.style.display = 'none';
  otherList.style.display = 'none';

  try {
    const response = await fetch('/api/getBooks');
    const books = await response.json();

    prioritizedList.innerHTML = '';
    otherList.innerHTML = '';

    books.forEach(book => {
      const listItem = createBookListItem(book);
      if (book.prioritized) {
        prioritizedList.appendChild(listItem);
      } else {
        otherList.appendChild(listItem);
      }
    });

    loader.style.display = 'none';
    prioritizedList.style.display = 'block';
    otherList.style.display = 'block';
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);
