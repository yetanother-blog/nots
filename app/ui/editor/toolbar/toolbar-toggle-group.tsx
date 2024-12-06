import { FC } from 'react';
import {
  ToggleGroup,
  type ToolbarToggleGroupMultipleProps,
  type ToolbarToggleGroupSingleProps,
} from '@radix-ui/react-toolbar';

export type ToolbarToggleGroupProps = (
  | ToolbarToggleGroupMultipleProps
  | ToolbarToggleGroupSingleProps
) &
  React.PropsWithChildren;

export const ToolbarToggleGroup: FC<ToolbarToggleGroupProps> = (props) => {
  return <ToggleGroup className="flex gap-1" {...props} />;
};
