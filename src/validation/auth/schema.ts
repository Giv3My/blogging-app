import * as yup from 'yup';
import * as fields from './fields';

export const registerSchema = yup.object().shape({
  email: fields.email,
  password: fields.password,
  profileType: fields.profileType,
});

export const loginSchema = yup.object().shape({
  email: fields.email,
  password: fields.password,
});
