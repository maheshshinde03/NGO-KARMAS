import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

/**
 * Table configuration for NGO Field listing
 */
export const NgoRegistrationDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },

    { key: 'ngo_registration_id', label: 'NGO Registration ID', type: "text" },
    { key: 'ngo_name', label: 'NGO Name', type: "text" },
    { key: 'unique_id', label: 'Unique ID', type: "text" },
    { key: 'darpan_reg_date', label: 'Darpan Registration Date', type: "text" },
    // { key: 'ngo_type', label: 'NGO Type', type: "text" },
    { key: 'registration_no', label: 'Registration Number', type: "text" },
    // { key: 'act_name', label: 'Act Name', type: "text" },

    { key: 'date_of_registration', label: 'Date Of Registration', type: "date&time" },
    // { key: 'address', label: 'Address', type: "text" },

    // { key: 'telephone', label: 'Telephone', type: "text" },
    // { key: 'mobile_no', label: 'Mobile Number', type: "text" },
    // { key: 'website_url', label: 'Website URL', type: "text" },
    // { key: 'email', label: 'Email', type: "text" },

    { key: 'is_admin_accepted', label: 'Admin Accepted', type: "convertboolean" },
    { key: 'is_reapproval', label: 'Is Re-Approval', type: "convertboolean" },
    // { key: 'reason', label: 'Reason', type: "text" },
    // { key: 'email_otp', label: 'Email OTP', type: "text" },
    { key: 'remarks', label: 'Remarks', type: "text" },
    // { key: 'accepted_at', label: 'Accepted At', type: "date&time" },
    // { key: 'is_active', label: 'Is Active', type: "text" },
    { key: 'created_by', label: 'Created By', type: "text" },
    { key: 'created_at', label: 'Created At', type: "date&time" },
    { key: 'status_name', label: 'Status', type: "" },
    

    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "ngo_registration_id",
  buttonname: "Create NGO Registration",
  button: false,
  statuses: [],
  filterfields: ["field_name", "field_description"],
  isSearch: true
};

/**
 * Form configuration for NGO Field create/edit/view
 */

export const NgoRegistrationFormStructure: IFormStructure[] = [
  {
    name: "ngo_registration_id",
    placeholder: "NGO Id",
    label: "NGO Id",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: false
  },
  {
    name: "ngo_name",
    label: "NGO Name",
    placeholder: "Enter NGO name",
    type: "text",
    value: "",
    required: true,
    disable: false,
    isUpperCase: true
  },
  {
    name: "registration_type",
    label: "Registration Type",
    placeholder: "Select Registration Type",
    type: "select",
    value: "",
    required: true,
    disable: false,
    listName: 'registration_typs',
    bindValue: 'registrationType',
    bindLabel: 'registrationType',
    // listData: ['Regi. with Dharpan','Regi. with Non-dharpan' ]  // List of NGO types to populate
    listData: [{ registrationId: 1, registrationType: 'Regi. with Dharpan' }, { registrationId: 2, registrationType: 'Regi. with Non-dharpan' }]  // List of NGO types to populate
  },
  // {
  //     name: "request_name",
  //     label: "Request Name",
  //     placeholder: "Enter Request Name",
  //     type: "text",
  //     value: "",
  //     required: true,
  //     disable: false,
  //     isUpperCase: true
  // },
  {
    name: "unique_id",
    label: "Unique ID VO/NGO ",
    placeholder: "Enter unique ID",
    type: "text",
    value: "",
    required: false,
    disable: false
  },
  {
    name: "darpan_reg_date",
    label: "Darpan Registration Date",
    placeholder: "Enter Darpan registration date",
    type: "date",
    maxDate: new Date().toISOString(),
    value: "",
    required: false,
    disable: false
  },
  {
    name: "ngo_type",
    label: "NGO Type",
    placeholder: "Select NGO type",
    type: "select",
    value: "",
    required: true,
    disable: false,
    listName: 'ngo_types',
    bindValue: 'ngo_type_id',
    bindLabel: 'ngo_type',
    listData: []  // List of NGO types to populate
  },
  {
    name: "registration_no",
    label: "Registration No",
    placeholder: "Enter Registration No",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "date_of_registration",
    label: "Date Of  Registration (Society / Trust /Entity)",
    placeholder: "Enter Date Of Registration (Society / Trust /Entity)",
    type: "date",
    maxDate: new Date().toISOString(),
    value: "",
    required: true,
    disable: false
  },
  {
    name: "act_name",
    label: "Act Name",
    placeholder: "Enter Act Name",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "city_of_registration_id",
    label: "City Of Registration",
    placeholder: "Select City Of Registration",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'city_id',
    bindLabel: 'city_name',
    listName: 'city',
    listData: []
  },
  {
    name: "state_of_registration_id",
    label: "State Of Registration",
    placeholder: "Select State Of Registration",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'state_id',
    bindLabel: 'state_name',
    listName: 'state',
    listData: []
  },
  {
    name: "country_of_registration_id",
    label: "Country Of Registration",
    placeholder: "Select Country Of Registration",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'country_id',
    bindLabel: 'country_name',
    listName: 'country',
    listData: []
  },

  {
    name: "header",
    label: "CONTACT DETAILS",
    placeholder: "Enter blank",
    type: "header",
    value: "",
    disable: false,
    colsize: 'col-12'
  },

  {
    name: "address",
    label: "Address",
    placeholder: "Enter address",
    type: "textarea",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "city_id",
    label: "City",
    placeholder: "Select City",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'city_id',
    bindLabel: 'city_name',
    listName: 'city',
    listData: []
  },
  {
    name: "state_id",
    label: "State",
    placeholder: "Select State",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'state_id',
    bindLabel: 'state_name',
    listName: 'state',
    listData: []
  },
  {
    name: "country_id",
    label: "Country",
    placeholder: "Select Country",
    type: "select",
    value: "",
    required: true,
    disable: false,
    bindValue: 'country_id',
    bindLabel: 'country_name',
    listName: 'country',
    listData: []
  },
  {
    name: "telephone",
    label: "Telephone",
    placeholder: "Enter telephone number",
    type: "number",
    value: "",
    required: false,
    disable: false
  },
  {
    name: "mobile_no",
    label: "Mobile No",
    placeholder: "Enter mobile number",
    type: "text",
    value: "",
    required: true,
    disable: false,
    validationFor:'contact'
  },
  {
    name: "website_url",
    label: "Website URL",
    placeholder: "Enter website URL",
    type: "text",
    value: "",
    required: false,
    disable: false
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email address",
    type: "text",
    value: "",
    required: true,
    disable: false,
    validationFor:'email'
  },
  {
    name: "logo_path_name",
    label: "logo_path_name",
    placeholder: "logo_path_name",
    type: "blank",
    value: "",
    hiddenControl: true,
    disable: false,
  },
  // {
  //     name: "ngo_logo",
  //     label: "NGO Logo",
  //     placeholder: "Upload NGO Logo",
  //     type: "file",
  //     value: "",
  //     required: false,
  //     disable: false
  // },
  {
    name: "ngo_logo",
    label: "Upload NGO File",
    placeholder: "Upload File",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "ngo_logo",
        type: 'EXCEL',
        required: true,
        disable: false,
        text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload NGO Logo.</h6></div>',
        dropzoneConfig: {
          clickable: true,
          url: 'https://httpbin.org/post',
          addRemoveLinks: true,
          parallelUploads: 1,
          acceptedFiles: '.jpg,.jpeg,.pdf,.png',
          maxFiles: 1
        }
      }
    ],
    colsize: 'col-4'
  },
  {
    name: "ngo_logo_file",
    label: "NGO Logo File",
    placeholder: "Upload NGO Logo File",
    type: "file",
    value: "",
    required: false,
    disable: false,
    hiddenControl: true,
  },
  {
    name: "pan_file",
    label: "Upload Pan File",
    placeholder: "Upload Pan File",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "pan_file",
        type: 'EXCEL',
        required: true,
        disable: false,
        text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Pan File.</h6></div>',
        dropzoneConfig: {
          clickable: true,
          url: 'https://httpbin.org/post',
          addRemoveLinks: true,
          parallelUploads: 1,
          acceptedFiles: '.jpg,.jpeg,.pdf,.png',
          maxFiles: 1
        }
      }
    ],
    colsize: 'col-4'
  },
  {
    name: "pan_cad_file_name",
    label: "PAN Card File Name",
    placeholder: "Upload PAN Card File",
    type: "file",
    value: "",
    required: false,
    disable: false,
    hiddenControl: true
  },
  // {
  //     name: "pan_file",
  //     label: "PAN Card File",
  //     placeholder: "Upload PAN Card",
  //     type: "file",
  //     value: "",
  //     required: false,
  //     disable: false
  // },
  {
    name: "crs_regis_file",
    label: "CRS Registration File",
    placeholder: "CRS Registration File",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "crs_regis_file",
        type: 'EXCEL',
        required: true,
        disable: false,
        text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>CRS Registration File.</h6></div>',
        dropzoneConfig: {
          clickable: true,
          url: 'https://httpbin.org/post',
          addRemoveLinks: true,
          parallelUploads: 1,
          acceptedFiles: '.jpg,.jpeg,.pdf,.png',
          maxFiles: 1
        }
      }
    ],
    colsize: 'col-4'
  },
  {
    name: "crs_regis_file_name",
    label: "CRS Registration File Name",
    placeholder: "Upload CRS Registration File",
    type: "file",
    value: "",
    required: false,
    disable: false,
    hiddenControl: true
  },
  // {
  //     name: "crs_regis_file",
  //     label: "CRS Registration File",
  //     placeholder: "Upload CRS Registration File",
  //     type: "file",
  //     value: "",
  //     required: false,
  //     disable: false
  // }
  {
    name: "digital_signature_file",
    label: "Upload NGO File",
    placeholder: "Upload File",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "digital_signature_file",
        type: 'EXCEL',
        required: true,
        disable: false,
        text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Digital Signature.</h6></div>',
        dropzoneConfig: {
          clickable: true,
          url: 'https://httpbin.org/post',
          addRemoveLinks: true,
          parallelUploads: 1,
          acceptedFiles: '.jpg,.jpeg,.pdf,.png',
          maxFiles: 1
        }
      }
    ],
    colsize: 'col-6'
  },
  {
    name: "stamp_file",
    label: "Upload NGO File",
    placeholder: "Upload File",
    type: "upload",
    value: "",
    required: false,
    disable: false,
    requireBase64: true,
    formConfigUpload: [
      {
        name: "stamp_file",
        type: 'EXCEL',
        required: true,
        disable: false,
        text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Stamp File.</h6></div>',
        dropzoneConfig: {
          clickable: true,
          url: 'https://httpbin.org/post',
          addRemoveLinks: true,
          parallelUploads: 1,
          acceptedFiles: '.jpg,.jpeg,.pdf,.png',
          maxFiles: 1
        }
      }
    ],
    colsize: 'col-6'
  }
];
