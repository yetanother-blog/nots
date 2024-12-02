import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import { Button } from '~/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Checkbox allow users to accept or select something in forms (e.g. terms and
 * conditions).
 */
export const CheckboxStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 dark:bg-nots-grey-800">
      <Checkbox label="Default" id="default" onChange={action('changed')} />
      <Checkbox
        label="Checked"
        id="default-checked"
        checked={true}
        onChange={action('changed')}
      />
      <Checkbox
        label="Default w/ helper text"
        id="helper-text"
        value="This is a text field with a helper text"
        helperText="This is a helper text"
        onChange={action('changed')}
      />
      <Checkbox
        label="Disabled"
        id="disabled-text-field"
        disabled={true}
        onChange={action('changed')}
      />
      <Checkbox
        label="Checked and disabled"
        id="disabled-text-field"
        disabled={true}
        checked={true}
        onChange={action('changed')}
      />
      <Checkbox
        label="With error message"
        id="error-text-field"
        isError={true}
        helperText="Something went wrong"
        onChange={action('changed')}
      />
      <Checkbox
        label="With long text: Minim qui reprehenderit cillum duis et commodo occaecat officia labore dolore consectetur. Lorem cupidatat tempor irure voluptate laboris non magna tempor aute fugiat ipsum. Ipsum consectetur id reprehenderit dolore id aliqua laboris eu ipsum culpa non."
        id="with-long-text"
        checked={true}
        onChange={action('changed')}
      />
    </div>
  ),
};

export const CheckboxIndeterminate: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [indeterminate, setIndeterminate] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);

    const toggleIndeterminate = () => {
      setIndeterminate((i) => !i);
    };

    const toggleChecked = () => {
      setChecked((c) => !c);
      setIndeterminate(false);
    };

    return (
      <div className="flex gap-4 items-center">
        <Checkbox
          label="Indeterminate"
          id="indeterminate"
          indeterminate={indeterminate}
          checked={checked}
          onChange={toggleChecked}
        />
        <Button onClick={toggleIndeterminate}>Toggle State</Button>
      </div>
    );
  },
};
