import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { authService } from '@/services';
import { registerSchema } from '@/validation/auth/schema';
import type { RegisterFormValues } from './types';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { PasswordTextField, Loader } from '@/components/ui';
import styles from './register-form.module.scss';

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      profileType: 'author',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    setIsLoading(true);

    const { error } = await authService.signUp(values);

    if (error) {
      setIsLoading(false);

      return handleError();
    }

    router.replace('/');
  };

  const handleError = () => {
    setError('email', {
      type: 'submit',
      message: 'User already registered',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        size="small"
        label="Email"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />
      <PasswordTextField
        size="small"
        label="Password"
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        register={register('password')}
      />
      <FormControl margin="normal">
        <FormLabel>Profile type</FormLabel>
        <RadioGroup row name="row-radio-buttons-group" defaultValue="author">
          <FormControlLabel
            label="Author"
            value="author"
            control={<Radio size="small" />}
            {...register('profileType')}
          />
          <FormControlLabel
            label="Commentator"
            value="commentator"
            control={<Radio size="small" />}
            {...register('profileType')}
          />
        </RadioGroup>
      </FormControl>
      <Button type="submit" variant="contained">
        {!isLoading ? 'Sign Up' : <Loader />}
      </Button>
    </form>
  );
};
