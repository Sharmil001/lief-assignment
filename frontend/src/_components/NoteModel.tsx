import { Note, Patient } from "@b/drizzle/schema/schema";
import { Button } from "@f/components/ui/button";
import { useForm } from "react-hook-form";
import { NoteForm, noteSchema } from "./NoteInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@f/components/ui/label";
import { Input } from "@f/components/ui/input";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { commands } from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type NoteModalProps = {
	patients: Patient[];
	note: Note;
	onUpdate: (note: Note) => void;
	onCancel: () => void;
};

const NoteModal = ({ patients, note, onUpdate, onCancel }: NoteModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<NoteForm>({
		resolver: zodResolver(noteSchema),
		defaultValues: {
			patientId: note.patientId,
			patientName: note.patientName || "",
			noteType: note.noteType,
			title: note.title,
			content: note.content,
		},
	});

	const updateNote = (data: NoteForm) => {
		onUpdate(data as Note);
		reset(data);
	};

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
						{/* {note.pinned ? ( */}
						{/* 	<PinOff width={18} height={18} cursor="pointer" /> */}
						{/* ) : ( */}
						{/* 	<Pin width={18} height={18} cursor="pointer" /> */}
						{/* )} */}
					</button>
				</div>
				<form
					onSubmit={handleSubmit(updateNote)}
					className="flex flex-col gap-4"
				>
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<div>
							<Input
								type="text"
								{...register("title")}
								variant="default"
								placeholder="Title"
							/>
							{errors.title && (
								<span className="text-red-600 text-xs">
									{errors.title.message}
								</span>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="patient">Patient</Label>
						<div>
							<div className="w-full flex gap-1 border-1 rounded-lg p-2">
								<select
									className={`w-full appearance-none px-2 text-sm focus:outline-none ${
										!note.patientId ? "text-gray-400" : "text-gray-700"
									}`}
									{...register("patientId")}
								>
									<option className="text-sm text-gray-400" value="">
										--Select Patient--
									</option>
									{patients.map((patient) => (
										<option key={patient.id} value={patient.id}>
											{patient.firstName} {patient.lastName}
										</option>
									))}
								</select>
								<div
									className={`flex items-center px-2 ${
										!note.patientId ? "text-gray-400" : "text-gray-700"
									}`}
								>
									<ChevronDown width={18} height={18} />
								</div>
							</div>
							{errors.patientId && (
								<span className="text-red-600 text-xs">
									{errors.patientId.message}
								</span>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<div data-color-mode="light">
							<MDEditor
								value={watch("content")}
								preview="preview"
								commands={[
									commands.bold,
									commands.italic,
									commands.strikethrough,
									commands.hr,
									commands.code,
									commands.quote,
									commands.orderedListCommand,
									commands.unorderedListCommand,
									commands.checkedListCommand,
									commands.link, // intentionally skipping commands.image
								]}
								onChange={(val) =>
									setValue("content", val || "", { shouldValidate: true })
								}
							/>
							{errors.content && (
								<span className="text-red-600 text-xs">
									{errors.content.message}
								</span>
							)}
						</div>
					</div>

					<div className="flex justify-end gap-2 mt-4">
						<Button variant="secondary" onClick={onCancel}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NoteModal;
