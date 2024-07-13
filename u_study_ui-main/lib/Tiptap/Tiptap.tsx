"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Document,
			Paragraph,
			Text,
			Bold.configure({
				HTMLAttributes: {
					class: "my-custom-class",
				},
			}),
		],
		content: "<p>Hello World! 🌎️</p>",
		editorProps: {
			attributes: {
				class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
			},
		},
	});

	if (!editor) return null;

	return <EditorContent editor={editor} />;
};

export default Tiptap;
