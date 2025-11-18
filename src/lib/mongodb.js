import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  // Intentionally do not throw to allow client-side fallback.
  // eslint-disable-next-line no-console
  console.warn("[mongodb] MONGODB_URI is not set. API will use in-memory fallback.");
}

let cached = global._mongooseCached;
if (!cached) {
  cached = global._mongooseCached = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) return null;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "olliespaw",
        bufferCommands: false,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
