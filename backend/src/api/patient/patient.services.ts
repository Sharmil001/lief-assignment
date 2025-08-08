import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { Patient, patients } from "../../drizzle/schema/schema";

export const PatientService = {
	async getAll() {
		return db.select().from(patients);
	},
	async getById(id: string) {
		return db.select().from(patients).where(eq(patients.id, id));
	},
	async create(data: Patient) {
		return db.insert(patients).values(data).returning();
	},
	async update(id: string, data: Partial<Patient>) {
		return db.update(patients).set(data).where(eq(patients.id, id)).returning();
	},
	async delete(id: string) {
		return db.delete(patients).where(eq(patients.id, id));
	},
};
