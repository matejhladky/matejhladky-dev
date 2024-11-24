import { formatDate } from "./utils";

async function fetchAndDisplayArticles() {
    const articlePreviewsList = document.querySelector('.articles-previews-list');

    try {
        const response = await fetch('/api/getArticles');
        if (!response.ok) throw new Error("Failed to fetch articles from server");

        const articles = await response.json();
        console.log(articles);

        for (let article of articles) {
            const articlePreview = createArticlePreviewComponent(article);
            articlePreviewsList.appendChild(articlePreview);
        }
    } catch (error) {
        console.error("Error loading articles:", error);
    }
}

// Extracts first image as thumbnail and removes html tags from content
const processArticle = (content) => {
    let tmp = document.createElement('div');
    tmp.innerHTML = content;

    let firstImageSrc = null;
    const images = tmp.getElementsByTagName('img');
    if (images.length > 0) { firstImageSrc = images[0].src; }

    Array.from(tmp.getElementsByTagName('figcaption')).forEach(figCaption => figCaption.replaceWith(" "));
    const textContent = (tmp.textContent || tmp.innerText || "").substring(0, 350) + "...";

    return { textContent, firstImageSrc };
  };

const createArticlePreviewComponent = (article) => {
    const articlePreviewContainer = document.createElement('li');
    articlePreviewContainer.className = 'article-preview-card';

    const articlePreview = document.createElement('a');
    articlePreview.href = article.url;

    const title = document.createElement('h2');
    title.textContent = article.title;
    articlePreview.appendChild(title);

    const pubDate = document.createElement('p');
    pubDate.className = 'pub-date fs-300 text-neutral-700';
    pubDate.textContent = formatDate(article.date_published);
    articlePreview.appendChild(pubDate);

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex-container';
    articlePreview.appendChild(flexContainer);

    const processedContent = processArticle(article.content_html);

    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'thumbnail-container';
    flexContainer.appendChild(thumbnailContainer);

    const thumbnail = document.createElement('img');
    thumbnail.src = processedContent.firstImageSrc;
    thumbnailContainer.appendChild(thumbnail);
    
    const contentPreview = document.createElement('p');
    contentPreview.textContent = processedContent.textContent;
    contentPreview.className = 'fs-400 text-neutral-700 ff-secondary';
    flexContainer.appendChild(contentPreview);

    articlePreviewContainer.appendChild(articlePreview);

    return articlePreviewContainer;
  };


document.addEventListener('DOMContentLoaded', fetchAndDisplayArticles);
