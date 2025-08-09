"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type NoteEditorProps = {
	value?: string;
	onChange?: (content: string) => void;
};

export default function NoteEditor({ value = "", onChange }: NoteEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		editorProps: {
			attributes: {
				class:
					"border border-input rounded-lg px-4 py-2 w-full min-h-[50vh] bg-white text-gray-800 leading-relaxed focus:outline-none",
			},
		},
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || "");
		}
	}, [value, editor]);

	return <EditorContent editor={editor} />;
}
