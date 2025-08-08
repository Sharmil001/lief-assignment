import { Request, Response } from "express";
import { NoteService } from "./note.services";
import { GlobalCache } from "../../utils/cache";
import { Note } from "../../drizzle/schema/schema";

const notesCache = new GlobalCache<{ data: Note[]; total: number }>(
	24 * 60 * 60 * 1000, // 1 day TTL
);

function clearNotesCache() {
	notesCache.clearByPrefix("notes_page_");
}

export const NoteController = {
	async getAllWithPagination(req: Request, res: Response) {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 5;

		const cacheKey = `notes_page_${page}_limit_${limit}`;
		const cached = notesCache.get(cacheKey);
		if (cached) {
			console.log(`Serving from cache for key: ${cacheKey}`);
			return res.json({ ...cached, cached: true });
		}

		const offset = (page - 1) * limit;
		const result = await NoteService.getAllWithPagination(page, limit, offset);

		if (result && result.data) {
			const clone = JSON.parse(JSON.stringify(result));
			notesCache.set(cacheKey, clone);
		}

		return res.json({ ...result, cached: false });
	},

	async create(req: Request, res: Response) {
		const result = await NoteService.create(req.body);
		clearNotesCache();
		return res.json(result);
	},

	async update(req: Request, res: Response) {
		const { createdAt, updatedAt, ...rest } = req.body;
		const result = await NoteService.update(req.params.id, rest);
		clearNotesCache();
		return res.json(result);
	},

	async delete(req: Request, res: Response) {
		const result = await NoteService.delete(req.params.id);
		clearNotesCache();
		return res.status(200).send(result);
	},

	async getAll(_: Request, res: Response) {
		const result = await NoteService.getAll();
		return res.json(result);
	},

	async getByPatientId(req: Request, res: Response) {
		const result = await NoteService.getByPatientId(req.params.patientId);
		return res.json(result);
	},
};
