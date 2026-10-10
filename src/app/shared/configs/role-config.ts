// role-config.ts

import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';

export const RoleDetailsData: RowData = {
  headers: [
    { label: '', key: 'SR.NO', type: 'autoIncrementNumber', size: '4%' },
    { label: 'Role Name', key: 'role_name', type: '' },
    // { label: 'Description', key: 'description', type: '' },
    { label: 'Action', key: 'action', type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
  ],
  data: [],
  dataKey: 'role_id',
  buttonname: 'Create Role',
  button: true,
  statuses: [
    { label: 'Active', value: 'success' },
    { label: 'Inactive', value: 'danger' }
  ],
  filterfields: ['role_name', 'description'],
  isSearch: false
};

export const RoleGroup: IFormStructure[] = [
  {
    name: "role_name",
    label: "Role name",
    placeholder: "Role name",
    type: "text",
    value: "",
    required:true,
    disable: false
  },
  {
    name: "menu_id",
    label: "Based On",
    placeholder: "Based On",
    type: "select",
    value: "",
    bindValue: 'menu_id',
    bindLabel: 'role_type',
    listName: 'menu-set',
    required:true,
    disable: false,
},
]
