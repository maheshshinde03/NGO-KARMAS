import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const QuotesMasterData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: "autoIncrementNumber", size: "5%" },

    { label: "Quote", key: "quote_text", type: "" },
    { label: "Created At", key: "created_at", type: "date&time" },
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
  dataKey: 'quote_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Quote',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['quote_text', 'score_category', 'status_name'],
  isSearch: false
};

export const QuotesMasterFormGroup: IFormStructure[] = [
  {
    name: "quote_id",
    label: "quote ID",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: true,
    required: false,
    disable: true
  },
  {
    name: "quote_text",
    label: "Quote",
    placeholder: "Enter Quote",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  // {
  //   name: "start_date",
  //   label: "Start Date",
  //   placeholder: "Select start date",
  //   type: "date",
  //   value: "",
  //   required: true,
  //   disable: false
  // },
  // {
  //   name: "end_date",
  //   label: "End Date",
  //   placeholder: "Select end date",
  //   type: "date",
  //   value: "",
  //   required: true,
  //   disable: false
  // },
  // {
  //   name: "score_category",
  //   label: "Score Category",
  //   placeholder: "Enter score category",
  //   type: "text",
  //   value: "",
  //   required: true,
  //   disable: false
  // },
  // {
  //   name: "status_name",
  //   label: "Status Name",
  //   placeholder: "Enter status name",
  //   type: "text",
  //   value: "",
  //   required: true,
  //   disable: false
  // },
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
