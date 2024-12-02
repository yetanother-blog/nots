import { clsx } from 'clsx';
import type { ElementType, ReactElement } from 'react';
import { forwardRef } from 'react';
import type { PolymorphicComponentPropWithRef } from '~/ui';

export type FormFieldStyleProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      isError?: boolean;
      disabled?: boolean;
      className?: string;
    }
  >;

export type FormFieldStyleComponent = <C extends ElementType = 'span'>(
  props: FormFieldStyleProps<C>
) => ReactElement | null;

// eslint-disable-next-line react/display-name
export const FormFieldStyle = forwardRef(
  <C extends ElementType = 'span'>(
    {
      as,
      children,
      isError,
      disabled,
      className,
      ...props
    }: FormFieldStyleProps<C>,
    ref?: unknown
  ) => {
    const Component = as || 'span';
    const disabledAttribute = as ? { disabled } : undefined;

    return (
      <Component
        ref={ref}
        className={clsx(
          'border transition-all focus-within:outline-none focus-within:ring-4 active:ring-4',
          isError
            ? 'border-nots-danger-500  ring-nots-danger-300 focus-within:border-nots-danger-500  hover:border-nots-danger-500'
            : 'border-nots-grey-300  ring-nots-grey-100 focus-within:border-nots-grey-500  hover:border-nots-grey-500 dark:border-nots-grey-600  dark:ring-nots-grey-600 dark:focus-within:border-nots-grey-700  dark:hover:border-nots-grey-700',
          disabled && 'pointer-events-none bg-ws-grey-50',
          className
        )}
        {...disabledAttribute}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as FormFieldStyleComponent;
