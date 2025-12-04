import mongoose, { Schema } from "mongoose";
import { dbConnect } from "@/lib/mongodb";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create indexes for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ mobileNumber: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function createUser(userData) {
  try {
    await dbConnect();
    
    // Check if user already exists by email or mobile number
    const existingUser = await User.findOne({
      $or: [
        { email: userData.email },
        { mobileNumber: userData.mobileNumber }
      ]
    });

    if (existingUser) {
      throw new Error('User already exists with this email or mobile number');
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return { success: true, userId: savedUser._id };
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    await dbConnect();
    return await User.findOne({ email: email.toLowerCase().trim() }).lean();
  } catch (error) {
    throw error;
  }
}

export async function findUserByMobile(mobileNumber) {
  try {
    await dbConnect();
    return await User.findOne({ mobileNumber }).lean();
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmailOrMobile(email, mobileNumber) {
  try {
    await dbConnect();
    const orConditions = [];
    if (email) {
      orConditions.push({ email: email.toLowerCase().trim() });
    }
    if (mobileNumber) {
      orConditions.push({ mobileNumber });
    }
    return await User.findOne({ $or: orConditions }).lean();
  } catch (error) {
    throw error;
  }
}

