import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { supabase } from '@/supabase/client';
import { loginSchema } from '@/validation/auth/schema';
import type { LoginFormValues } from './types';

import { Button, TextField } from '@mui/material';
import { PasswordTextField } from '@/components/ui';
import styles from './login-form.module.scss';

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      return handleError();
    }

    router.replace('/');
  };

  const handleError = () => {
    setError('email', {
      type: 'submit',
    });
    setError('password', {
      type: 'submit',
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
      <Button type="submit" variant="contained">
        Sign In
      </Button>
    </form>
  );
};
