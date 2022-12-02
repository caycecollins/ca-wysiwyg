export type CustomElement = {
  align: string;
  children: CustomText[];
  type:
    | 'paragraph'
    | 'table'
    | 'table-row'
    | 'table-cell'
    | 'spacer'
    | 'block-quote'
    | 'bulleted-list'
    | 'heading-one'
    | 'heading-two'
    | 'list-item'
    | 'numbered-list';
};

export type CustomText = { text: string };

export interface BaseProps {
  [key: string]: unknown;
}
