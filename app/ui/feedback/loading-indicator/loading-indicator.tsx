import { clsx } from 'clsx';
import { FC } from 'react';
import { Icon } from '~/ui/data-display/icon/icon';

type LoadingIndicatorProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'pointer-events-none flex items-center justify-center',
        className
      )}
      {...props}
    >
      <Icon
        icon="loading"
        className="text-current inline-block h-6 w-6 animate-spin"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </Icon>
    </div>
  );
};
