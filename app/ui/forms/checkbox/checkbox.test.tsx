import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('should render unticked checkbox', () => {
    const { container } = render(
      <Checkbox label="The default" id="default" onChange={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render ticked checkbox', () => {
    const { container } = render(
      <Checkbox
        label="The default"
        id="default"
        onChange={() => {}}
        checked={true}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render disabled and unticked checkbox', () => {
    const { container } = render(
      <Checkbox
        label="The disabled text field"
        id="disabled"
        disabled={true}
        value="This is a disabled text field"
        onChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render disabled and ticked checkbox', () => {
    const { container } = render(
      <Checkbox
        label="The disabled text field"
        id="disabled"
        disabled={true}
        checked={true}
        value="This is a disabled text field"
        onChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render checkbox w/ helper text', () => {
    const { container } = render(
      <Checkbox
        label="The helper text"
        id="helper"
        helperText="This is a helper text"
        onChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render checkbox w/ error', () => {
    const { container } = render(
      <Checkbox
        label="The error text field"
        id="error"
        isError={true}
        helperText="This is an error text field"
        onChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should wire up ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox id="default" ref={ref} />);

    expect(ref.current).toMatchSnapshot();
  });

  it('should set checkbox to indeterminate', () => {
    const { container } = render(
      <Checkbox id="indeterminate" indeterminate={true} />
    );

    const checkbox = container.querySelector('input');

    expect(checkbox?.indeterminate).toBe(true);
  });

  it('should unset indeterminate state', () => {
    const { queryByRole, rerender } = render(
      <Checkbox id="indeterminate" indeterminate={true} />
    );

    rerender(<Checkbox id="indeterminate" indeterminate={false} />);

    const checkbox = queryByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(false);
  });
});
