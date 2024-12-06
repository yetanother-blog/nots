import { Meta } from '@storybook/react';
import { ToolbarRoot } from './toolbar-root';
import { ToolbarToggleGroup } from './toolbar-toggle-group';
import { ToolbarToggleItem } from './toolbar-toggle-item';
import { ToolbarSeparator } from './toolbar-separator';

export default {
  title: 'Editor/Toolbar',
  component: ToolbarRoot,
} as Meta;

const Template = () => (
  <ToolbarRoot>
    <ToolbarToggleGroup type="single">
      <ToolbarToggleItem value="h1" icon="h1" />
      <ToolbarToggleItem value="h2" icon="h2" />
      <ToolbarToggleItem value="h3" icon="h3" />
    </ToolbarToggleGroup>
    <ToolbarSeparator />
    <ToolbarToggleGroup type="multiple">
      <ToolbarToggleItem value="bold" icon="bold" />
      <ToolbarToggleItem value="italic" icon="italic" />
      <ToolbarToggleItem value="underline" icon="underline" />
    </ToolbarToggleGroup>
    <ToolbarSeparator />
    <ToolbarToggleGroup type="single">
      <ToolbarToggleItem value="unordered-list" icon="ul" />
      <ToolbarToggleItem value="ordered-list" icon="ol" />
      <ToolbarToggleItem value="check-list" icon="checkList" />
    </ToolbarToggleGroup>
  </ToolbarRoot>
);

export const Default = Template.bind({});
