import { Children } from 'react';
import { Element } from 'slate';

const CustomElement = ({ attributes, children, element }: {
  attributes: any;
  children: typeof Children;
  element: Element;
}) => {
  const style = { textAlign: element.align };
  console.log(element)

  switch (element.type) {
    case 'spacer':
      return (
        <div {...attributes} contentEditable={false} className="spacer">
          {children}
        </div>
      );
    case 'table':
      return (
        <table {...attributes}>
          <tbody style={style} {...attributes}>
            {children}
          </tbody>
        </table>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return (
        <td style={style} {...attributes}>
          {children}
        </td>
      );
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default CustomElement;
