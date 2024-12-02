import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Typography } from '~/ui';
import { clsx } from 'clsx';

export type FormWrapperProps = {
  helperText?: ReactNode;
  isError?: boolean;
  className?: string;
} & PropsWithChildren;

export const FormWrapper: FC<FormWrapperProps> = ({
  children,
  helperText,
  isError,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {children}
      {helperText && (
        <Typography
          variant="bodyTiny"
          textColor={isError ? 'danger-500' : 'grey-600'}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};
