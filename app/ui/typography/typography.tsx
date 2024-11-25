import { clsx } from 'clsx';
import type { PolymorphicComponentProp } from '../utils/polymorphic-types';

type Color =
  | 'primary-300'
  | 'primary-400'
  | 'primary-500'
  | 'grey-100'
  | 'grey-200'
  | 'grey-300'
  | 'grey-400'
  | 'grey-500'
  | 'grey-600'
  | 'grey-700'
  | 'grey-800'
  | 'white'
  | 'black';

type Variant =
  | 'title'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'bodySmall'
  | 'bodyTiny';

type Level = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export type TypographyProps = {
  variant?: Variant;
  textColor?: Color;
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'regular' | 'semibold' | 'bold';
  textTransform?: 'uppercase' | 'capitalize' | 'lowercase';
  className?: string;
};

export const Typography = <C extends React.ElementType = 'p'>({
  children,
  as,
  variant = 'body' as Variant,
  textAlign,
  textColor,
  fontWeight,
  textTransform,
  className,
  ...props
}: PolymorphicComponentProp<C, TypographyProps>) => {
  const titleClasses = clsx(['text-5xl', !fontWeight && 'font-bold']);
  const heading1Classes = clsx([
    'text-3xl md:text-4xl',
    !fontWeight && 'font-bold',
  ]);
  const heading2Classes = clsx([
    'text-xl md:text-3xl',
    !fontWeight && 'font-bold',
  ]);
  const heading3Classes = clsx([
    'text-base md:text-lg',
    !fontWeight && 'font-semibold',
  ]);
  const bodyClasses = clsx(['text-base', !fontWeight && 'font-normal']);
  const bodySmallClasses = clsx(['text-sm', !fontWeight && 'font-normal']);
  const bodyTinyClasses = clsx(['text-xs', !fontWeight && 'font-normal']);

  const textColorClasses = clsx([
    textColor === 'primary-300' && `text-nots-primary-300`,
    textColor === 'primary-400' && `text-nots-primary-400`,
    textColor === 'primary-500' && `text-nots-primary-500`,
    textColor === 'grey-100' && `text-nots-grey-100`,
    textColor === 'grey-200' && `text-nots-grey-200`,
    textColor === 'grey-300' && `text-nots-grey-300`,
    textColor === 'grey-400' && `text-nots-grey-400`,
    textColor === 'grey-500' && `text-nots-grey-500`,
    textColor === 'grey-600' && `text-nots-grey-600`,
    textColor === 'grey-700' && `text-nots-grey-700 dark:text-white`,
    textColor === 'grey-800' && `text-nots-grey-800 dark:text-white`,
    textColor === 'white' && 'text-white',
    textColor === 'black' && 'text-black',
  ]);

  const alignmentClasses = clsx([
    textAlign === 'left' && 'text-left',
    textAlign === 'center' && 'text-center',
    textAlign === 'right' && 'text-right',
  ]);

  const fontWeightClasses = clsx([
    fontWeight === 'regular' && 'font-normal',
    fontWeight === 'semibold' && 'font-semibold',
    fontWeight === 'bold' && 'font-bold',
  ]);

  const textTransformClasses = clsx([
    textTransform === 'uppercase' && 'uppercase',
    textTransform === 'capitalize' && 'capitalize',
    textTransform === 'lowercase' && 'lowercase',
  ]);

  const classes = clsx([
    'antialiased font-sans',
    variant === 'title' && titleClasses,
    variant === 'heading1' && heading1Classes,
    variant === 'heading2' && heading2Classes,
    variant === 'heading3' && heading3Classes,
    variant === 'body' && bodyClasses,
    variant === 'bodySmall' && bodySmallClasses,
    variant === 'bodyTiny' && bodyTinyClasses,
    textColorClasses,
    alignmentClasses,
    fontWeightClasses,
    textTransformClasses,
    className,
  ]);

  const variantsMapping: { [index in Variant]: Level } = {
    title: 'h1',
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    body: 'p',
    bodySmall: 'p',
    bodyTiny: 'p',
  };

  const Component = as ?? variantsMapping[variant];
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
