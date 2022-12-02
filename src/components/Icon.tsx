import { forwardRef, PropsWithChildren, Ref } from 'react';
import { BaseProps } from './types';

export const Icon = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLSpanElement>,
  ) => <span {...props} ref={ref} className="icon material-icons" />,
);

export default Icon;
