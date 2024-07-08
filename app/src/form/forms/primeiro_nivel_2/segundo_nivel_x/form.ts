import { FormModel } from '../../../model/form.model';

const form: FormModel = {
  path: '/v1/api/form4',
  name: 'Formulário 4',
  fields: [
    {
      name: 'productName',
      label: 'Product Name',
      type: 'text',
      description: 'Please enter the product name',
      required: true,
    },
    {
      name: 'productDescription',
      label: 'Product Description',
      type: 'text',
      description: 'Please enter the product description',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      description: 'Please enter the product price',
      required: true,
    },
    {
      name: 'releaseDate',
      label: 'Release Date',
      type: 'date',
      description: 'Please enter the product release date',
      required: false,
    },
  ],
};
export default form;
