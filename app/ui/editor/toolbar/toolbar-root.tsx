import { FC } from 'react';
import { Root, type ToolbarProps } from '@radix-ui/react-toolbar';
import { clsx } from 'clsx';

export const ToolbarRoot: FC<ToolbarProps> = (props) => {
  return (
    <Root
      className={clsx(
        'inline-flex flex-row gap-3 p-2 border border-nots-grey-200 dark:border-nots-grey-600 dark:bg-nots-grey-700',
        props.className
      )}
      {...props}
    />
  );
};
