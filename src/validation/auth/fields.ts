import * as yup from 'yup';

export const email = yup
  .string()
  .required('Email is required')
  .email('Enter a valid email');

export const password = yup
  .string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters')
  .matches(
    /^[a-zA-Z0-9]+$/ && /(?:[^`!@#$%"^&*<>|\\\-_=+'\/.,]*[`!@#$%"^&*<>|\\\-_=+'\/.,]){1}/,
    'A-Z, 0-9 and at least 1 special symbol'
  );

export const profileType = yup.string().oneOf(['author', 'commentator']).required();
