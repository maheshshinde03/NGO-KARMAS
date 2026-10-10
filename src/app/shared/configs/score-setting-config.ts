import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const ScoreSettingData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
    { label: "Create Score", key: "create_score", type: '' },
    { label: "Start Date", key: "start_date", type: '' },
    { label: "End Date", key: "end_date", type: '' },
    { label: "Score Category", key: "score_category", type: '' },
    { label: "Status Name", key: "status_name", type: '' },
    { label: "Active", key: "is_active", type: '' },
    {
      label: "Action",
      key: "action",
      type: "action",
      size: "8%",
      buttonNames: ["edit", "view", "delete"]
    }
  ],
  data: [],
  dataKey: 'score_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Score',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['create_score', 'score_category', 'status_name'],
  isSearch: false
};

export const scoreSettingFormGroup: IFormStructure[] = [
  {
    name: "score_id",
    label: "Score ID",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: false,
    disable: true
  },
  {
    name: "create_score",
    label: "Create Score",
    placeholder: "Enter score",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "start_date",
    label: "Start Date",
    placeholder: "Select start date",
    type: "date",
    minDate: new Date().toISOString(),
    value: "",
    required: true,
    disable: false
  },
  {
    name: "end_date",
    label: "End Date",
    placeholder: "Select end date",
    type: "date",
    maxDate: new Date().toISOString(),
    value: "",
    required: true,
    disable: false
  },
  {
    name: "score_category",
    label: "Score Category",
    placeholder: "Enter score category",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "status_name",
    label: "Status Name",
    placeholder: "Enter status name",
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
