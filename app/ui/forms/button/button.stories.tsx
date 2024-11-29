import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

/**
 * The Button component is used to trigger an action or event, such as
 * submitting a form, opening a dialog, canceling an action, or performing a
 * delete operation.
 *
 * # Render as a Remix Router Link
 *
 * It's also possible to use the Button in combination with Remix Router (aka
 * React Router). Just pass the component of the routing library to the UI
 * component.
 *
 * ```tsx
 * import { Link } from '@remix-run/react';
 *
 * ...
 *
 * <Button as={Link} to="/some-route">
 *  Remix Router Link
 * </Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['grey'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const GreyFilled: Story = {
  args: {
    color: 'grey',
  },
  render: () => (
    <div className="flex flex-grow-0 flex-wrap gap-4">
      <Button onClick={() => console.log('clicked')}>Primary Button</Button>
      <Button isLoading={true} onClick={() => console.log('clicked')}>
        Primary Button
      </Button>
      <Button disabled={true} onClick={() => console.log('clicked')}>
        Primary Button
      </Button>
      <Button
        onClick={() => console.log('clicked')}
        icon="caretDown"
        iconPosition="start"
      >
        Primary Button
      </Button>
      <Button onClick={() => console.log('clicked')} icon="caretDown">
        Primary Button
      </Button>
      <Button
        isLoading={true}
        onClick={() => console.log('clicked')}
        icon="caretDown"
      >
        Primary Button
      </Button>
      <Button
        disabled={true}
        onClick={() => console.log('clicked')}
        icon="paragraph"
      >
        Primary Button
      </Button>
      <Button onClick={() => console.log('clicked')} icon="paragraph" />
      <Button
        isLoading={true}
        onClick={() => console.log('clicked')}
        icon="paragraph"
      />
      <Button
        disabled={true}
        onClick={() => console.log('clicked')}
        icon="paragraph"
      />
    </div>
  ),
};
