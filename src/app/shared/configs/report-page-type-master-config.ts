import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const ReportPageTypeMasterData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: "autoIncrementNumber", size: "5%" },
    { label: "Report Page", key: "report_page", type: "" },
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
  dataKey: 'report_page_type_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Report',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['report_page', 'score_category', 'status_name'],
  isSearch: false
};

export const ReportPageTypeMasterFormGroup: IFormStructure[] = [
  {
    name: "report_page_type_id",
    label: "Score ID",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: true
  },
  {
    name: "report_page",
    label: "Report Page",
    placeholder: "Enter Report Page",
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
