import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from './editor';

const meta: Meta<typeof Editor> = {
  title: 'Editor/Editor',
  component: Editor,
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Primary: Story = {
  args: {
    onChange: () => null,
  },
};
