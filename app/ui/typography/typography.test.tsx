import { render } from '@testing-library/react';
import { Typography } from './typography';

describe('Typography Component', () => {
  describe('Variants with default mapping`', () => {
    it('should render with variant title as h1', () => {
      const { container } = render(
        <Typography variant="title">Test</Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('h1');
      expect(element).toBeInTheDocument();
    });

    it('should render with variant heading1 as h1', () => {
      const { container } = render(
        <Typography variant="heading1">Test</Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('h1');
      expect(element).toBeInTheDocument();
    });

    it('should render with variant heading2 as h2', () => {
      const { container } = render(
        <Typography variant="heading2">Test</Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('h2');
      expect(element).toBeInTheDocument();
    });

    it('should render with variant heading3 as h3', () => {
      const { container } = render(
        <Typography variant="heading3">Test</Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('h3');
      expect(element).toBeInTheDocument();
    });

    it('should render with variant body as p', () => {
      const { container } = render(
        <Typography variant="body">Test</Typography>
      );

      expect(container).toBeInTheDocument();

      const element = container.querySelector('p');
      expect(element).toBeInTheDocument();
    });

    it('should render with variant bodySmall as p', () => {
      const { container } = render(
        <Typography variant="bodySmall">Test</Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('p');
      expect(element).toBeInTheDocument();
    });

    it('should render with variant bodyTiny as p', () => {
      const { container } = render(
        <Typography variant="bodyTiny">Test</Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('p');
      expect(element).toBeInTheDocument();
    });
  });
  describe('as prop`', () => {
    it('should accept label props', () => {
      const { container } = render(
        <Typography variant="title" as="label" htmlFor="name">
          Test
        </Typography>
      );
      expect(container).toBeInTheDocument();

      const element = container.querySelector('label');
      const htmlFor = element?.getAttribute('for');

      expect(htmlFor).toBe('name');
      expect(element).toBeInTheDocument();
    });
  });

  describe('font props', () => {
    it('should render with text transform uppercase', () => {
      const { container } = render(
        <Typography variant="title" textTransform="uppercase">
          Test
        </Typography>
      );
      expect(container).toMatchSnapshot();
    });
    it('should render with text transform capitalize', () => {
      const { container } = render(
        <Typography variant="title" textTransform="capitalize">
          Test
        </Typography>
      );
      expect(container).toMatchSnapshot();
    });
    it('should render with text transform lowercase', () => {
      const { container } = render(
        <Typography variant="title" textTransform="lowercase">
          Test
        </Typography>
      );
      expect(container).toMatchSnapshot();
    });
    it('should render with text align center', () => {
      const { container } = render(
        <Typography variant="title" textAlign="center">
          Test
        </Typography>
      );
      expect(container).toMatchSnapshot();
    });
    it('should render with text align right', () => {
      const { container } = render(
        <Typography variant="title" textAlign="right">
          Test
        </Typography>
      );
      expect(container).toMatchSnapshot();
    });
    it('should render with text align left', () => {
      const { container } = render(
        <Typography variant="title" textAlign="left">
          Test
        </Typography>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
