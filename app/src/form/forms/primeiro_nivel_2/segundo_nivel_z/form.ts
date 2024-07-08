import { FormModel } from '../../../model/form.model';

const form: FormModel = {
  path: '/v1/api/form5',
  name: 'Formulário 5',
  fields: [
    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      description: 'Please enter the employee name',
      required: true,
    },
    {
      name: 'employeeId',
      label: 'Employee ID',
      type: 'text',
      description: 'Please enter the employee ID',
      required: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'text',
      description: 'Please enter the department',
      required: false,
    },
    {
      name: 'joiningDate',
      label: 'Joining Date',
      type: 'date',
      description: 'Please enter the joining date',
      required: true,
    },
  ],
};
export default form;
