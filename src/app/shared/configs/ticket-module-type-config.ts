import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const ticketModuleTypeData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
    { label: "Module Name", key: "module_name", type: '' },
    { label: "Active", key: "is_active", type: 'convertboolean' },
    {
      label: "Action",
      key: "action",
      type: "action",
      size: "8%",
      buttonNames: ["edit", "view", "delete"]
    }
  ],
  data: [],
  dataKey: 'module_type_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Ticket Module Type',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['module_name'],
  isSearch: false
};

export const ticketModuleTypeFormGroup: IFormStructure[] = [
  {
    name: "module_type_id",
    label: "",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: true
  },
  {
    name: "module_name",
    label: "Module Name",
    placeholder: "Enter score",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "is_active",
    label: "Is Active",
    placeholder: "Select status",
    type: "select",
    value: "1",
    required: false,
    disable: false,
    listName: "active_status",
    listData: ["1", "0"],
    bindValue: "status_id",
    bindLabel: "name"
  }
];
