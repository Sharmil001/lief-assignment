"use client";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Note, Patient } from "@b/drizzle/schema/schema";
import NoteModal from "./NoteModel";
import NoteCard from "./NotesCard";
import { LoadingState } from "@f/app/notes/page";
import { getLightBgAndShadowForPatient } from "@f/utils/color-mapper";

interface NoteListProps {
	notes: Note[];
	patients: Patient[];
	onUpdate: (id: string, note: Note) => void;
	onDelete: (id: string) => void;
	pagination: { page: number; limit: number; total: number };
	onPrevPage: () => void;
	onNextPage: () => void;
	loading: LoadingState;
}

const NoteList = (props: NoteListProps) => {
	const [note, setNote] = useState<Note | null>(null);
	const { page, limit, total } = props.pagination;

	const handleUpdate = (updatedNote: Note) => {
		if (note && note.id) {
			props.onUpdate(note.id, updatedNote);
			setNote(null);
		}
	};

	return (
		<div className="container mx-auto py-3 mt-8">
			<section className="mb-6">
				{!props.pagination.total && (
					<div className="flex justify-center items-center">
						<Loader2 className="w-8 h-8 animate-spin text-black" />
					</div>
				)}
				<div className="py-3 masonry-container">
					{props.notes?.map((note) => {
						const patient = props.patients.find((p) => p.id === note.patientId);
						const bgColorClass = patient
							? getLightBgAndShadowForPatient(patient.id)
							: {
									bgColorClass: "bg-white",
									shadowClass: "hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)]",
									darkBgClass: "text-black",
									darkBorderClass: "border-black",
								};

						return (
							<NoteCard
								key={note.id}
								note={note}
								bgColorClass={bgColorClass}
								onEdit={() => setNote(note)}
								onDelete={props.onDelete}
							/>
						);
					})}
				</div>
			</section>

			{props.notes?.length && (
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="text-muted-foreground flex-1 text-sm">
						Page {page} of {Math.ceil(total / limit)}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={props.onPrevPage}
						disabled={page === 1}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={props.onNextPage}
						disabled={page * limit >= total}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			)}

			{note && props.patients && (
				<NoteModal
					note={note}
					patients={props.patients}
					onUpdate={handleUpdate}
					onCancel={() => setNote(null)}
				/>
			)}
		</div>
	);
};

export default NoteList;
