import { Variants } from 'framer-motion';

export const variants: Variants = {
  offscreen: {
    y: 150,
  },
  onscreen: {
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.4,
    },
  },
};
