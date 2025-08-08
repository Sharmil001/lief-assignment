"use client";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	NotebookPen,
	Pin,
	PinOff,
	Square,
	Trash,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const dummyNotes = [
	{
		id: 3,
		title: "Jane Doe Updated",
		patientName: "Jane Doe",
		patientId: "JD-001",
		noteText: "This note has been updated to reflect the latest changes.",
		pinned: true,
		createdAt: "2023-03-02T00:00:00.000Z",
		updatedAt: new Date().toISOString(),
	},
	{
		id: 4,
		patientName: "Jane Doe",
		noteText: "Lorem ipsum dolor sit amet.",
		pinned: false,
		createdAt: "2023-03-02T00:00:00.000Z",
		updatedAt: "2023-03-02T00:00:00.000Z",
	},
	{
		id: 5,
		patientName: "Jane Doe",
		noteText: "Lorem ipsum dolor sit amet.",
		pinned: false,
		createdAt: "2023-03-02T00:00:00.000Z",
		updatedAt: "2023-03-02T00:00:00.000Z",
	},
	{
		id: 1,
		patientName: "John Doe",
		noteText:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultricies ultrices, nunc nisi tincidunt nisi, eu tincidunt purus purus id nisl. Nullam euismod, nisl eget ultricies ultrices, nunc nisi tincidunt nisi, eu tincidunt purus purus id nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultricies ultrices, nunc nisi tincidunt nisi, eu tincidunt purus purus id nisl. Nullam euismod, nisl eget ultricies ultrices, nunc nisi tincidunt nisi, eu tincidunt purus purus id nisl.",
		pinned: false,
		createdAt: "2023-03-01T00:00:00.000Z",
		updatedAt: "2023-03-01T00:00:00.000Z",
	},
	{
		id: 2,
		patientName: "Jane Doe",
		noteText: "Lorem ipsum dolor sit amet.",
		pinned: false,
		createdAt: "2023-03-02T00:00:00.000Z",
		updatedAt: "2023-03-02T00:00:00.000Z",
	},
];

type Note = {
	id: number;
	title?: string;
	patientName: string;
	patientId?: string;
	noteText: string;
	pinned: boolean;
	createdAt: string;
	updatedAt: string;
};

interface NoteListProps {
	notes: Note[];
}

const NoteList = (props: NoteListProps) => {
	const [note, setNote] = useState<Note | null>(null);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 5,
	});

	const saveNote = () => {
		// Save API
	};

	const cancelEdit = () => {
		setNote(null);
	};

	const openEditDialog = (note: Note) => {
		setNote(note);
	};

	return (
		<div className="container mx-auto py-3 mt-8">
			<section className="mb-6">
				<div className="py-3 masonry-container">
					{dummyNotes.map((note) => (
						<NoteCard
							key={note.id}
							note={note}
							onEdit={() => openEditDialog(note)}
						/>
					))}
				</div>
			</section>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="text-muted-foreground flex-1 text-sm">
					{pagination.pageIndex + 1} of{" "}
					{(pagination.pageIndex + 1) * pagination.pageSize} row(s) selected.
				</div>

				<Button variant="outline" size="sm">
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="sm">
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>

			{note && (
				<NoteModal
					note={note}
					onChangeText={setNote}
					onSave={saveNote}
					onCancel={cancelEdit}
				/>
			)}
		</div>
	);
};

export default NoteList;

const NoteCard = ({ note, onEdit }: { note: Note; onEdit: () => void }) => {
	return (
		<div
			className="group mb-4 break-inside-avoid border-2 border-black rounded-lg p-4 bg-white hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)] duration-300 cursor-default z-1 relative"
			style={{ display: "inline-block", width: "100%" }}
		>
			<div className="flex flex-col gap-1 mb-8">
				<div className="text-lg font-semibold">{note.patientName}</div>
				<div className="text-sm text-gray-800 line-clamp-6">
					{note.noteText}
				</div>
			</div>
			<div
				className={`top-1 right-1 absolute ${!note.pinned && "opacity-0 group-hover:opacity-100 transition-opacity duration-300"}`}
			>
				<button
					className="rounded-full focus:outline-none
                hover:bg-gray-100 p-2 cursor-pointer
              "
					aria-label="Delete note"
				>
					{note.pinned ? (
						<PinOff width={18} height={18} cursor="pointer" />
					) : (
						<Pin width={18} height={18} cursor="pointer" />
					)}
				</button>
			</div>
			<div className="flex gap-1 absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<button
					className="rounded-full focus:outline-none hover:bg-gray-100 p-2 cursor-pointer"
					onClick={onEdit}
					aria-label="Delete note"
				>
					<NotebookPen width={18} height={18} cursor="pointer" />
				</button>
				<button
					className="rounded-full focus:outline-none
              hover:bg-gray-100 p-2 cursor-pointer
            "
					aria-label="Delete note"
				>
					<Trash width={18} height={18} cursor="pointer" />
				</button>
			</div>
		</div>
	);
};

type NoteModalProps = {
	note: Note;
	onChangeText: (text: Note) => void;
	onSave: () => void;
	onCancel: () => void;
};

const NoteModal = ({
	note,
	onChangeText,
	onSave,
	onCancel,
}: NoteModalProps) => {
	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const el = e.target;
		el.style.height = "auto";
		const maxHeight = window.innerHeight * 0.4;
		el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
	};
	return (
		<div
			className="fixed inset-0 flex justify-center items-center z-50"
			style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
			// onClick={onCancel}
		>
			<div
				className="bg-white rounded-md p-6 max-w-xl w-full h-fit max-h-[90vh] overflow-y-auto relative"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">Note</h1>
					<button
						className="rounded-full focus:outline-none
                hover:bg-gray-100 p-2 cursor-pointer
              "
						aria-label="Delete note"
					>
						{note.pinned ? (
							<PinOff width={18} height={18} cursor="pointer" />
						) : (
							<Pin width={18} height={18} cursor="pointer" />
						)}
					</button>
				</div>
				<div className="flex flex-col gap-4">
					<div className="space-y-2">
						<Label htmlFor="patientName">Title</Label>
						<Input
							id="title"
							type="text"
							variant="default"
							placeholder="Title"
							value={note.patientName}
							maxLength={20}
							onChange={(e) => onChangeText({ ...note, title: e.target.value })}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="patient">Patient</Label>
						<div className="w-full flex gap-1 border-1 rounded-lg p-2">
							<select
								id="patient"
								className={`w-full appearance-none px-2 text-sm focus:outline-none ${!note.patientName ? "text-gray-400" : "text-gray-700"}`}
								onChange={(e) =>
									onChangeText({ ...note, patientName: e.target.value })
								}
							>
								<option className="text-sm text-gray-400">
									--Select Patient--
								</option>
								<option value="Jane Doe">Jane Doe</option>
								<option value="John">John</option>
							</select>
							<div
								className={`flex items-center px-2 ${!note.patientName ? "text-gray-400" : "text-gray-700"}`}
							>
								<ChevronDown width={18} height={18} />
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<textarea
							id="description"
							className="border-1 border-input rounded-lg px-4 py-2 w-full min-h-40 resize-none overflow-y-auto bg-white text-gray-800 leading-relaxed focus:outline-none placeholder-gray-500"
							placeholder="Take a note..."
							autoFocus
							value={note.noteText}
							onChange={(e) =>
								onChangeText({ ...note, noteText: e.target.value })
							}
							onInput={handleInput}
							maxLength={1000}
						/>
					</div>
				</div>

				<div className="flex justify-end gap-2 mt-4">
					<Button variant="secondary" onClick={onCancel}>
						Close
					</Button>
					<Button variant="primary" onClick={onSave}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};
