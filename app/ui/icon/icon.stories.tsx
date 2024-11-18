import { Icon } from './icon';

export default {
  title: 'Iconography',
  component: Icon,
};

export const CustomStyles = {
  render: () => <Icon icon="headline" className="text-nots-primary-500" />,
  name: 'CustomStyles',
};
