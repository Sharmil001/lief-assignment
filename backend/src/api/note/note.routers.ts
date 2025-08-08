import { Router } from "express";
import { NoteController } from "./note.controllers";

const router = Router();

router.get("/:patientId", NoteController.getByPatientId);
router.post("/", NoteController.create);
router.delete("/:id", NoteController.delete);

export default router;
