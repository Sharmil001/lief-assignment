"use client";
import Image from "next/image";
import { useState } from "react";
import { bytesToMB } from "../utils/helper";
import {
	ArrowUpFromLine,
	ChevronDown,
	ClipboardMinus,
	Trash,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const initialNote = {
	title: "",
	patient: "",
	noteText: "",
};

const NoteInput = () => {
	const [noteType, setNoteType] = useState("");
	const [note, setNote] = useState(initialNote);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

	const handleSubmit = (type: string) => {
		setNoteType(type);
	};

	const saveNote = () => {
		console.log("save note", note);
	};

	const clearNote = () => {
		console.log("clear note");
		clearState();
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

	const clearState = () => {
		setNoteType("");
		setNote(initialNote);
		setUploadedFile(null);
	};

	return (
		<div className="w-full lg:w-4/6">
			<div
				className={`w-full px-4 py-3 border-2 border-black rounded-lg z-1 bg-white relative shadow-[3px_3px_0px_rgba(0,0,0,1)]`}
			>
				{/* Initial View */}
				{!noteType && (
					<div className="w-full flex justify-between items-center">
						<span
							className="text-gray-400 w-full cursor-text"
							onClick={() => handleSubmit("type")}
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

				{/* After click view */}
				<div className="flex flex-col gap-2">
					{noteType === "scan" && uploadedFile?.type.startsWith("image") && (
						<div className="flex justify-center items-center">
							<Image
								src={URL.createObjectURL(uploadedFile!)}
								alt="uploaded-file"
								width={200}
								height={200}
							/>
						</div>
					)}
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
								onClick={clearState}
							/>
						</div>
					)}

					{noteType && (
						<>
							<Input
								type="text"
								variant="default"
								placeholder="Title"
								onChange={(e) => setNote({ ...note, title: e.target.value })}
								autoFocus={noteType === "scan"}
							/>
							<div className="w-full flex gap-1 border-1 rounded-lg p-2">
								<select
									className={`w-full appearance-none px-2 text-sm focus:outline-none ${!note.patient ? "text-gray-400" : "text-gray-700"}`}
									onChange={(e) =>
										setNote({ ...note, patient: e.target.value })
									}
								>
									<option className="text-sm text-gray-400">
										--Select Patient--
									</option>
									<option value="Sharmil">Sharmil</option>
									<option value="John">John</option>
								</select>
								<div
									className={`flex items-center px-2 ${!note.patient ? "text-gray-400" : "text-gray-700"}`}
								>
									<ChevronDown width={18} height={18} />
								</div>
							</div>
						</>
					)}

					{noteType === "type" && (
						<>
							<textarea
								className="border border-input rounded-lg px-4 py-2 w-full resize-none overflow-y-auto bg-white text-gray-800 leading-relaxed focus:outline-none max-h-[40vh] h-auto placeholder-gray-400"
								placeholder="Take a note..."
								autoFocus
								value={note.noteText}
								onInput={handleInput}
								onChange={(e) => setNote({ ...note, noteText: e.target.value })}
							/>
						</>
					)}
					{noteType && (
						<div className="flex gap-2 justify-end mt-2">
							<Button variant="secondary" onClick={clearNote}>
								Clear
							</Button>
							<Button variant="primary" onClick={saveNote}>
								Save
							</Button>
						</div>
					)}
				</div>
			</div>
			{noteType && (
				<div className="fixed inset-0 z-0" onClick={clearNote}></div>
			)}
		</div>
	);
};

export default NoteInput;
