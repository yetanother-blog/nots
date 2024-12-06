import { render } from '@testing-library/react';
import { ToolbarRoot } from './toolbar-root';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarToggleGroup } from './toolbar-toggle-group';
import { ToolbarToggleItem } from './toolbar-toggle-item';

describe('Toolbar', () => {
  it('should render toolbar', () => {
    const { container } = render(
      <ToolbarRoot>
        <ToolbarToggleGroup type="single">
          <ToolbarToggleItem value="h1" icon="h1" />
          <ToolbarToggleItem value="h2" icon="h2" />
          <ToolbarToggleItem value="h3" icon="h3" />
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup type="multiple">
          <ToolbarToggleItem value="bold" icon="bold" />
          <ToolbarToggleItem value="italic" icon="italic" />
          <ToolbarToggleItem value="underline" icon="underline" />
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup type="single">
          <ToolbarToggleItem value="unordered-list" icon="ul" />
          <ToolbarToggleItem value="ordered-list" icon="ol" />
          <ToolbarToggleItem value="check-list" icon="checkList" />
        </ToolbarToggleGroup>
      </ToolbarRoot>
    );

    expect(container).toMatchSnapshot();
  });
});
