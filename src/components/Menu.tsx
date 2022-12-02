import { forwardRef, PropsWithChildren, Ref } from 'react';
import { BaseProps } from './types';

export const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement | undefined>,
  ) => <div {...props} ref={ref} className={className ?? "menu"} />,
);

export default Menu;
