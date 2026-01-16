import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    brand: { type: String, default: "Ollie’s Paw" },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    badge: { type: String, enum: ["new", "exclusive", "low", null], default: null },
    category: { type: String, default: "all" },
    weight: { type: Number },
    dietaryInfo: { type: String, default: "" },
    deliveryTime: { type: String, default: "" },
    accent: { type: String, default: "#00ff95" },
    images: { type: [ImageSchema], default: [] },
    description: { type: String, default: "" },
    nutritionInfo: { type: String, default: "" },
    feedingInstructions: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    specs: {
      type: [{ key: String, value: String }],
      default: [],
      _id: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);


