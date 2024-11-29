import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '~/ui/data-display/typography/typography';
import type { IconName } from '~/ui';
import { LoadingIndicator, Icon } from '~/ui';
import type { PolymorphicComponentPropWithRef } from '~/ui/utils/polymorphic-types';

type Variant = 'filled';
export type ButtonColor = 'grey';
type Size = 'regular';

export type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      isLoading?: boolean;
      variant?: Variant;
      color?: ButtonColor;
      size?: Size;
      iconPosition?: 'start' | 'end';
      icon?: IconName;
      className?: string;
    }
  >;

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      children,
      isLoading,
      disabled,
      color = 'grey',
      size = 'regular',
      variant = 'filled',
      icon,
      iconPosition = 'end',
      className,
      ...props
    }: ButtonProps<C>,
    ref?: unknown
  ) => {
    /*
     * Filled Variants
     */
    const filledClasses = clsx([
      'text-white dark:text-nots-grey-800',
      isLoading &&
        'drop-shadow-none hover:drop-shadow-none pointer-events-none',
    ]);

    const primaryFilledClasses = clsx([
      filledClasses,
      'disabled:bg-nots-grey-200 dark:disabled:bg-white dark:disabled:text-nots-grey-200 focus:outline-none',
      'bg-nots-grey-800 dark:bg-white hover:bg-nots-grey-600 dark:hover:bg-nots-grey-100 focus:outline-none focus:ring-2 focus:ring-nots-grey-300',
      isLoading && 'hover:bg-ws-primary-500',
    ]);

    const colorClasses = clsx([
      variant === 'filled' && color === 'grey' && primaryFilledClasses,
    ]);

    const baseShapeClasses = clsx([size === 'regular' && `px-3 py-[6px]`]);

    const iconOnlyClasses = clsx(['w-9 h-8', 'py-0', 'px-0']);
    const isOnlyIcon = !children && icon;

    const classes = clsx([
      'flex items-center justify-center rounded-sm',
      'transition-colors duration-200 ease-in-out',
      'gap-2',
      isOnlyIcon ? iconOnlyClasses : baseShapeClasses,
      iconPosition === 'start' && 'flex-row-reverse',
      iconPosition === 'end' && 'flex-row',
      isLoading && 'pointer-events-none',
      colorClasses,
      className,
    ]);

    const hideClasses = clsx([isLoading && 'opacity-0 pointer-events-none']);

    const Component = as || 'button';

    return (
      <Component className={classes} disabled={disabled} {...props} ref={ref}>
        {children && (
          <Typography
            className={hideClasses}
            variant="heading3"
            fontWeight="semibold"
            as="span"
          >
            {children}
          </Typography>
        )}
        {isLoading && <LoadingIndicator className="absolute" />}
        {icon && <Icon icon={icon} className={hideClasses} />}
      </Component>
    );
  }
) as ButtonComponent;
