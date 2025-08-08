import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { Note, notes } from "../../drizzle/schema/schema";

export const NoteService = {
	async getAll() {
		return db.select().from(notes);
	},
	async getByPatientId(patientId: string) {
		return db.select().from(notes).where(eq(notes.patientId, patientId));
	},
	async create(data: Note) {
		return db.insert(notes).values(data).returning();
	},
	async update(id: string, data: Partial<Note>) {
		return db.update(notes).set(data).where(eq(notes.id, id)).returning();
	},
	async delete(id: string) {
		return db.delete(notes).where(eq(notes.id, id));
	},
};
