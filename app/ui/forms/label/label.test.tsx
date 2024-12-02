import { render } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('should render label', () => {
    const { container } = render(<Label htmlFor="test">Label</Label>);
    expect(container).toMatchSnapshot();
  });

  it('should render with custom class', () => {
    const { container } = render(
      <Label htmlFor="test" className="custom-class">
        Label
      </Label>
    );
    expect(container).toMatchSnapshot();
  });
});
