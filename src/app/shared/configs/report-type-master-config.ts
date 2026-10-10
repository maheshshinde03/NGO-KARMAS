import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const ReportTypeMasterData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: "autoIncrementNumber", size: "5%" },
    { label: "Report Type", key: "report_type", type: "" },
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    // {
    //   label: "Action",
    //   key: "action",
    //   type: "action",
    //   size: "8%",
    //   buttonNames: ["edit", "view", "delete"]
    // }
  ],
  data: [],
  dataKey: 'report_type_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Report',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['report_type'],
  isSearch: false
};

export const ReportTypeMasterFormGroup: IFormStructure[] = [
  {
    name: "report_type_id",
    label: "Report ID",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: true
  },
  {
    name: "report_type",
    label: "Report Type",
    placeholder: "Enter Report Type",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  // {
  //   name: "is_active",
  //   label: "Is Active",
  //   placeholder: "Select status",
  //   type: "select",
  //   value: "1",
  //   required: false,
  //   disable: false,
  //   listName: "active_status",
  //   listData: ["1", "0"],
  //   bindValue: "status_id",
  //   bindLabel: "name"
  // }
];
