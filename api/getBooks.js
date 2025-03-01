import { Client } from '@notionhq/client';

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function fetchDatabaseEntries(client, databaseId) {
  const results = [];
  let hasMore = true;
  let nextCursor = undefined;

  try {
    while (hasMore) {
      const response = await client.databases.query({
        database_id: databaseId,
        start_cursor: nextCursor,
      });

      results.push(...response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    }
  } catch (error) {
    console.error("Error fetching data from Notion:", error);
    throw new Error("Failed to retrieve data from Notion");
  }

  return results;
}

function formatBooksData(rawData) {
  return rawData
    .map(item => ({
      title: item.properties.Name?.title[0]?.plain_text || "Untitled",
      author: item.properties.Author?.rich_text[0]?.plain_text || "---",
      prioritized: item.properties.Priority?.checkbox || false,
      tag: item.properties.Select?.select?.name || null,
    }))
    .filter(book => book.tag === "To Buy")
    .sort((a, b) => a.title.localeCompare(b.title));
}

export default async function handler(req, res) {
  try {
    const rawData = await fetchDatabaseEntries(notionClient, databaseId);
    const formattedData = formatBooksData(rawData);

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
