import { RowData } from "@shared/models/table";
import { IFormStructure } from "@shared/models/form";

/**
 * Table configuration for Bonus Master listing
 */
export const BonusMasterDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Create Score", key: "create_score", type: "text" },
    { label: "Start Date", key: "start_date", type: "date" },
    { label: "End Date", key: "end_date", type: "date" },
    { label: "Score Category", key: "score_category_name", type: "text" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view"] }
  ],
  data: [],
  dataKey: "bonus_id",
  buttonname: "Create Score Setting",
  button: false,
  statuses: [],
  filterfields: ["create_score", "score_category_id"],
  isSearch: true
};

/**
 * Form configuration for Bonus Master create/edit/view
 */
export const BonusMasterFormStructure: IFormStructure[] = [
   {
    name: "bonus_id",
    label: "Bonus ID",
    placeholder: "Enter Bonus ID",
    type: "hidden",
    value: "",
    required: false,
    disable: true,
    maxLength: 20,
    hiddenControl: true
   },
   {
    name: "create_score",
    label: "Create Score",
    placeholder: "Enter Create Score",
    type: "number",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "start_date",
    label: "Start Date",
    placeholder: "Select Start Date",
    type: "date",
    minDate: new Date().toISOString(),
    value: "",
    required: true,
    disable: false
  },
  {
    name: "end_date",
    label: "End Date",
    placeholder: "Select End Date",
    type: "date",
    maxDate: new Date().toISOString(),
    value: "",
    required: true,
    disable: false
  },
  {
    name: "score_category_id",
    label: "Score Category ID",
    placeholder: "Enter Score Category ID",
    type: "select",
    value: "",
    required: false,
    disable: false,
    bindValue: 'score_category_id',
    bindLabel: 'score_category_name',
    listName: 'score_category_list',
    listData: []
  }
];
