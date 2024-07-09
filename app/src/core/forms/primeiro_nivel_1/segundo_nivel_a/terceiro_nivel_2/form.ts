import { FormModel } from '../../../../model/form.model';

export const form: FormModel = {
  path: '/v1/api/form1',
  name: 'Formulário 1',
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      description: 'Please enter your username',
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      description: 'Please enter your password',
      required: true,
      minLength: 8,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      description: 'Please enter your email address',
      required: true,
    },
    {
      name: 'birthdate',
      label: 'Birth Date',
      type: 'date',
      description: 'Please enter your birth date',
      required: true,
    },
  ],
};
