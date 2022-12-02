import { forwardRef, PropsWithChildren, Ref } from 'react';
import { useSlate } from 'slate-react';
import {
  isBlockActive,
  isFormatActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleFormat,
  toggleMark,
} from '../utils/utils';
import Icon from './Icon';
import { BaseProps } from './types';

interface ButtonProps {
  active: boolean;
  primary?: boolean;
  secondary?: boolean;
  reversed?: boolean;
}

export const Button = forwardRef(
  (
    { active, primary, secondary, reversed, ...props }: PropsWithChildren<
      ButtonProps & BaseProps
    >,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const classNames = [];
    if (active) {
      classNames.push('active');
    }
    if (primary) {
      classNames.push('primary');
    } else if (secondary) {
      classNames.push('secondary');
    }

    return <button ref={ref} className={classNames.join(' ')} {...props} />;
  },
);

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed={true}
      active={isFormatActive(editor, format)}
      onClick={() => toggleFormat(editor, format)}
    >
      Button
    </Button>
  );
};
