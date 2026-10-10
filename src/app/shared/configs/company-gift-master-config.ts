import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const GiftCompanyMasterDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
    { label: "Company Name", key: "company_name", type: "text" },
    { label: "Company Email", key: "company_email", type: "text" },
    // { label: "Is Active", key: "is_active", type: "text" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "company_id",
  buttonname: "Create Company",
  button: true,
  statuses: [
    { label: "inactive", value: "danger" },
    { label: "active", value: "success" }
  ],
  filterfields: ["company_name", "company_email"],
  isSearch: true
};

export const GiftCompanyMasterFormStructure: IFormStructure[] = [
  {
    name: "company_name",
    label: "Company Name",
    placeholder: "Enter Company Name",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 120
  },
  {
    name: "company_email",
    label: "Company Email",
    placeholder: "Enter Company Email",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 45
  },
  {
    name: "company_logo",
    label: "Company Logo",
    placeholder: "Upload Company Logo",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "company_logo",
        type: "IMAGE",
        required: false,
        disable: false,
        text: '<div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Company Logo</h6></div>',
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
//     listName: "active_status",
//     listData: "",
//     bindLabel: "name",
//     bindValue: "status_id",
//     required: true,
//     disable: false
//   }
];
