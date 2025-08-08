import { Note } from "@b/drizzle/schema/schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchNotes(): Promise<Note[]> {
	const res = await fetch(`${API_URL}/notes`);
	if (!res.ok) throw new Error("Failed to fetch notes");
	return res.json();
}

export async function fetchNotesWithPagination(
	page = 1,
	limit = 5,
): Promise<{ data: Note[]; total: number }> {
	const res = await fetch(`${API_URL}/notes/?page=${page}&limit=${limit}`);
	if (!res.ok) throw new Error("Failed to fetch notes");
	return res.json();
}

export async function addNote(note: Note) {
	const res = await fetch(`${API_URL}/notes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
	if (!res.ok) throw new Error("Failed to add note");
	return res.json();
}

export async function uploadNote(note: Note, file?: File) {
	const formData = new FormData();

	// Append form fields
	formData.append("patientId", note.patientId);
	formData.append("noteType", note.noteType);
	formData.append("title", note.title);
	formData.append("content", note.content);

	// Append file if exists
	if (file) {
		formData.append("file", file);
	}

	const res = await fetch(`${API_URL}/notes`, {
		method: "POST",
		body: formData,
	});

	if (!res.ok) throw new Error("Failed to add note");
	return res.json();
}

export async function updateNote(id: string, note: Note) {
	const res = await fetch(`${API_URL}/notes/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});

	if (!res.ok) throw new Error("Failed to update note");
	return res.json();
}

export async function deleteNote(id: string) {
	const res = await fetch(`${API_URL}/notes/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) throw new Error("Failed to delete note");
}
