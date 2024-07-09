import { FormModel } from '../../../../model/form.model';

export const form: FormModel = {
  path: '/v1/orquestracao/hello-world',
  name: 'Teste XPTO',
  fields: [
    {
      name: 'nome',
      label: 'Nome',
      type: 'text',
      description: 'Please enter your name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      description: 'Please enter your email',
      required: true,
    },
    {
      name: 'idade',
      label: 'Idade',
      type: 'number',
      description: 'Please enter your age',
      required: false,
    },
    {
      name: 'url',
      label: 'url',
      type: 'text',
      description: 'Please enter your website',
      required: false,
    },
  ],
};
