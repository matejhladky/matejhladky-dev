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
  document.getElementById('loader').style.display = 'block';
  document.getElementById('prioritized-heading').style.display = 'none';
  document.getElementById('other-heading').style.display = 'none';
  document.getElementById('prioritized-list').style.display = 'none';
  document.getElementById('other-list').style.display = 'none';

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

    document.getElementById('loader').style.display = 'none';
    document.getElementById('prioritized-heading').style.display = 'block';
    document.getElementById('other-heading').style.display = 'block';
    prioritizedList.style.display = 'block';
    otherList.style.display = 'block';

  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);
