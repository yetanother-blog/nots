import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldStyle } from './form-field-style';

/**
 * ### Usage
 *
 * You can use the `FormFieldStyle` component to style form fields and add some
 * `children` to it. Or you can also use the `as` prop to render a different
 * element.
 *
 * ### `children`
 *
 * Basically, same code as demonstrated by the above example.
 *
 * ```jsx
 * <FormFieldStyle className="block h-11">
 *   <input
 *     className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
 *     id="name"
 *     type="text"
 *   />
 * </FormFieldStyle>;
 * ```
 */
const meta: Meta<typeof FormFieldStyle> = {
  title: 'Forms/FormFieldStyle',
  component: FormFieldStyle,
};

export default meta;
type Story = StoryObj<typeof FormFieldStyle>;

/**
 * The `FormFieldStyle` component is used to style form fields. It is used as a
 * wrapper around the `input` element.
 */
export const FormFieldStyleStory: Story = {
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: () => (
    <FormFieldStyle className="block h-11">
      <input
        className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
        id="name"
        type="text"
      />
    </FormFieldStyle>
  ),
};

export const AsInputDisabled: Story = {
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: () => (
    <FormFieldStyle className="block h-11" disabled>
      <input
        className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
        id="name"
        type="text"
      />
    </FormFieldStyle>
  ),
};

export const AsTextArea: Story = {
  render: () => (
    <FormFieldStyle
      className="block h-64 w-full bg-transparent p-3 text-sm  font-light text-ws-grey-900 placeholder-ws-grey-400 outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
      as="textarea"
    />
  ),
};

export const AsTextAreaDisabled: Story = {
  render: () => (
    <FormFieldStyle
      className="block h-64 w-full bg-transparent p-3 text-sm  font-light text-ws-grey-900 placeholder-ws-grey-400 outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
      as="textarea"
      disabled
    />
  ),
};

export const AsSelect: Story = {
  render: () => (
    <FormFieldStyle
      className="block h-11 w-full bg-transparent p-3 text-sm  font-light text-ws-grey-900 placeholder-ws-grey-400 outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
      as="select"
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </FormFieldStyle>
  ),
};

export const AsSelectDisabled: Story = {
  render: () => (
    <FormFieldStyle
      className="block h-11 w-full bg-transparent p-3 text-sm  font-light text-ws-grey-900 placeholder-ws-grey-400 outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
      as="select"
      disabled
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </FormFieldStyle>
  ),
};
