import { FormModel } from '../../../model/form.model';

export const form: FormModel = {
  path: '/v1/api/form2',
  name: 'Formulário 2',
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      description: 'Please enter your first name',
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      description: 'Please enter your last name',
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      description: 'Please enter your phone number',
      required: false,
    },
    {
      name: 'website',
      label: 'Website',
      type: 'url',
      description: 'Please enter your website URL',
      required: false,
    },
  ],
};
