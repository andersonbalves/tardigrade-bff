import { FormModel } from '../../model/form.model';

const form: FormModel = {
  path: '/v1/api/form6',
  name: 'Formulário 6',
  fields: [
    {
      name: 'courseName',
      label: 'Course Name',
      type: 'text',
      description: 'Please enter the course name',
      required: true,
    },
    {
      name: 'instructor',
      label: 'Instructor',
      type: 'text',
      description: 'Please enter the instructor name',
      required: true,
    },
    {
      name: 'duration',
      label: 'Duration (in weeks)',
      type: 'number',
      description: 'Please enter the course duration',
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      description: 'Please enter the course start date',
      required: true,
    },
  ],
};
export default form;
