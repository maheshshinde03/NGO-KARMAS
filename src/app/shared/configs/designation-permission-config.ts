import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";


export const DesignationPermissionDetails: RowData = {
  "headers": [
    { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '1rem' },
    // { label: "ID", key: "role_page_permission_id", type: 'link', url: "/permission/role-permission/", size: '2rem' }, 
    { label: "Designation Name", key: "designation_name", type: '' },
    { label: "Page Name", key: "page_name", type: '', size: '13rem', truncateString: false },
    { label: "Description", key: "description", type: '', size: '13rem', truncateString: false },
    // { label: "Action", type: "button", key: "delete" }
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
  ],
  "data": [],
  "dataKey": 'designation_page_permission_id',
  "buttonname": 'Create Designation Permission',
  "button": true,
  "statuses": [
    { label: 'false', value: 'danger' },
    { label: 'true', value: 'success' },
  ],
  "filterfields": ['designation_name', 'page_name', 'description'],
  "isSearch": true
}

export const DesignationPagePermissionGroup: IFormStructure[] = [
  {
    name: "permission",
    label: "permission",
    placeholder: "permission",
    type: "number",
    value: "",
    disable: false,
    hiddenControl: true
  },
  {
    name: "ngo_designation_id",
    label: "Designation",
    placeholder: "Enter Designation",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'ngo_designation_id',
    bindLabel: 'designation_name',
    listName: 'designation-id',
    listData: []
  },
  {
    name: "page_id",
    label: "Pages",
    placeholder: "Enter service type",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'page_id',
    bindLabel: 'page_name',
    listName: 'page-id',
    listData: []
  },
  {
    name: "permission_id",
    label: "Permission",
    placeholder: "Enter permission",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindMultiple: true,
    bindValue: 'permission_id',
    bindLabel: 'permission',
    listName: 'permission-id',
    listData: []
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    type: "text",
    value: "",
    disable: true
  }
];
