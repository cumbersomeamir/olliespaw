import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

function getClientPromise() {
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local or Vercel environment variables');
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

// Lazy initialization - only connect when function is called
export default function connectDB() {
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local or Vercel environment variables');
  }
  
  if (!clientPromise) {
    clientPromise = getClientPromise();
  }
  return clientPromise;
}

