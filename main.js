import './style.css'

// main.js

//// Function to create a styled list item for a book
//function createBookListItem(book) {
//  const listItem = document.createElement('li');
//
//  const authorSpan = document.createElement('span');
//  authorSpan.textContent = book.author || "Unknown Author";
//  authorSpan.className = 'author';
//
//  const titleSpan = document.createElement('span');
//  titleSpan.textContent = `: ${book.title || "Untitled"}`;
//  titleSpan.className = 'title';
//
//  listItem.appendChild(authorSpan);
//  listItem.appendChild(titleSpan);
//
//  return listItem;
//}
//
//// Fetch books from the API and display them
//async function fetchAndDisplayBooks() {
//  try {
//    // Fetch book data from the serverless API endpoint
//    const response = await fetch('/api/getBooks');
//    const books = await response.json();
//
//    // Get references to the HTML lists
//    const prioritizedList = document.getElementById('prioritized-list');
//    const otherList = document.getElementById('other-list');
//
//    // Clear any existing content
//    prioritizedList.innerHTML = '';
//    otherList.innerHTML = '';
//
//    // Filter and sort books, then distribute them
//    books.forEach(book => {
//      const listItem = createBookListItem(book);
//      if (book.prioritized === "Yes") {
//        prioritizedList.appendChild(listItem);
//      } else {
//        otherList.appendChild(listItem);
//      }
//    });
//  } catch (error) {
//    console.error('Error fetching books:', error);
//  }
//}
//
//// Run the function to fetch and display books when the page loads
//document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);
