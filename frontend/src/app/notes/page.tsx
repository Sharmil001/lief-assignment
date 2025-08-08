"use client";

import { Note, Patient } from "@b/drizzle/schema/schema";
import NoteInput from "@f/_components/NoteInput";
import NoteList from "@f/_components/NoteList";
import {
	addNote,
	deleteNote,
	fetchNotesWithPagination,
	updateNote,
} from "@f/lib/note-apis";
import { fetchPatients } from "@f/lib/patient-apis";
import { useEffect, useState } from "react";

export type LoadingState =
	| null
	| "fetchPatients"
	| "fetchNotes"
	| "saving"
	| "deleting";

const Notes = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState<LoadingState>(null);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		total: 0,
	});

	useEffect(() => {
		setLoading("fetchPatients");
		fetchPatients()
			.then((res) => setPatients(res.data ?? []))
			.catch((err) => console.error(err))
			.finally(() => setLoading(null));
	}, []);

	useEffect(() => {
		setLoading("fetchNotes");
		const { page, limit } = pagination;
		fetchNotesWithPagination(page, limit)
			.then(({ data, total }) => {
				setNotes(data);
				setPagination((prev) => ({ ...prev, total }));
			})
			.catch(console.error)
			.finally(() => setLoading(null));
	}, [pagination.page, pagination.limit]);

	const prevPage = () =>
		setPagination((p) => ({
			...p,
			page: Math.max(1, p.page - 1),
		}));

	const nextPage = () =>
		setPagination((p) => ({
			...p,
			page: p.page * p.limit < p.total ? p.page + 1 : p.page,
		}));

	const saveNote = async (note: Note) => {
		try {
			setLoading("saving");
			const patient = patients.find((p) => p.id === note.patientId);
			if (patient) {
				note.patientName = patient.firstName + " " + patient.lastName;
			}
			const [data] = await addNote(note as Note);

			const { page, limit } = pagination;
			const { data: updatedNotes, total } = await fetchNotesWithPagination(
				page,
				limit,
			);
			setNotes(updatedNotes);
			setPagination((prev) => ({ ...prev, total }));
		} catch (err) {
			console.error(err);
			alert("Error saving note. Please try again.");
		} finally {
			setLoading(null);
		}
	};

	const editNote = async (id: string, note: Note) => {
		try {
			setLoading("saving");
			const [data] = await updateNote(id, note);

			const { page, limit } = pagination;
			const { data: updatedNotes, total } = await fetchNotesWithPagination(
				page,
				limit,
			);
			setNotes(updatedNotes);
			setPagination((prev) => ({ ...prev, total }));
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(null);
		}
	};

	const removeNote = async (id: string) => {
		try {
			setLoading("deleting");
			await deleteNote(id);
			setNotes((prev) => prev.filter((p) => p.id !== id));
			setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(null);
		}
	};

	return (
		<div className="flex flex-col items-center h-screen">
			<div className="container mx-auto px-4 md:px-8 py-3">
				{/* take note input */}
				<div className="flex justify-center items-center mt-4">
					<NoteInput
						patients={patients}
						onAdd={saveNote}
						disabled={loading === "saving"}
					/>
				</div>

				{/* show list of notes */}
				<NoteList
					notes={notes}
					patients={patients}
					onUpdate={editNote}
					onDelete={removeNote}
					pagination={pagination}
					onPrevPage={prevPage}
					onNextPage={nextPage}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default Notes;
