import React from 'react';

export const useToggle = () => {
  const [isActive, setIsActive] = React.useState(false);

  const onActiveChange = (state: boolean) => {
    setIsActive(state);
  };

  const onToggle = () => {
    setIsActive((prev) => !prev);
  };

  return [isActive, onToggle, onActiveChange] as const;
};
