import { Request, Response } from "express";
import Announcement from "../models/announcement.model";

export const getAllAnnouncements = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    res.status(200).json(announcements);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching announcements:", err);
      res
        .status(500)
        .json({ message: "Error fetching announcements" + err.message });
    }
  }
};

export const getSingleAnnouncement = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      res.status(404).json({
        message: "Announcement not found",
      });
      res.json(announcement);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching announcements:", err);
      res.status(500).json({ message: err.message });
    }
  }
  {
  }
};
export const createAnnouncement = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, author } = req.body;
  try {
    const announcement = await new Announcement({
      title,
      description,
      author,
    });
    await announcement.save();
    res
      .status(201)
      .json({ announcement, message: "Announcement created successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching announcements:", err);
      res.status(500).json({ message: err.message });
    }
  }
  {
  }
};
export const updateAnnouncement = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, description, author } = req.body;
  try {
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      res.status(404).json({
        message: "Announcement not found",
      });
      return;
    }
    await Announcement.findByIdAndUpdate(id, { title, description, author });
    res.status(200).json({ message: "Announcement updated successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error updating announcement:", err);
      res.status(500).json({ message: err.message });
    }
  }
};

export const deleteAnnouncement = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      res.status(404).json({ message: "Announcement not found" });
      return;
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting announcement:", error);
      res.status(500).json({ message: error.message });
    }
  }
};
