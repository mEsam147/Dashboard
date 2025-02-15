import express, { RequestHandler } from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getSingleAnnouncement,
  updateAnnouncement,
} from "../controllers/announcement.controller"; 

const router = express.Router();

router.post("/", createAnnouncement as RequestHandler);
router.get("/", getAllAnnouncements);
router.get("/:id", getSingleAnnouncement as RequestHandler);
router.put("/:id", updateAnnouncement as RequestHandler);
router.delete("/:id", deleteAnnouncement);

export default router;
