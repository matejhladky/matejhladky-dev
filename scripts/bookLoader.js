function createBookListItem(book) {
  const listItem = document.createElement('li');

  const authorSpan = document.createElement('span');
  authorSpan.textContent = book.author || "Unknown Author";
  authorSpan.className = 'author';

  const titleSpan = document.createElement('span');
  titleSpan.textContent = `: ${book.title || "Untitled"}`;
  titleSpan.className = 'title';

  listItem.appendChild(authorSpan);
  listItem.appendChild(titleSpan);

  return listItem;
}

async function fetchAndDisplayBooks() {
  try {
    const response = await fetch('/api/getBooks');
    const books = await response.json();

    const prioritizedList = document.getElementById('prioritized-list');
    const otherList = document.getElementById('other-list');

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
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);
