import { generateEmbeddings } from './embeddings';
const ASTRA_TOKEN = "ASTRA_DB_TOKEN";
const ASTRA_ENDPOINT = "ASTRA_DB_ENDPOINT";

import { DataAPIClient } from '@datastax/astra-db-ts';

const dbClient = new DataAPIClient(ASTRA_TOKEN, {
    httpOptions: { client: 'fetch' },
});

const db = dbClient.db(ASTRA_ENDPOINT, { token: ASTRA_TOKEN })

export async function getDBResponse(query) {
    const vector = await generateEmbeddings(query);
    const collection = await db.collection("rds_vector_collection");
    const cursor = collection.find(null, {
        sort: {
            $vector: vector
        },
        limit: 10,
        includeSortVector: true
    });
    const documents = (await cursor.toArray()).map((doc) => doc.text);
    return JSON.stringify(documents);
}

