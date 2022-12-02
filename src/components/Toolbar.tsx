import { forwardRef, PropsWithChildren, Ref } from 'react';
import Menu from './Menu';
import { BaseProps } from './types';

export const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>,
  ) => <Menu {...props} ref={ref} />,
);

export default Toolbar;
