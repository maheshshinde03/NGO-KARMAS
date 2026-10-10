import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const ReportMasterData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: "autoIncrementNumber", size: "5%" },

    { label: "Report User Name", key: "report_user_name", type: "" },
    { label: "Report Full Name", key: "report_full_name", type: "" },
    { label: "Report Page", key: "report_page", type: "" },
    { label: "Report Type", key: "report_type", type: "" },
    { label: "Reason", key: "reason", type: "" },
    { label: "User Name", key: "user_name", type: "" },
    { label: "Full Name", key: "full_name", type: "" },
    { label: "pk_id", key: "pk_id", type: "" },
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['view', 'delete'] }
    // {
    //   label: "Action",
    //   key: "action",
    //   type: "action",
    //   size: "8%",
    //   buttonNames: ["edit", "view", "delete"]
    // }
  ],
  data: [],
  dataKey: 'report_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Report',
  button: false,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['report_user_name', 'score_category', 'status_name'],
  isSearch: false
};

export const ReportMasterFormGroup: IFormStructure[] = [
  {
    name: "report_id",
    label: "Score ID",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: true
  },
  {
    name: "report_user_id",
    label: "Create Report User",
    placeholder: "Enter Report User",
    type: "text",
    value: "",
    required: true,
    hiddenControl: true,
    disable: false
  },
  {
    name: "report_page_type_id",
    label: "Report Page Type",
    placeholder: "Report Page Type",
    type: "select",
    value: null,
    required: false,
    disable: false,
    listName: "report_page_type",
    listData: '',
    bindValue: "report_page_type_id",
    bindLabel: "report_page"
  },
  {
    name: "report_type_id",
    label: "Report Type",
    placeholder: "Report Type",
    type: "select",
    value: null,
    required: false,
    disable: false,
    listName: "report_type",
    listData: '',
    bindValue: "report_type_id",
    bindLabel: "report_type"
  },
  {
    name: "reason",
    label: "Reason",
    placeholder: "Add Reason",
    type: "textarea",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "user_id",
    label: "User",
    placeholder: "Select User",
    type: "select",
    value: null,
    required: false,
    disable: false,
    listName: "user_list",
    listData: '',
    bindValue: "user_id",
    bindLabel: "user_name"
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
