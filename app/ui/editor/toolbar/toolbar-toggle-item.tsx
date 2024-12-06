import { FC } from 'react';
import {
  ToggleItem,
  type ToolbarToggleItemProps as RadixToolbarToggleItemProps,
} from '@radix-ui/react-toolbar';
import { Button, IconName } from '~/ui';

export type ToolbarToggleItemProps = {
  icon: IconName;
} & Omit<RadixToolbarToggleItemProps, 'color'>;

export const ToolbarToggleItem: FC<ToolbarToggleItemProps> = (props) => {
  return (
    <Button
      variant="subtle"
      as={ToggleItem}
      className="data-[state=on]:bg-nots-grey-800 data-[state=on]:text-white dark:data-[state=on]:bg-white dark:data-[state=on]:text-nots-grey-800"
      {...props}
    />
  );
};
