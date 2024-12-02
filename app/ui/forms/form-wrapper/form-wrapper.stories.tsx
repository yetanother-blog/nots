import type { Meta, StoryObj } from '@storybook/react';
import { FormWrapper } from './form-wrapper';
import { Label } from '../label/label';
import { FormFieldStyle } from '../form-field-style/form-field-style';

/**
 * The FormWrapper component is used to provide a consistent positioning for the
 * form elements.
 */
const meta: Meta<typeof FormWrapper> = {
  title: 'Forms/FormWrapper',
  component: FormWrapper,
};

export default meta;
type Story = StoryObj<typeof FormWrapper>;

/**
 * In this example we compose everything together by adding a `Label`, a
 * `FormFieldStyle` and an `input` element as `children` to the `FormWrapper`
 * component.
 */
export const Primary: Story = {
  render: () => (
    <FormWrapper helperText="Helper text">
      <Label htmlFor="name">Name</Label>
      <FormFieldStyle className="h-11">
        <input
          className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
          id="name"
          type="text"
        />
      </FormFieldStyle>
    </FormWrapper>
  ),
};

/**
 * Provide an `isError` prop to the `FormWrapper` component to display the error
 * state by using the `helpText` prop.
 */
export const ErrorState: Story = {
  render: () => (
    <FormWrapper helperText="Helper text" isError={true}>
      <Label htmlFor="name">Name</Label>
      <FormFieldStyle className="h-11" isError={true}>
        <input
          className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
          id="name"
          type="text"
        />
      </FormFieldStyle>
    </FormWrapper>
  ),
};
