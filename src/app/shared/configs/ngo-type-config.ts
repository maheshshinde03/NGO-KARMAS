import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

/**
 * Table configuration for NGO Field listing
 */
export const NgoTypeDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Ngo Type", key: "ngo_type", type: "text" },
    { label: "Created At", key: "created_at", type: "date&time" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "ngo_type_id",
  buttonname: "Create NGO Type",
  button: true,
  statuses: [],
  filterfields: ["ngo_type", "field_description"],
  isSearch: true
};

/**
 * Form configuration for NGO Field create/edit/view
 */
export const NgoTypeFormStructure: IFormStructure[] = [
  {
    name: "ngo_type_id",
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
    name: "ngo_type",
    label: "Ngo Name",
    placeholder: "Enter Ngo Name",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 200
  },
  // {
  //   name: "field_description",
  //   label: "Field Description",
  //   placeholder: "Enter Field Description",
  //   type: "textarea",
  //   value: "",
  //   required: false,
  //   disable: false,
  //   maxLength: 400
  // }
];
