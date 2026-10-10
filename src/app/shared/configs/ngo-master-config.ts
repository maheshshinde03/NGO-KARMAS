import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const NGODetailsData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "ngo_name", type: '' },
        { label: "Type of NGO", key: "ngo_type_name", type: '' },
        { label: "Registration No", key: "registration_no", type: '' },
        { label: "Mobile No", key: "mobile_no", type: '' },
        { label: "Accepted request No.", key: "total_request_completed", type: '' },
        { label: "Rejected Request Rejected", key: "total_request_rejected", type: '' },

        { label: "Is Blacklisted", key: "is_blacklist", type: 'convertboolean' },

        // { label: "Unique ID", key: "unique_id", type: '' },
        // { label: "Registration Date", key: "darpan_reg_date", type: '' },
        // { label: "NGO Type", key: "ngo_type", type: '' },
        // { label: "State of Registration", key: "state_of_registration_name", type: '' },
        // { label: "Country of Registration", key: "country_of_registration_name", type: '' },
        { label: "Status", key: "status_name", type: '' },

        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete', 'lock', 'unloack'] }
    ],
    "data": [],
    "dataKey": 'ngo_id',
    "buttonname": 'Create NGO',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['ngo_name', 'unique_id'],
    "isSearch": false,
    "exportExcel": true,
    'excelKeys': {
        'ngo_name': 'Ngo Name',
        'ngo_type_name': 'Type of NGO',
        'registration_no': 'Registration No',
        'mobile_no': 'Mobile No',
    },
    "blockDataKey": 'is_blacklist'
}

export const NGOOfficeBearersData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "ngo_name", type: '' },
        { label: "Name", key: "name", type: '' },
        { label: "Designation", key: "designation_name", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'bearer_id',
    "buttonname": 'Create Office Bearer',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['ngo_name', 'name', 'designation_name'],
    "isSearch": false
}

export const NGOStateDistrictCityData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "ngo_name", type: '' },
        { label: "State", key: "state_name", type: '' },
        { label: "District", key: "district_name", type: '' },
        { label: "City", key: "city_name", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'ngo_state_district_mapping_id',
    "buttonname": 'Create State-District-City Mapping',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['ngo_name', 'state_name', 'district_name', 'city_name'],
    "isSearch": false
}

export const NGOFieldMappingData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "ngo_name", type: '' },
        { label: "Field", key: "field_name", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'ngo_field_mapping_id',
    "buttonname": 'Create NGO Field Mapping',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['ngo_name', 'field_name'],
    "isSearch": false
}

// -------------------------------- Form DATA

export const NGOTypeSearchGroup: IFormStructure[] = [
    {
        name: "ngo_id",
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
        name: "password",
        label: "Password",
        placeholder: "Enter Password",
        type: "text",
        value: "",
        required: true,
        disable: false,
        colsize: 'col-12'

    },
    // {
    //     name: "Blank",
    //     label: "Blank",
    //     placeholder: "Enter Password",
    //     type: "blank",
    //     value: "",
    //     required: false,
    //     disable: false,
    //     colsize: 'col-8'
    // },
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

export const NGOTypeSearchGroupForProfile: IFormStructure[] = [
    {
        name: "ngo_id",
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
        required: false,
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
    // {
    //     name: "password",
    //     label: "Password",
    //     placeholder: "Enter Password",
    //     type: "text",
    //     value: "",
    //     required: true,
    //     disable: false,
    //     colsize: 'col-12'

    // },
    // {
    //     name: "Blank",
    //     label: "Blank",
    //     placeholder: "Enter Password",
    //     type: "blank",
    //     value: "",
    //     required: false,
    //     disable: false,
    //     colsize: 'col-8'
    // },
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

export const NGORegistrationTypeSearchGroup: IFormStructure[] = [
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
        required: false,
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
        disable: true,
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
                    acceptedFiles: '.jpg,.png',
                    maxFilesize: 5,
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
                    acceptedFiles: '.jpg,.png',
                    maxFilesize: 5,
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
                    acceptedFiles: '.jpg,.png',
                    maxFilesize: 5,
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
                    acceptedFiles: '.jpg,.png',
                    maxFilesize: 5,
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
                    acceptedFiles: '.jpg,.png',
                    maxFilesize: 5,
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-6'
    }
];

export const NGOFundData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "ngo_name", type: '' },
        { label: "Department Name", key: "department_name", type: '' },
        { label: "Source", key: "source", type: '' },
        { label: "Financial Year", key: "financial_year", type: '' },
        { label: "Amount Sanctioned", key: "amount_sanctioned", type: '' },
        { label: "Purpose", key: "purpose", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'ngo_funds_id',
    "buttonname": 'Create NGO Fund',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['ngo_name', 'department_name', 'source', 'financial_year'],
    "isSearch": false
}

export const NGOFundFormGroup: IFormStructure[] = [
    {
        name: "ngo_funds_id",
        label: "NGO Funds ID",
        placeholder: "Enter NGO Funds ID",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "ngo_id",
        label: "NGO ID",
        placeholder: "Select NGO",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'ngo_id',  // Assuming you have a list of NGOs
        bindLabel: 'ngo_name',
        listName: 'ngo',  // Assuming you have a list of NGOs to bind here
        listData: [],
        hiddenControl: true
    },
    {
        name: "department_name",
        label: "Department Name",
        placeholder: "Enter Department Name",
        type: "text",
        value: "",
        required: false,
        disable: false
    },
    {
        name: "source",
        label: "Source",
        placeholder: "Enter Source of Fund",
        type: "text",
        value: "",
        required: false,
        disable: false
    },
    {
        name: "financial_year",
        label: "Financial Year",
        placeholder: "Enter Financial Year",
        type: "text",
        value: "",
        required: false,
        disable: false
    },
    {
        name: "amount_sanctioned",
        label: "Amount Sanctioned",
        placeholder: "Enter Amount Sanctioned",
        type: "number",
        value: "",
        required: false,
        disable: false
    },
    {
        name: "purpose",
        label: "Purpose",
        placeholder: "Enter Purpose of Fund",
        type: "textarea",
        value: "",
        required: false,
        disable: false
    }
];

// NGo Office Bearear 
export const NGOOfficeBearersDetailsTable: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Name", key: "name", type: '' },
        { label: "Designation", key: "designation_name", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['delete'] }
    ],
    "data": [],
    "dataKey": 'bearer_id',
    "buttonname": 'Add Bearer',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['ngo_name', 'unique_id'],
    "isSearch": false
}

export const NGOOfficeBearersFormGroup: IFormStructure[] = [
    {
        name: "bearer_id",
        label: "Bearer ID",
        placeholder: "Enter Bearer ID",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "ngo_id",
        label: "NGO ID",
        placeholder: "Select NGO",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'ngo_id',  // Assuming you have a list of NGOs
        bindLabel: 'ngo_name',
        listName: 'ngo',  // Assuming you have a list of NGOs to bind here
        listData: [],
        hiddenControl: true
    },
    {
        name: "name",
        label: "Name",
        placeholder: "Enter Name of the Bearer",
        type: "text",
        value: "",
        required: false,
        disable: false
    },
    {
        name: "designation_id",
        label: "Designation",
        placeholder: "Select Designation",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'designation_id',
        bindLabel: 'designation_name',
        listName: 'designation_list',
        listData: []
    }
];


// For Blocklisted 
export const BlacklistedUsersData: RowData = {
    headers: [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "ngo_name", type: '' },
        // { label: "Type of NGO", key: "ngo_type_name", type: '' },
        { label: "Registration No", key: "registration_no", type: '' },
        { label: "Mobile No", key: "mobile_no", type: '' },
        // { label: "Accepted request No.", key: "total_request_completed", type: '' },
        { label: "Blacklist Reason", key: "blacklist_reason", type: '' },
        { label: "Is Blacklisted", key: "is_blacklist", type: 'convertboolean' },

        // { label: "Unique ID", key: "unique_id", type: '' },
        // { label: "Registration Date", key: "darpan_reg_date", type: '' },
        // { label: "NGO Type", key: "ngo_type", type: '' },
        // { label: "State of Registration", key: "state_of_registration_name", type: '' },
        // { label: "Country of Registration", key: "country_of_registration_name", type: '' },
        // { label: "Status", key: "status_name", type: '' },

        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['unlock'] }
    ],

    data: [],
    dataKey: 'ngo_id',
    buttonname: 'Add Block User',
    button: false,
    statuses: [
        { label: 'Blacklisted', value: 'danger' },
        { label: 'Allowed', value: 'success' },
    ],
    filterfields: ['registration_no', 'ngo_name', 'mobile_no'],
    isSearch: false,
    exportExcel: true,
    excelKeys: {
        name: 'Name',
        user_id: 'User ID',
        email: 'Email ID',
        phone: 'Phone No.',
        date_of_blacklist: 'Date of Blacklist',
        date_of_allowed: 'Date of Allowed',
        status: 'Status'
    },
    "blockDataKey": 'is_blacklist'
};

export const BlacklistedNGOData: RowData = {
    headers: [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "NGO Name", key: "name", type: '' },
        { label: "User ID", key: "user_id", type: '' },
        { label: "Email ID", key: "email", type: '' },
        { label: "Phone No.", key: "phone", type: '' },
        { label: "Date of Blacklist", key: "date_of_blacklist", type: '' },
        { label: "Date of Allowed", key: "date_of_allowed", type: '' },
        { label: "Status", key: "status", type: '' },
        //   { 
        //     label: "Action", 
        //     key: "action", 
        //     type: 'action', 
        //     size: '8%', 
        //     buttonNames: ['edit', 'view', 'delete'] 
        //   }
    ],
    data: [],
    dataKey: 'user_id',
    buttonname: 'Add User',
    button: false,
    statuses: [
        { label: 'Blacklisted', value: 'danger' },
        { label: 'Allowed', value: 'success' },
    ],
    filterfields: ['name', 'email', 'user_id'],
    isSearch: false,
    exportExcel: true,
    excelKeys: {
        name: 'Name',
        user_id: 'User ID',
        email: 'Email ID',
        phone: 'Phone No.',
        date_of_blacklist: 'Date of Blacklist',
        date_of_allowed: 'Date of Allowed',
        status: 'Status'
    }
};


// Sector Of Work Details

export const SectorOfWorkDetailsTable: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        // { label: "Operational Sectors", key: "ngo_type_name", type: '' },
        { label: "Category", key: "category_name", type: '' },
        { label: "Operational City", key: "city_name", type: '' },
        { label: "OperationalArea-States", key: "state_name", type: '' },
        { label: "OperationalArea-District", key: "district_name", type: '' },
        { label: "Pincode", key: "pincode", type: '' },
        { label: "Contact Name", key: "contact_name", type: '' },
        { label: "Mobile No", key: "mobile_no", type: '' },
        { label: "Email", key: "email", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['delete'] }
    ],
    "data": [],
    "dataKey": 'ngo_state_district_mapping_id',
    "buttonname": 'Add Branch Details',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['state_id', 'ngo_state_district_mapping_id'],
    "isSearch": false
}

export const SectorsOfWorkDetailsFormGroup: IFormStructure[] = [
    {
        name: "ngo_state_district_mapping_id",
        label: "Mapping ID",
        placeholder: "Enter Mapping ID",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "ngo_id",
        label: "NGO ID",
        placeholder: "Select NGO",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'ngo_id',  // Assuming you have a list of NGOs
        bindLabel: 'ngo_name',
        listName: 'ngo',  // Assuming you have a list of NGOs to bind here
        listData: [],
        hiddenControl: true
    },
    // {
    //     name: "ngo_field_id",
    //     label: "Operational Sectors ",
    //     placeholder: "Select Operational Sectors ",
    //     type: "select",
    //     value: "",
    //     required: false,
    //     disable: false,
    //     listName: 'ngo_field',
    //     bindValue: 'ngo_field_id',
    //     bindLabel: 'field_name',
    //     listData: []
    // },
    {
        name: "category_id",
        label: "Category",
        placeholder: "Select Category",
        type: "select",
        value: "",
        required: false,
        disable: false,
        listName: 'ngo_field',
        bindValue: 'ngo_field_id',
        bindLabel: 'field_name',
        listData: []
    },
    {
        name: "city_id",
        label: "Operational City ",
        placeholder: "Select Operational City ",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'city_id',  // Assuming you have a list of cities
        bindLabel: 'city_name',
        listName: 'city',  // Assuming you have a list of cities to bind here
        listData: []
    },
    {
        name: "state_id",
        label: "OperationalArea-States",
        placeholder: "Select OperationalArea-States",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'state_id',  // Assuming you have a list of states
        bindLabel: 'state_name',
        listName: 'state',  // Assuming you have a list of states to bind here
        listData: []
    },
    {
        name: "district_id",
        label: "OperationalArea-District",
        placeholder: "Select OperationalArea-District",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'district_id',  // Assuming you have a list of districts
        bindLabel: 'district_name',
        listName: 'district',  // Assuming you have a list of districts to bind here
        listData: []
    },
    {
        name: "pincode",
        label: "Pincode",
        placeholder: "Enter Pincode",
        type: "number",
        value: "",
        hiddenControl: false,
        disable: false
    },
    {
        name: "contact_name",
        label: "Contact Name",
        placeholder: "Enter Contact Name",
        type: "text",
        value: "",
        hiddenControl: false,
        disable: false
    },
    {
        name: "mobile_no",
        label: "Mobile No",
        placeholder: "Enter Mobile No",
        type: "text",
        value: "",
        hiddenControl: false,
        disable: false,
        validationFor:'contact'
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter Email",
        type: "text",
        value: "",
        hiddenControl: false,
        disable: false,
        validationFor:'email'
    }
];

export const NGOFieldMappingFormGroup: IFormStructure[] = [
    {
        name: "ngo_field_mapping_id",
        label: "Mapping ID",
        placeholder: "Enter Mapping ID",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "ngo_id",
        label: "NGO ID",
        placeholder: "Select NGO",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'ngo_id',  // Assuming you have a list of NGOs
        bindLabel: 'ngo_name',
        listName: 'ngo',  // Assuming you have a list of NGOs to bind here
        listData: []
    },
    {
        name: "ngo_field_id",
        label: "Field",
        placeholder: "Select Field",
        type: "select",
        value: "",
        required: false,
        disable: false,
        listData: [],
        listName: 'ngo_types',
        bindValue: 'ngo_field_id',
        bindLabel: 'field_name',
    }
];


// export const requestStatusCardNgo = [
//     { number: 0, label: 'Total NGOs', key: 'total_invoices', name: 'SHIPMENT HAS BEEN BOOKED' },
//     { number: 0, label: 'New Request NGOS ', key: 'proforma_invoice', name: 'OUT FOR HUB' },
//     // { number: 0, label: 'Total Pending', key: 'total_not_approved', name: 'IN SCAN' },
//     { number: 0, label: 'Actives NGOS', key: 'draft_invoice', name: 'DRAFT' },
//     { number: 0, label: 'Deletes NGOS', key: 'tax_invoice', name: 'TAX' },
//     { number: 0, label: 'Black List NGO', key: 'total_irn', name: 'IRN' },
//     { number: 0, label: 'Non Regi with darpan', key: 'total_irn', name: 'IRN' },
//     { number: 0, label: 'Regi with darpan', key: 'total_irn', name: 'IRN' },
//     // { number: 0, label: 'Total IRN Not', key: 'total_not_irn', name: 'IRN Not' }, 
// ];

export const requestStatusCardNgo = [
    { number: 0, label: 'Total NGOs', key: 'total_ngo', name: 'Total NGO Count' },
    //   { number: 0, label: 'Assigned Requests',       key: 'total_ngo_request_assigned',       name: 'Requests Assigned' },
    //   { number: 0, label: 'Completed Requests',      key: 'total_ngo_request_completed',      name: 'Requests Completed' },
    //   { number: 0, label: 'Rejected Requests',       key: 'total_ngo_request_rejected',       name: 'Requests Rejected' },
    { number: 0, label: 'Blacklisted NGOs', key: 'total_ngo_blacklisted', name: 'Blacklisted' },
    { number: 0, label: 'NGOs Completed Requests', key: 'total_ngo_request_completed', name: 'Non-Blacklisted' },
    { number: 0, label: 'Non Darpan Registered', key: 'total_ngo_non_darpan_registered', name: 'Non Darpan' },
    { number: 0, label: 'Darpan Registered', key: 'total_ngo_darpan_registered', name: 'Darpan Registered' },
];

