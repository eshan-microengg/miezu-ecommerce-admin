import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './styles.scss';

export const TextEditor = ({ value, setFieldValue, fieldName, isInvalid }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isInitialLoad, setIsInitialLoad] = useState(true); 

    useEffect(() => {
        if (isInitialLoad && value) {
            const blocksFromHtml = htmlToDraft(value);
            if (blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                setEditorState(EditorState.createWithContent(contentState));
            }
            setIsInitialLoad(false);
        }
    }, [value, isInitialLoad]);

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const rawContentState = convertToRaw(newEditorState.getCurrentContent());
        const htmlContent = draftToHtml(rawContentState);
        setFieldValue(fieldName, htmlContent);
    };

    return (
        <div className={`editor-wrapper ${isInvalid ? 'invalid' : ''}`}>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    options: ['inline', 'list', 'textAlign', 'history'],
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'] },
                    list: { options: ['unordered', 'ordered'] },
                    textAlign: { options: ['left', 'center', 'right', 'justify'] },
                    history: { options: ['undo', 'redo'] },
                    blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'] },
                }}
            />
        </div>
    );
};