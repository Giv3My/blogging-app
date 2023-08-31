import React from 'react';

interface TabPanelProps {
  index: number;
  value: number;
  children?: React.ReactNode;
}

export const CustomTabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...props
}) => {
  return (
    <div hidden={value !== index} {...props}>
      {value === index && children}
    </div>
  );
};
