import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

/**
 * Table configuration for displaying gift master data
 */
export const GiftMasterDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Gift Name", key: "gift_name", type: "text" },
    { label: "Gift Amount", key: "gift_amount", type: "text" },
    { label: "Gift Score Required", key: "gift_score_required", type: "text" },
    { label: "Is Active", key: "is_active", type: "convertboolean" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "gift_master_id",
  buttonname: "Create Gift",
  button: true,
  statuses: [
    { label: "inactive", value: "danger" },
    { label: "active", value: "success" }
  ],
  filterfields: ["gift_name", "gift_amount"],
  isSearch: true
};

/**
 * Form structure for creating, editing, viewing gift master data
 */
export const GiftMasterFormStructure: IFormStructure[] = [
  {
    name: "company_id",
    label: "Company",
    placeholder: "Select Company",
    type: "select",
    value: "",
    listName: "company_list", // to map company dropdown
    listData: "",
    bindLabel: "company_name",
    bindValue: "company_id",
    required: true,
    disable: false
  },
  {
    name: "gift_name",
    label: "Gift Name",
    placeholder: "Enter Gift Name",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 255
  },
  {
    name: "gift_score_required",
    label: "Gift Score Required",
    placeholder: "Enter Gift Score Required",
    type: "number",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "gift_amount",
    label: "Gift Amount",
    placeholder: "Enter Gift Amount",
    type: "number",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "gift_t_c",
    label: "Gift Terms & Conditions",
    placeholder: "Enter Terms & Conditions",
    type: "textarea",
    value: "",
    required: false,
    disable: false,
    colsize: "col-12",
    maxLength: 5000
  },
  {
    name: "how_to_redeem",
    label: "How to Redeem",
    placeholder: "Explain how to redeem",
    type: "textarea",
    value: "",
    required: false,
    disable: false,
    colsize: "col-12",
    maxLength: 5000
  },
  {
    name: "gift_logo",
    label: "Gift Logo",
    placeholder: "Upload Gift Logo",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "gift_logo",
        type: "IMAGE",
        required: false,
        disable: false,
        text: '<div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Gift Logo</h6></div>',
        dropzoneConfig: {
          clickable: true,
          url: "https://httpbin.org/post",
          addRemoveLinks: true,
          parallelUploads: 1,
          acceptedFiles: ".jpg,.jpeg,.png",
          maxFiles: 1
        }
      }
    ],
    colsize: "col-12"
  },
//   {
//     name: "is_active",
//     label: "Is Active",
//     placeholder: "Select Status",
//     type: "select",
//     value: "",
//     listName: "active_status", // to map active/inactive
//     listData: "",
//     bindLabel: "name",
//     bindValue: "status_id",
//     required: true,
//     disable: false
//   }
];
