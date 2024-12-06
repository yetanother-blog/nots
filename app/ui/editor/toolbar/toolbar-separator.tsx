import { FC } from 'react';
import { Separator } from '@radix-ui/react-toolbar';

export const ToolbarSeparator: FC = () => {
  return (
    <Separator className="w-[1px] bg-nots-grey-200 dark:bg-nots-grey-600" />
  );
};
