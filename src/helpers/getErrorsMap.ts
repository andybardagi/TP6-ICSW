import { ValidationError } from 'yup';

export const getErrorsMap = (errors: ValidationError) => {
  const errorsMap: Record<string, string> = {};
  errors.inner.forEach((err: ValidationError) => {
    if (err.path) {
      errorsMap[err.path] = err.message;
    }
  });
  return errorsMap;
};
