import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const RequestsDetailsData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Request ID No ", key: "RequestId", type: '' },
        { label: "Request User Name", key: "request_user_name", type: '' },
        { label: "Request Name", key: "RequestName", type: '' },
        { label: "Request Type", key: "request_type_name", type: '' },
        // { label: "Gender", key: "Gender", type: '' },
        // { label: "state Status", key: "is_active", type: 'active&inactive' }, 
        // { label: "Age", key: "Age", type: '' },
        // { label: "Sahayka Phone No", key: "SahaykaPhoneNo", type: '' },
        { label: "Category", key: "category_name", type: '' },
        // { label: "Pincode", key: "Pincode", type: '' },
        // { label: "Address", key: "Address", type: '' },
        { label: "Remark", key: "Remark", type: '' },
        { label: "Reject Remark", key: "RejectRemark", type: '' },

        { label: "Status", key: "status_name", type: 'statuses' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'RequestId',
    "buttonname": 'Create Request',
    "button": true,
    "statuses": [
        { label: 'Approved', value: 'success' },
        { label: 'Request Completed', value: 'success' },
        { label: 'Rejected', value: 'danger' },
        { label: 'Request Inisited', value: 'info' },
        { label: 'Request Pending', value: 'info' },
        { label: 'Karmas Admin Approved', value: 'info' }
    ],
    "filterfields": ['UserName', 'RequestName', 'request_type_name', 'Category'],
    "isSearch": true
}

export const NGORequestsDetailsData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Request ID No ", key: "RequestId", type: '' },
        { label: "Request User Name", key: "request_user_name", type: '' },
        { label: "Request Name", key: "RequestName", type: '' },
        { label: "Request Type", key: "request_type_name", type: '' },
        // { label: "Gender", key: "Gender", type: '' },
        // { label: "state Status", key: "is_active", type: 'active&inactive' }, 
        // { label: "Age", key: "Age", type: '' },
        // { label: "Sahayka Phone No", key: "SahaykaPhoneNo", type: '' },
        { label: "Category", key: "category_name", type: '' },
        // { label: "Pincode", key: "Pincode", type: '' },
        { label: "Accepted By Ngo", key: "AssignedNGOName", type: '' },
        
        { label: "Remark", key: "Remark", type: '' },
        { label: "Status", key: "status_name", type: 'statuses' },
        { label: "Action", key: "action", type: 'action', size: '12%', buttonNames: ['edit', 'view', 'correct', 'cross', 'requestFile'] }],
    "data": [],
    "dataKey": 'RequestId',
    "buttonname": 'Create Request',
    "button": true,
    "approveRejectKey": "status_id",
    "approveId": 7,
    "rejectId": 8,
    "statuses": [
        { label: 'Approved', value: 'success' },
        { label: 'Request Completed', value: 'success' },
        { label: 'Rejected', value: 'danger' },
        { label: 'Request Inisited', value: 'info' },
        { label: 'Request Pending', value: 'info' },
    ],
    "filterfields": ['state_name'],
    "isSearch": true
}

export const NGORequestsDetailsDataUserId: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Request ID No ", key: "RequestId", type: '' },
        { label: "Request User Name", key: "request_user_name", type: '' },
        { label: "Request Name", key: "RequestName", type: '' },
        { label: "Request Type", key: "request_type_name", type: '' },
        // { label: "Gender", key: "Gender", type: '' },
        // { label: "state Status", key: "is_active", type: 'active&inactive' }, 
        // { label: "Age", key: "Age", type: '' },
        // { label: "Sahayka Phone No", key: "SahaykaPhoneNo", type: '' },
        { label: "Category", key: "category_name", type: '' },
        // { label: "Pincode", key: "Pincode", type: '' },
        { label: "Accepted By Ngo", key: "AssignedNGOName", type: '' },
        
        { label: "Remark", key: "Remark", type: '' },
        { label: "Status", key: "status_name", type: 'statuses' },
        { label: "Action", key: "action", type: 'action', size: '12%', buttonNames: ['edit', 'view'] }],
    "data": [],
    "dataKey": 'RequestId',
    "buttonname": 'Create Request',
    "button": true,
    "approveRejectKey": "status_id",
    "approveId": 7,
    "rejectId": 8,
    "statuses": [
        { label: 'Approved', value: 'success' },
        { label: 'Request Completed', value: 'success' },
        { label: 'Rejected', value: 'danger' },
        { label: 'Request Inisited', value: 'info' },
        { label: 'Request Pending', value: 'info' },
    ],
    "filterfields": ['state_name'],
    "isSearch": true
}

export const NGORequestsDetailsORGData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Request ID No ", key: "RequestId", type: '' },
        { label: "Request User Name", key: "request_user_name", type: '' },
        { label: "Request Name", key: "RequestName", type: '' },
        { label: "Request Type", key: "request_type_name", type: '' },
        // { label: "Gender", key: "Gender", type: '' },
        // { label: "state Status", key: "is_active", type: 'active&inactive' }, 
        // { label: "Age", key: "Age", type: '' },
        // { label: "Sahayka Phone No", key: "SahaykaPhoneNo", type: '' },
        { label: "Category", key: "category_name", type: '' },
        // { label: "Pincode", key: "Pincode", type: '' },
        { label: "Accepted By Ngo", key: "AssignedNGOName", type: '' },
        
        { label: "Remark", key: "Remark", type: '' },
        { label: "Status", key: "status_name", type: 'statuses' },
        { label: "Action", key: "action", type: 'action', size: '12%', buttonNames: ['edit','delete','view'] }],
    "data": [],
    "dataKey": 'RequestId',
    "buttonname": 'Create Request',
    "button": true,
    "approveRejectKey": "status_id",
    "approveId": 7,
    "rejectId": 8,
    "statuses": [
        { label: 'Approved', value: 'success' },
        { label: 'Request Completed', value: 'success' },
        { label: 'Rejected', value: 'danger' },
        { label: 'Request Inisited', value: 'info' },
        { label: 'Request Pending', value: 'info' },
    ],
    "filterfields": ['state_name'],
    "isSearch": true
}

export const NgoListData: RowData = {
    "headers": [
        { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Name", key: "ngo_name", type: '' },
        { label: "Category", key: "category_name", type: '' },
        { label: "Mobile no", key: "mobile_no", type: '' },
        { label: "Email", key: "email", type: '' },
        { label: "Contact", key: "contact_name", type: '' },
        { label: "Pincode", key: "pincode", type: '' },
        { label: "Reason", key: "Reason", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['assign'] }],
    "data": [],
    "dataKey": 'Request_Ngo_Id',
    "buttonname": 'Create Request',
    "button": false,
    "isassignKeyUnable":false,
    "statuses": [
        { label: 'Approved', value: 'success' },
        { label: 'Request Completed', value: 'success' },
        { label: 'Rejected', value: 'danger' },
        { label: 'Request Inisited', value: 'info' },
        { label: 'Request Pending', value: 'info' },
        { label: 'Karmas Admin Approved', value: 'info' }
    ],
    "filterfields": ['ngo_name','ngo_type_name','registration_no','mobile_no','status_name','Reason','pincode'],
    "isSearch": true,
    // isSearchIndividual: true
}

export const RequestDetailsSearchGroup: IFormStructure[] = [
    {
        name: "RequestId",
        label: "Request ID No.(Auto Generate)",
        placeholder: "Enter Request ID",
        type: "number",
        value: "",
        hiddenControl: true,
        disable: true
    },
    // {
    //     name: "UserName",
    //     label: "User Name",
    //     placeholder: "Enter User Name",
    //     type: "text",
    //     value: "",
    //     required: true,
    //     disable: false
    // },
    // {
    //     name: "request_user_name",
    //     label: "Request User Name",
    //     placeholder: "Enter User Name",
    //     type: "text",
    //     value: "",
    //     required: true,
    //     disable: false
    // },
    {
        name: "RequestName",
        label: "Request Name",
        placeholder: "Enter Request Name",
        type: "text",
        value: "",
        required: true,
        disable: false
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
    {
        name: "Age",
        label: "Age",
        placeholder: "Enter Age",
        type: "number",
        value: "",
        required: false,
        disable: false
    },
    {
        name: "Gender",
        label: "Gender",
        placeholder: "Select Gender",
        type: "select",
        value: "",
        required: true,
        disable: false,
        listName: "gender",
        listData: ["Male", "Female", "Other"]  // Example options for gender
    },
    {
        name: "SahaykaPhoneNo",
        label: "Sahayka Phone No",
        placeholder: "Enter Phone Number",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "SahaykaEmailID",
        label: "Sahayka Email",
        placeholder: "Enter Email ID",
        type: "text",
        value: "",
        required: false,
        disable: false,
        validationFor: 'email'
    },
    {
        name: "category_id",
        label: "Category",
        placeholder: "Enter Category",
        type: "select",
        value: "",
        required: true,
        disable: false,
        // listName: "category",
        // listData: []
        listName: 'ngo_field',
        bindValue: 'ngo_field_id',
        bindLabel: 'field_name',
        listData: []
    },
    {
        name: "Address",
        label: "Address",
        placeholder: "Enter Address",
        type: "text",
        value: "",
        required: true,
        disable: false,
        colsize: 'col-6'
    },
    {
        name: "CityId",
        label: "City",
        placeholder: "Select City",
        type: "select",
        value: "",
        required: true,
        disable: false,
        listName: "city",  // You can define a list of available cities
        bindValue: "city_id",
        bindLabel: "city_name"
    },
    {
        name: "StateId",
        label: "State",
        placeholder: "Select State",
        type: "select",
        value: "",
        required: true,
        disable: false,
        listName: "state",  // List of states
        bindValue: "state_id",
        bindLabel: "state_name"
    },
    {
        name: "CountryId",
        label: "Country",
        placeholder: "Select Country",
        type: "select",
        value: "",
        required: true,
        disable: false,
        listName: "country",  // List of countries
        bindValue: "country_id",
        bindLabel: "country_name"
    },
    {
        name: "Pincode",
        label: "Pincode",
        placeholder: "Enter Pincode",
        type: "number",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "Remark",
        label: "Remark",
        placeholder: "Enter Remark",
        type: "text",
        value: "",
        required: true,
        disable: false,
        colsize: 'col-12'
    },

    {
        name: "Story",
        label: "Story",
        placeholder: "Enter Story",
        type: "textarea",
        value: "",
        required: false,
        disable: false,
        hiddenControl: true,
        colsize: 'col-12'
    },
    {
        name: "Problem",
        label: "Problem",
        placeholder: "Enter Problem",
        type: "textarea",
        value: "",
        required: false,
        disable: false,
        hiddenControl: true,
        colsize: 'col-12'
    },
    {
        name: "Solution",
        label: "Solution",
        placeholder: "Enter Solution",
        type: "textarea",
        value: "",
        required: false,
        disable: false,
        hiddenControl: true,
        colsize: 'col-12'
    },
    {
        name: "MessageToSahayak",
        label: "Message to Sahayak",
        placeholder: "Enter Message",
        type: "textarea",
        value: "",
        required: false,
        disable: false,
        hiddenControl: true,
        colsize: 'col-12'
    },
    {
        name: "NGO_Accept_NGO_Name",
        label: "NGO Accept NGO Name",
        placeholder: "Enter NGO Accept NGO Name",
        type: "text",
        value: "",
        required: false,
        disable: true,
        hiddenControl: true,
        colsize: 'col-12'
    },
    {
        name: "RejectRemark",
        label: "Reject Remark",
        placeholder: "Enter Reject Remark",
        type: "textarea",
        value: "",
        required: false,
        disable: true,
        hiddenControl:true,
        colsize:'col-12'
    },
    {
        name: "AssignedNGOName",
        label: "Acceped By NGO",
        placeholder: "NGO",
        type: "textarea",
        value: "",
        required: false,
        disable: true,
        colsize: 'col-12'
    },

    // {
    //     name: "file",
    //     label: "Upload Image",
    //     placeholder: "Upload Image",
    //     type: "upload",
    //     value: "",
    //     required: false,
    //     disable: false,
    //     requireBase64: true,
    //     formConfigUpload: [
    //         {
    //             name: "file",
    //             type: 'EXCEL',
    //             required: true,
    //             disable: false,
    //             text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Attachment.</h6></div>',
    //             dropzoneConfig: {
    //                 clickable: true,
    //                 url: 'https://httpbin.org/post',
    //                 addRemoveLinks: true,
    //                 parallelUploads: 1,
    //                 acceptedFiles: '.jpg,.jpeg,.pdf,.png',
    //                 maxFiles: 1
    //             }
    //         }
    //     ],
    //     colsize: 'col-12'
    // }
    // {
    //     name: 'is_active',
    //     label:'Status',
    //     placeholder: 'Status',
    //     type: 'select',
    //     value: '',
    //     bindValue: 'status_id',
    //     bindLabel: 'name',
    //     listName: 'status_list',
    //     required: false,
    //     disable: false,
    // },
    // {
    //     name: "is_active",
    //     label: "Is Active",
    //     placeholder: "Select Active Status",
    //     type: "select",
    //     value: "1",
    //     required: false,
    //     disable: false,
    //     listName: "active_status",  // Options for active status (e.g., Active, Inactive)
    //     listData: [{ 'status_id': 0, 'name': 'No' }, { 'status_id': 1, 'name': 'Yes' }],
    //     bindValue: "status_id",
    //     bindLabel: "name"
    // }
];



// export const requestStatusCard = [
//     { number: 0, label: 'Total Request', key: 'total_invoices', name: 'SHIPMENT HAS BEEN BOOKED' },
//     { number: 0, label: 'New Request ', key: 'proforma_invoice', name: 'OUT FOR HUB' },
//     // { number: 0, label: 'Total Pending', key: 'total_not_approved', name: 'IN SCAN' },
//     { number: 0, label: 'In-Progress Requests', key: 'draft_invoice', name: 'DRAFT' },
//     { number: 0, label: 'Reject Requests', key: 'draft_invoice', name: 'DRAFT' },
//     // { number: 0, label: 'Deletes NGOS', key: 'tax_invoice', name: 'TAX' },
//     // { number: 0, label: 'Black List NGO', key: 'total_irn', name: 'IRN' },
//     // { number: 0, label: 'Non Regi with darpan', key: 'total_irn', name: 'IRN' },
//     // { number: 0, label: 'Regi with darpan', key: 'total_irn', name: 'IRN' },
//     // { number: 0, label: 'Total IRN Not', key: 'total_not_irn', name: 'IRN Not' }, 
// ];

export const requestStatusCard = [
    { number: 0, label: 'Total Request', key: 'total_request_global', name: 'SHIPMENT HAS BEEN BOOKED' },
    { number: 0, label: 'Karmas Admin Approval', key: 'total_request_admin', name: 'SHIPMENT HAS BEEN BOOKED' },
    // { number: 0, label: 'Total Draft', key: 'total_request_draft', name: 'SHIPMENT HAS BEEN BOOKED' },
    { number: 0, label: 'Complete Request', key: 'total_request_approved_status', name: 'OUT FOR HUB' },
    { number: 0, label: 'Pending Requests', key: 'total_request_pending_status', name: 'DRAFT' },
    { number: 0, label: 'Ngo Approval Pending', key: 'total_request_ngo_approval_pending', name: 'DRAFT' },
    { number: 0, label: 'Reject Requests', key: 'total_request_rejected', name: 'REJECTED' },
];


export const requestNGOStatusCard = [
    { number: 0, label: 'Assigned Total Request', key: 'total_ngo_request', name: 'SHIPMENT HAS BEEN BOOKED' },
    // { number: 0, label: 'Total Draft', key: 'total_request_draft', name: 'SHIPMENT HAS BEEN BOOKED' },
    { number: 0, label: 'Assigned Complete Request', key: 'total_request_approved_status', name: 'OUT FOR HUB' },
    { number: 0, label: 'Assigned Ngo Approval Pending', key: 'total_request_ngo_approval_pending', name: 'DRAFT' },
    { number: 0, label: 'Assigned Reject Requests', key: 'total_request_rejected', name: 'REJECTED' },
];



