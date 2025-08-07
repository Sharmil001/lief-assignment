"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import { bytesToMB } from "../utils/helper";

const initialNote = {
	patientName: "",
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

	const clearState = () => {
		setNoteType("");
		setNote(initialNote);
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
		<div className="w-4/6">
			<div className="w-full px-4 py-3 border-2 border-black rounded-lg z-1 bg-white relative shadow-[3px_3px_0px_rgba(0,0,0,1)]">
				{/* Initial View */}
				{!noteType && (
					<div className="w-full flex justify-between items-center">
						<span
							className="text-gray-500 w-full cursor-text"
							onClick={() => handleSubmit("type")}
						>
							Take a note...
						</span>
						<label className="cursor-pointer">
							<Image
								src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0em0tNS03bC0zIDMuNzJMOSAxM2wtMyA0aDEybC00LTV6Ii8+Cjwvc3ZnPgo="
								alt="upload-icon"
								width={20}
								height={20}
							/>
							<input
								type="file"
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
					{noteType === "scan" && uploadedFile?.type.startsWith("pdf") && (
						<div className="flex justify-between items-center border-2 rounded-lg px-4 py-2 max-w-7xl">
							<div className="flex gap-2">
								<Image
									src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsaXBib2FyZC1taW51cy1pY29uIGx1Y2lkZS1jbGlwYm9hcmQtbWludXMiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjQiIHg9IjgiIHk9IjIiIHJ4PSIxIiByeT0iMSIvPjxwYXRoIGQ9Ik0xNiA0aDJhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMiIvPjxwYXRoIGQ9Ik05IDE0aDYiLz48L3N2Zz4="
									alt="doc-icon"
									width={24}
									height={24}
								/>
								<div
									className="flex flex-col gap-2"
									onClick={() => setNoteType("type")}
								>
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
							<Image
								className="cursor-pointer"
								src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyYXNoLWljb24gbHVjaWRlLXRyYXNoIj48cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2Ii8+PHBhdGggZD0iTTMgNmgxOCIvPjxwYXRoIGQ9Ik04IDZWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+"
								alt="doc-icon"
								width={18}
								height={18}
								onClick={clearState}
							/>
						</div>
					)}

					{noteType && (
						<input
							type="text"
							className="w-full text-lg font-semibold placeholder:text-gray-400 placeholder:font-semibold focus-visible:outline-none"
							placeholder="Patient Name"
							onChange={(e) =>
								setNote({ ...note, patientName: e.target.value })
							}
							autoFocus={noteType === "scan"}
						/>
					)}

					{noteType === "type" && (
						<textarea
							className="w-full resize-none overflow-y-auto bg-white text-gray-800  leading-relaxed focus:outline-none max-h-[40vh] h-auto placeholder-gray-500"
							placeholder="Take a note..."
							autoFocus
							value={note.noteText}
							onInput={handleInput}
							onChange={(e) => setNote({ ...note, noteText: e.target.value })}
						/>
					)}
					{noteType && (
						<div className="flex gap-2 justify-end">
							<Button name="Save" type="primary" onClick={saveNote} />
							<Button name="Clear" type="primary" onClick={clearNote} />
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
