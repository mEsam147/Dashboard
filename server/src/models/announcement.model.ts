import mongoose, { Schema, model, Document } from "mongoose";

interface Announcement {
  title: string;
  description: string;
  author: string;
}

const announcementSchema = new Schema<Announcement>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Announcement = model<Announcement>("announcement", announcementSchema);

export default Announcement;