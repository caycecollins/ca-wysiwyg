import { Dispatch, SetStateAction } from 'react';
import { Editor, Transforms, Element as SlateElement, Node } from 'slate';

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (
  editor: Editor,
  format: string,
  blockType = 'type',
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  );

  return !!match;
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true },
  );
};

export const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

export const insertTableElement = ({ editor, columns, rows }: {
  editor: Editor;
  columns: number;
  rows: number;
}) => {
  const tableColumns = Array(columns).fill({
    type: 'table-cell',
    children: [{ text: 'empty' }],
  });
  const tableRows = Array(rows).fill({
    type: 'table-row',
    children: tableColumns,
  });
  const table = { type: 'table', children: tableRows };

  const spacer = {
    type: 'spacer',
    children: [{ text: '' }],
  };

  // hack to fix nested references in children arrays
  const jsonParsedTable = JSON.parse(JSON.stringify([table, spacer]));

  Transforms.insertNodes(editor, jsonParsedTable, {
    at: [editor.children.length],
  });
};
