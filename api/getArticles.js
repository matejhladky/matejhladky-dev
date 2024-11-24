export default async function handler(req, res) {
    const username = 'matejhladky';
    const RSSUrl = `https://medium.com/feed/@${username}`;
    const proxyUrl = 'https://corsproxy.io/?';
    const RSSConverter = `${proxyUrl}https://www.toptal.com/developers/feed2json/convert?url=${RSSUrl}`;

    try {
        const response = await fetch(RSSConverter);
        if (!response.ok) {
            console.error(`Failed to fetch Medium RSS: ${response.statusText}`);
            return res.status(500).json({ error: "Failed to fetch Medium articles" });
        }

        const data = await response.json();
        const articles = data.items.map(item => ({
            title: item.title,
            url: item.url,
            date_published: item.date_published,
            content_html: item.content_html,
        }));

        res.status(200).json(articles);
    } catch (error) {
        console.error("Error in getMediumArticles API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}