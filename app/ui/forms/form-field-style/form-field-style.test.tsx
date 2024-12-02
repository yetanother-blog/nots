import { render } from '@testing-library/react';
import { FormFieldStyle } from './form-field-style';

describe('FormFieldStyle', () => {
  it('should render basic text input with style 😎', () => {
    const { container } = render(
      <FormFieldStyle className="block h-11">
        <input
          className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
          id="name"
          type="text"
        />
      </FormFieldStyle>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render basic text input with disabled style 🫣', () => {
    const { container } = render(
      <FormFieldStyle className="block h-11" disabled>
        <input
          className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
          id="name"
          type="text"
        />
      </FormFieldStyle>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render basic text input with error style 🚨', () => {
    const { container } = render(
      <FormFieldStyle className="block h-11" isError={true}>
        <input
          className="h-full w-full bg-transparent px-3 text-sm font-light text-ws-grey-900  placeholder-ws-grey-400  outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
          id="name"
          type="text"
        />
      </FormFieldStyle>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render form field style as textarea 🦹‍♀️', () => {
    const { container } = render(
      <FormFieldStyle
        className="block h-64 w-full bg-transparent p-3 text-sm  font-light text-ws-grey-900 placeholder-ws-grey-400 outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
        as="textarea"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render form field style as textarea w/ disabled style 🫣', () => {
    const { container } = render(
      <FormFieldStyle
        className="block h-64 w-full bg-transparent p-3 text-sm  font-light text-ws-grey-900 placeholder-ws-grey-400 outline-none read-only:text-ws-grey-600 disabled:text-ws-grey-400"
        as="textarea"
        disabled
      />
    );
    expect(container).toMatchSnapshot();
  });
});
