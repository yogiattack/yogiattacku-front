"use client";

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    imagePlugin,
    linkPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CreateLink,
    diffSourcePlugin,
    DiffSourceToggleWrapper
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { getPresignedUrl } from "@/apis/board";
import { useRef } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";

interface EditorProps {
    markdown: string;
    onChange?: (markdown: string) => void;
    bucketRootKey: string;
    readOnly?: boolean;
    onImageUpload?: (s3Key: string) => void;
}

export default function Editor({ markdown, onChange, bucketRootKey, readOnly = false, onImageUpload }: EditorProps) {
    const ref = useRef<MDXEditorMethods>(null);

    const imageUploadHandler = async (image: File) => {
        try {
            // 1. Get Presigned URL
            const fileExt = image.name.split('.').pop() || '';
            const { uploadUrl, publicUrl, s3Key } = await getPresignedUrl({
                bucketRootKey,
                contentType: image.type,
                fileExt: fileExt,
                fileSize: image.size
            });

            // 2. Upload to S3
            await fetch(uploadUrl, {
                method: "PUT",
                body: image,
                headers: {
                    "Content-Type": image.type,
                }
            });

            if (onChange) {
                // Trigger s3 key update
                onImageUpload?.(s3Key);
            }

            return publicUrl;
        } catch (error) {
            console.error("Image upload failed:", error);
            throw error;
        }
    };

    return (
        <div className={`border rounded-md min-h-[500px] prose max-w-none ${readOnly ? "bg-gray-50/50" : ""}`}>
            <MDXEditor
                ref={ref}
                markdown={markdown}
                onChange={onChange}
                readOnly={readOnly}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    linkPlugin(),
                    markdownShortcutPlugin(),
                    imagePlugin({ imageUploadHandler }),
                    diffSourcePlugin({ viewMode: 'rich-text' }),
                    ...(!readOnly ? [
                        toolbarPlugin({
                            toolbarContents: () => (
                                <DiffSourceToggleWrapper>
                                    <UndoRedo />
                                    <BlockTypeSelect />
                                    <BoldItalicUnderlineToggles />
                                    <CreateLink />
                                </DiffSourceToggleWrapper>
                            )
                        })
                    ] : [])
                ]}
                contentEditableClassName="prose prose-slate max-w-none focus:outline-none p-4 min-h-[500px] prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl"
            />
        </div>
    );
}
