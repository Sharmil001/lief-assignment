"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { bytesToMB } from "../utils/helper";
import {
	ArrowUpFromLine,
	ChevronDown,
	ClipboardMinus,
	Trash,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Note, Patient } from "@b/drizzle/schema/schema";

export const noteSchema = z.object({
	patientId: z.string().min(1, "Please select a patient"),
	patientName: z.string().optional(),
	noteType: z.enum(["typed", "scanned"]),
	title: z.string().min(3, "Title is required").max(20, "Title is too long"),
	content: z
		.string()
		.min(3, "Content is required")
		.max(1000, "Content is too long"),
});

export type NoteForm = z.infer<typeof noteSchema>;

interface NoteInputProps {
	patients: Patient[];
	onAdd: (note: Note) => void;
}

const NoteInput = ({ patients, onAdd }: NoteInputProps) => {
	const [noteType, setNoteType] = useState("");
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NoteForm>({
		resolver: zodResolver(noteSchema),
		defaultValues: {
			patientId: "",
			patientName: "",
			noteType: "typed",
			title: "",
			content: "",
		},
	});

	const saveNote = async (data: NoteForm) => {
		onAdd(data as Note);
		clearNote();
	};

	const clearNote = () => {
		setNoteType("");
		setUploadedFile(null);
		reset();
	};

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const el = e.target;
		el.style.height = "auto";
		const maxHeight = window.innerHeight * 0.4;
		el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setUploadedFile(file);
			setNoteType("scan");
		}
	};

	return (
		<div className="w-full lg:w-4/6">
			<div className="w-full px-4 py-3 border-2 border-black rounded-lg z-1 bg-white relative shadow-[3px_3px_0px_rgba(0,0,0,1)]">
				{!noteType && (
					<div className="w-full flex justify-between items-center">
						<span
							className="text-gray-400 w-full cursor-text"
							onClick={() => setNoteType("type")}
						>
							Take a note...
						</span>
						<label className="cursor-pointer">
							<div className="flex gap-1 items-center focus:outline-none hover:bg-gray-100 p-2 cursor-pointer rounded-lg">
								<ArrowUpFromLine width={18} height={18} />
								<span className="font-semibold">Upload</span>
							</div>
							<Input
								type="file"
								variant="primary"
								onChange={handleFileChange}
								accept="image/*,application/pdf"
								className="hidden"
							/>
						</label>
					</div>
				)}

				{/* Wrap ALL interactive inputs inside the form */}
				{noteType && (
					<form
						onSubmit={handleSubmit(saveNote)}
						className="flex flex-col gap-2"
					>
						{/* Show image preview for scan type */}
						{noteType === "scan" && uploadedFile?.type.startsWith("image") && (
							<div className="flex justify-center items-center">
								<Image
									src={URL.createObjectURL(uploadedFile)}
									alt="uploaded-file"
									width={200}
									height={200}
								/>
							</div>
						)}
						{/* Show PDF info for scan type */}
						{noteType === "scan" && uploadedFile?.type.includes("pdf") && (
							<div className="flex justify-between items-center border-2 rounded-lg px-4 py-2">
								<div className="flex gap-2 items-center">
									<ClipboardMinus width={24} height={24} />
									<div className="flex flex-col gap-2">
										<div className="flex flex-col">
											<span className="font-semibold text-sm">
												{uploadedFile?.name}
											</span>
											<span className="text-gray-600 text-xs">
												{bytesToMB(Number(uploadedFile?.size))}
											</span>
										</div>
									</div>
								</div>
								<Trash
									width={18}
									height={18}
									cursor="pointer"
									onClick={clearNote}
								/>
							</div>
						)}

						{/* Title Input */}
						<div>
							<Input
								type="text"
								{...register("title")}
								variant="default"
								placeholder="Title"
								autoFocus={noteType === "scan"}
							/>
							{errors.title && (
								<span className="text-red-600 text-xs">
									{errors.title.message}
								</span>
							)}
						</div>

						{/* Patient select */}
						<div>
							<div className="w-full flex gap-1 border-1 rounded-lg p-2">
								<select
									className={`w-full appearance-none px-2 text-sm focus:outline-none ${
										!noteType ? "text-gray-400" : "text-gray-700"
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
										!noteType ? "text-gray-400" : "text-gray-700"
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

						{/* Content textarea for typed noteType */}
						{noteType === "type" && (
							<div>
								<textarea
									className="border border-input rounded-lg px-4 py-2 w-full resize-none overflow-y-auto bg-white text-gray-800 leading-relaxed focus:outline-none max-h-[40vh] h-auto placeholder-gray-400"
									placeholder="Take a note..."
									autoFocus
									onInput={handleInput}
									{...register("content")}
								/>
								{errors.content && (
									<span className="text-red-600 text-xs">
										{errors.content.message}
									</span>
								)}
							</div>
						)}

						{/* Buttons */}
						<div className="flex gap-2 justify-end mt-2">
							<Button variant="secondary" onClick={clearNote} type="button">
								Clear
							</Button>
							<Button type="submit" variant="primary">
								Save
							</Button>
						</div>
					</form>
				)}
			</div>

			{/* Overlay to clear */}
			{noteType && (
				<div
					className="fixed inset-0 z-0"
					onClick={clearNote}
					aria-hidden="true"
				/>
			)}
		</div>
	);
};

export default NoteInput;
