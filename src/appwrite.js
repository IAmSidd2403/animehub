import { Client, Databases, ID, Query } from "appwrite";

// ENV
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// CLIENT
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

/**
 * 🔥 Update search count OR create new trending anime
 */
export const updateSearchCount = async (searchTerm, anime) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", searchTerm)]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        {
          count: doc.count + 1,
          anime: anime?.title || doc.anime,
          anime_id: anime?.mal_id || doc.anime_id,
          poster_url: anime?.images?.jpg?.image_url || doc.poster_url,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          anime: anime?.title || "",
          anime_id: anime?.mal_id || null,
          poster_url: anime?.images?.jpg?.image_url || "",
        }
      );
    }
  } catch (error) {
    console.error("❌ Appwrite updateSearchCount error:", error);
  }
};

/**
 * 🚀 Get Trending Anime (Top searched)
 */
export const getTrendingAnime = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.orderDesc("count"),
        Query.limit(5),
      ]
    );

    return result.documents;
  } catch (error) {
    console.error("❌ Appwrite getTrendingAnime error:", error);
    return [];
  }
};