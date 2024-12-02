import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

/**
 * The Label component is used to label an `input`, `select`, or `textarea`.
 * Nothing special here, but we want to stay DRY.
 *
 * Under the hood we inherit all types from
 * `LabelHTMLAttributes<HTMLLabelElement>` so we can handle this element as a
 * normal HTML `label` element. For further information, please refer to the
 * [MDN
 * documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).
 */
const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    htmlFor: 'name',
    children: 'Name',
  },
};
