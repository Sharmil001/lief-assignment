import { Request, Response } from "express";
import { NoteService } from "./note.services";

export const NoteController = {
	async getByPatientId(req: Request, res: Response) {
		const result = await NoteService.getByPatientId(req.params.patientId);
		res.json(result);
	},
	async create(req: Request, res: Response) {
		const result = await NoteService.create(req.body);
		res.json(result);
	},
	async delete(req: Request, res: Response) {
		await NoteService.delete(req.params.id);
		res.status(204).send();
	},
};
