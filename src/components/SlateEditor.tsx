import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Descendant, createEditor, BaseEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withTables } from '../hoc/withTables';
import CustomLeaf from './CustomLeaf';
import CustomElement from './CustomElement';
import Toolbar from './Toolbar';
import { Button, BlockButton, MarkButton } from './Button';
import { insertTableElement, toggleFormat, toggleMark } from '../utils/utils';
import isHotkey from 'is-hotkey';
import { CustomElement as CustomElementType, CustomText } from './types';
import CreateTableModal from './CreateTableModal';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElementType;
    Text: CustomText;
  }
}

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const SlateEditor = () => {
  const [showTableCreateModal, setShowTableCreateModal] = useState(false);
  const renderElement = useCallback(
    (props) => <CustomElement {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <CustomLeaf {...props} />, []);
  const editor = useMemo(
    () => withReact(withHistory(withTables(createEditor()))),
    [],
  );

  const initialValue: Descendant[] = useMemo(() => {
    const persistedContent = localStorage.getItem('content');

    return persistedContent !== null
      ? JSON.parse(persistedContent)
      : [
          {
            type: 'paragraph',
            children: [
              { text: 'Insert a table using the "Create table" button above' },
            ],
          },
        ];
  }, []);

  const handleSlateChange = (value: any) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type,
    );
    if (isAstChange) {
      // Save the value to Local Storage.
      const content = JSON.stringify(value);
      localStorage.setItem('content', content);
    }
  };

  const handleCreateTableClicked = () => {
    !showTableCreateModal && setShowTableCreateModal(true);
  };

  const handleCreateTable = ({ rows, columns }: {
    rows: number;
    columns: number;
  }) => {
    insertTableElement({ editor, rows, columns });
    handleCloseTableCreateModal();
  };

  const handleCloseTableCreateModal = () => {
    setShowTableCreateModal(false);
  };

  return (
    <Slate editor={editor} value={initialValue} onChange={handleSlateChange}>
      <CreateTableModal
        active={showTableCreateModal}
        onCreate={handleCreateTable}
        onClose={handleCloseTableCreateModal}
      />
      <Toolbar>
        <Button onClick={handleCreateTableClicked}>Create table</Button>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onDOMBeforeInput={(event: InputEvent) => {
          switch (event.inputType) {
            case 'formatBold': {
              event.preventDefault();
              return toggleFormat(editor, 'bold');
            }
            case 'formatItalic': {
              event.preventDefault();
              return toggleFormat(editor, 'italic');
            }
            case 'formatUnderline': {
              event.preventDefault();
              return toggleFormat(editor, 'underlined');
            }
          }
        }}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

export default SlateEditor;
