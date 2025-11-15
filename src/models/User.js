import connectDB from '@/lib/mongodb';

const DB_NAME = 'olliespaw';
const COLLECTION_NAME = 'login';

export async function createUser(userData) {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Check if user already exists by email or mobile number
    const existingUser = await collection.findOne({
      $or: [
        { email: userData.email },
        { mobileNumber: userData.mobileNumber }
      ]
    });

    if (existingUser) {
      throw new Error('User already exists with this email or mobile number');
    }

    // Add createdAt timestamp
    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newUser);
    return { success: true, userId: result.insertedId };
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    return await collection.findOne({ email });
  } catch (error) {
    throw error;
  }
}

export async function findUserByMobile(mobileNumber) {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    return await collection.findOne({ mobileNumber });
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmailOrMobile(email, mobileNumber) {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    return await collection.findOne({
      $or: [
        { email },
        { mobileNumber }
      ]
    });
  } catch (error) {
    throw error;
  }
}

