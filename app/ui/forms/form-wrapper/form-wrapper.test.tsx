import { render } from '@testing-library/react';
import { FormWrapper } from './form-wrapper';

describe('FormWrapper', () => {
  it('should render form wrapper', () => {
    const { container } = render(<FormWrapper>FormWrapper</FormWrapper>);
    expect(container).toMatchSnapshot();
  });

  it('should render form wrapper with helper text', () => {
    const { container } = render(
      <FormWrapper helperText="Helper text">FormWrapper</FormWrapper>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render form wrapper with error', () => {
    const { container } = render(
      <FormWrapper isError={true} helperText="Helper text">
        FormWrapper
      </FormWrapper>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with custom class name', () => {
    const { container } = render(
      <FormWrapper className="custom-class-name">FormWrapper</FormWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
