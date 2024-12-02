import type { FC, LabelHTMLAttributes, PropsWithChildren } from 'react';
import { Typography } from '~/ui/';

export type LabelProps = {
  className?: string;
} & PropsWithChildren &
  LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FC<LabelProps> = ({
  className,
  children,
  htmlFor,
  ...labelProps
}) => {
  return (
    <Typography
      as="label"
      variant="body"
      textColor="grey-800"
      htmlFor={htmlFor}
      {...labelProps}
      className={className}
    >
      {children}
    </Typography>
  );
};
