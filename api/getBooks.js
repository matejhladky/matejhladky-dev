// api/getBooks.js

import { Client } from '@notionhq/client';

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export const dynamic = 'force-dynamic';

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
  return rawData.map(item => ({
    title: item.properties.Name?.title[0]?.plain_text || "Untitled",
    author: item.properties.Author?.rich_text[0]?.plain_text || "---",
    prioritized: item.properties.Priority?.checkbox || false
  }));
}

// Vercel API handler
export async function GET(request) {
  try {
    const rawData = await fetchDatabaseEntries(notionClient, databaseId);
    const formattedData = formatBooksData(rawData);

    if (rawData.length > 0) {
      console.log("Fields available in each book entry:", rawData[0].properties);
    }

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

