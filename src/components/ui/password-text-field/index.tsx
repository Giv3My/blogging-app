import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordTextFieldProps = Omit<OutlinedInputProps, 'margin'> & {
  margin?: 'dense' | 'none' | 'normal';
  helperText?: string;
  register: UseFormRegisterReturn;
};

export const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
  size,
  margin,
  helperText,
  error,
  register,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisible = () => setPasswordVisible((prev) => !prev);

  return (
    <FormControl size={size} variant="outlined" margin={margin} error={error}>
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        type={passwordVisible ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisible} edge="end">
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...register}
        {...props}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
