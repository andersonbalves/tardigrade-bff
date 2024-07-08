import { FormModel } from '../../../../model/form.model';

const form: FormModel = {
  path: '/v1/api/form3',
  name: 'Formulário 3',
  fields: [
    {
      name: 'projectName',
      label: 'Project Name',
      type: 'text',
      description: 'Please enter the project name',
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      description: 'Please enter the start date of the project',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      description: 'Please enter the end date of the project',
      required: true,
    },
    {
      name: 'budget',
      label: 'Budget',
      type: 'number',
      description: 'Please enter the project budget',
      required: false,
    },
  ],
};
export default form;
