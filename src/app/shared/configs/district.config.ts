import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';

// Define table headers for District
export const DistrictDetails: RowData = {
  headers: [
    { label: 'Sr.No', key: 'SR.NO', type: 'autoIncrementNumber', size: '4%' },
    { label: 'District Name', key: 'district_name', type: '' },
    // { label: 'Code', key: 'code', type: '' },
    // { label: 'State Code', key: 'state_code', type: '' },
    // { label: 'Status', key: 'status_name', type: 'convertboolean', size: '8%' },
    { label: 'Action', key: 'action', type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
  ],
  data: [],
  dataKey: 'district_id',
  buttonname: 'Create District',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' }
  ],
  filterfields: ['district_name', 'code', 'state_code'],
  isSearch: true
};

// Define the form structure for District
export const DistrictSearchGroup: IFormStructure[] = [
  {
    name: 'district_name',
    label: 'District Name',
    placeholder: 'District Name',
    type: 'text',
    value: '',
    required: true,
    disable: false
  },
  // {
  //   name: 'code',
  //   label: 'Code',
  //   placeholder: 'District Code',
  //   type: 'text',
  //   value: '',
  //   required: true,
  //   disable: false
  // },
  {
    name: 'state_id',
    label: 'State',
    placeholder: 'State',
    type: 'select',
    value: '',
    bindValue: 'state_id',
    bindLabel: 'state_name',
    listName: 'state_list',
    required: true,
    disable: false
  },
  // {
  //   name: 'status_id',
  //   label: 'Status',
  //   placeholder: 'Status',
  //   type: 'select',
  //   value: '',
  //   bindValue: 'status_id',
  //   bindLabel: 'name',
  //   listName: 'status_list',
  //   required: true,
  //   disable: false
  // }
];
