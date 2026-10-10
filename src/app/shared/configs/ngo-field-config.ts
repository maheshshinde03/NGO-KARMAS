import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

/**
 * Table configuration for NGO Field listing
 */
export const NgoFieldDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Field Name", key: "field_name", type: "text" },
    { label: "Field Description", key: "field_description", type: "text" },
    { label: "Field Request Type", key: "request_type_name", type: "text" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "ngo_field_id",
  buttonname: "Create NGO Field",
  button: true,
  statuses: [],
  filterfields: ["field_name", "field_description"],
  isSearch: true
};

/**
 * Form configuration for NGO Field create/edit/view
 */
export const NgoFieldFormStructure: IFormStructure[] = [
  {
    name: "ngo_field_id",
    label: "NGO Field ID",
    placeholder: "Enter NGO Field ID",
    type: "hidden",
    value: "",
    required: false,
    disable: true,
    maxLength: 20,
    hiddenControl: true
  },
  {
    name: "field_name",
    label: "Field Name",
    placeholder: "Enter Field Name",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 200
  },
  {
    name: "field_description",
    label: "Field Description",
    placeholder: "Enter Field Description",
    type: "textarea",
    value: "",
    required: false,
    disable: false,
    maxLength: 400
  },
  {
    name: "request_type_id",
    label: "Request Type",
    placeholder: "Select Request",
    type: "select",
    value: "",
    required: true,
    disable: false,
    listName: "requestTypeList",
    bindLabel: 'request_type_name',
    bindValue: 'request_type_id',
    listData: [] // Example options for gender
    // listData: ["Self Request", "Other Request", "On Call"]  // Example options for gender
  },
];
