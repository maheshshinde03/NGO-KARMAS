import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

/**
 * Table configuration for displaying designation_master data
 */
export const NGODesignationDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Designation Name", key: "designation_name", type: "text" },
    // { label: "Is Active", key: "is_active", type: "convertboolean" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "ngo_designation_id",
  buttonname: "Create Designation",
  button: true,
  statuses: [],
  filterfields: ["designation_name"],
  isSearch: true
};

/**
 * Form structure for create, edit, and view pages of designation_master
 */
export const NGODesignationFormStructure: IFormStructure[] = [
  {
    name: "ngo_designation_id",
    label: "Designation ID",
    placeholder: "Enter Designation ID",
    type: "text",
    value: "",
    required: false,
    disable: true, // Disable in view mode
    hiddenControl: true, // Hidden in form
    maxLength: 10
  },
  {
    name: "designation_name",
    label: "Designation Name",
    placeholder: "Enter Designation Name",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 50
  },
//   {
//     name: "is_active",
//     label: "Is Active",
//     placeholder: "Is Active",
//     type: "select",
//     value: "",
//     listName: "active_status",
//     listData: "",
//     bindLabel: "name",
//     bindValue: "status_id",
//     required: true,
//     disable: false
//   }
];
