import { formatDate } from "./utils";

async function fetchAndDisplayArticles() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

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

    loader.style.display = 'none';
}

const hardcodedArticles = [
    {
        title: "How I Built a Real Self-Driving Car from Scratch",
        url: "https://medium.com/codex/how-i-built-a-real-self-driving-car-from-scratch-409998d708a",
        date_published: "2022-11-10T00:00:00.000Z",
        content_html: `
        <p>After my second year of university in the summer of 2021, I decided to work on one of the most advanced projects up to that time — developing an autopilot software from scratch and implementing it in a real car. After making some of the main parts of my code public and publishing a demo video, I received many questions about the project. Therefore, I decided to share the story behind the development process.</p>
        <figure>
          <img src="https://miro.medium.com/v2/resize:fit:1235/1*gSm6UkIxIK15WUPIhyDaWA.png" alt="">
        </figure>
      `,
    },
    {
        title: "The Reality of AI's Limits: Computational Boundaries of Neural Networks",
        url: "https://pub.towardsai.net/the-reality-of-ais-limits-computational-boundaries-of-neural-networks-6bf3a3850af4",
        date_published: "2024-03-20T00:00:00.000Z",
        content_html: `
        <p>As we navigate through an era where Artificial Intelligence (AI) breakthroughs happen almost daily, it might seem there’s no limit to what AI can do. Is there a ceiling to the current direction of AI’s capabilities at large?</p>
        <figure>
          <img src="https://miro.medium.com/v2/resize:fit:1235/1*iLNMAYg-e9jQcrJ6xSIRVQ.jpeg" alt="">
        </figure>
      `,
    },
    {
        title: "Why is Probability Important for Machine Learning?",
        url: "https://pub.towardsai.net/why-is-probability-important-for-machine-learning-e424442f6e99",
        date_published: "2022-12-10T00:00:00.000Z",
        content_html: `
        <p>Probability, Statistics, and Information Theory are topics you are guaranteed to encounter on your path to becoming a Machine Learning superstar. Nevertheless, if you come from a Computer Science or Software Engineering background, you might question the importance of these skills when it comes to applying your knowledge to solving actual problems. </p>
        <figure>
          <img src="https://miro.medium.com/v2/resize:fit:1235/0*UtVEThxrh6vnLYQp" alt="">
        </figure>
      `,
    },
    {
        title: "History of Self-Driving Cars",
        url: "https://medium.com/codex/history-of-self-driving-cars-350bff0aa495",
        date_published: "2022-10-03T00:00:00.000Z",
        content_html: `
        <p>The promise of self-driving cars of making our transportation safer, more convenient and more efficient is clearly immensely attractive. No longer would it be necessary to concentrate on the driving task, and we would have more time for other activities. But numerous other reasons justify the research and development of driverless technology.</p>
        <figure>
          <img src="https://miro.medium.com/v2/resize:fit:1235/1*mC9xBllNWKpRWjMKvBuTfA.png" alt="">
        </figure>
      `,
    },
    {
        title: "Differences Between Artificial Intelligence, Machine Learning, and Deep Learning",
        url: "https://medium.com/@matejhladky/differences-between-artificial-intelligence-machine-learning-and-deep-learning-2a1de8c8c041",
        date_published: "2022-11-22T00:00:00.000Z",
        content_html: `
        <p>We all hear the term “Artificial Intelligence” used in some context almost daily. Some people go a step further and use the more technically sounding buzzword “Machine Learning” or even a wilder term — “Deep Learning.”
While these terms are often used interchangeably, they do not refer to the exact same thing.</p>
        <figure>
          <img src="https://miro.medium.com/v2/resize:fit:1235/1*uhKtnogy7n1cuNc12dXFvw.png" alt="">
        </figure>
      `,
    },
];

function displayHardcodedArticles() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const articlePreviewsList = document.querySelector('.articles-previews-list');

    // clear existing content
    articlePreviewsList.innerHTML = '';

    hardcodedArticles.forEach(article => {
        const articlePreview = createArticlePreviewComponent(article);
        articlePreviewsList.appendChild(articlePreview);
    });

    loader.style.display = 'none';
}

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
    pubDate.className = 'pub-date fs-300 text-neutral-700 ff-secondary';
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


// document.addEventListener('DOMContentLoaded', fetchAndDisplayArticles);
document.addEventListener('DOMContentLoaded', displayHardcodedArticles);
