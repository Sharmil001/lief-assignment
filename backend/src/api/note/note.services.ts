import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { Note, notes } from "../../drizzle/schema/schema";

export const NoteService = {
	async getAll() {
		return db.select().from(notes);
	},
	async getAllWithPagination(_: number, limit: number, offset: number) {
		const totalResult = await db.select({ count: sql`count(*)` }).from(notes);
		const total = Number(totalResult[0]?.count ?? 0);
		const data = await db
			.select()
			.from(notes)
			.limit(limit)
			.offset(offset)
			.orderBy(desc(notes.createdAt));
		return { data, total };
	},
	async getByPatientId(patientId: string) {
		return db.select().from(notes).where(eq(notes.patientId, patientId));
	},
	async create(data: Note) {
		return db.insert(notes).values(data).returning();
	},
	async update(id: string, data: Note) {
		console.log(data, "service");
		return db.update(notes).set(data).where(eq(notes.id, id)).returning();
	},
	async delete(id: string) {
		return db.delete(notes).where(eq(notes.id, id)).returning();
	},
	async totalNotes() {
		return await db.select({ count: sql`count(*)` }).from(notes);
	},
};
