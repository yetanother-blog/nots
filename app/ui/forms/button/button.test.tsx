import { render } from '@testing-library/react';
import type { ButtonColor } from './button';
import { Button } from './button';

describe('Button', () => {
  it.each<[ButtonColor, string]>([['grey', 'bg-nots-grey-800']])(
    'should render %s filled button',
    (variant, expectedColor) => {
      const { getByRole, container } = render(
        <Button variant="filled" color={variant} />
      );
      const button = getByRole('button');
      expect(button).toHaveClass(expectedColor);
      expect(container).toMatchSnapshot();
    }
  );

  it('should render disabled button', () => {
    const { getByRole, container } = render(
      <Button variant="filled" disabled />
    );
    const button = getByRole('button');
    expect(button).toHaveClass('disabled:bg-nots-grey-200');
    expect(container).toMatchSnapshot();
  });

  it('should render loading button', () => {
    const { getByRole, container } = render(
      <Button variant="filled" isLoading />
    );
    const loadingIndicator = getByRole('status');

    expect(loadingIndicator).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render button with custom class', () => {
    const { getByRole } = render(
      <Button variant="filled" className="custom-class" />
    );
    const button = getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should render button as a link', () => {
    const { getByRole } = render(
      <Button variant="filled" as="a" href="https://example.com" />
    );
    const button = getByRole('link');
    expect(button).toHaveAttribute('href', 'https://example.com');
  });

  it('should render button with icon', () => {
    const { getByRole } = render(<Button variant="filled" icon="caretDown" />);
    const button = getByRole('button');
    expect(button.innerHTML).toContain('svg');
  });
});
