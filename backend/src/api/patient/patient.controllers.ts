import { PatientService } from "./patient.services";
import { Request, Response } from "express";

export const PatientController = {
	async getAll(req: Request, res: Response) {
		const result = await PatientService.getAll();
		res.json(result);
	},
	async getById(req: Request, res: Response) {
		const result = await PatientService.getById(req.params.id);
		res.json(result);
	},
	async create(req: Request, res: Response) {
		const result = await PatientService.create(req.body);
		res.json(result);
	},
	async update(req: Request, res: Response) {
		const result = await PatientService.update(req.params.id, req.body);
		res.json(result);
	},
	async delete(req: Request, res: Response) {
		await PatientService.delete(req.params.id);
		res.status(204).send();
	},
};
