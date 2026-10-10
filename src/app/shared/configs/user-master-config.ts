import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const UserMasterData: RowData = {
    "headers": [
        { label: "Sr.No", key: "user_id", type: 'autoIncrementNumber', size: '4%' },  // Display User ID as auto-incrementing number
        { label: "User Name", key: "user_name", type: '' },                             // Display User Name
        { label: "Full Name", key: "full_name", type: '' },                             // Display Full Name
        { label: "NGO Name", key: "ngo_name", type: '' },                             // Display Full Name
        { label: "Email ID", key: "email_id", type: '' },
        { label: "Gender", key: "gender", type: '' },
        { label: "Type of User", key: "role", type: '' },                               // Display Email ID
        { label: "Is First time login ", key: "first_time_login", type: 'convertboolean' },
        { label: "Is Blacklisted", key: "is_blacklisted", type: 'convertboolean' },                               // Display Email ID
        { label: "Is Authenticated", key: "is_authenticated", type: 'convertboolean' },                               // Display Email ID
        // { label: "Enrolling Date", key: "enrolling_date", type: 'date' },               // Display Enrolling Date
        { label: "Is Active", key: "is_active", type: 'active&inactive' },  
                       // Display Active/Inactive status
        // { label: "Created By", key: "created_by", type: '' },                           // Display Created By user
        { label: "Action", key: "action", type: 'action', size: '10%', buttonNames: ['edit', 'view', 'delete', 'lock', 'unlock'] } // Action buttons
    ],
    "data": [],  // Data array, will be populated dynamically
    "dataKey": 'user_id', // Unique key for each record
    "buttonname": 'Create User',  // Button text for creating new user
    "button": true,  // Whether the "Create User" button is enabled
    "statuses": [
        { label: 'Inactive', value: 'danger' },  // Danger color for inactive status
        { label: 'Active', value: 'success' }   // Success color for active status
    ],
    "filterfields": ['user_name'],  // Fields that can be filtered (e.g., filter by User Name)
    "isSearch": true,  // Enable search functionality for the table
    "blockDataKey": 'is_blacklisted'
}


export const UserMasterFormGroup: IFormStructure[] = [
    {
        name: "user_id",
        label: "User ID",
        placeholder: "Enter User ID",
        type: "number",
        value: "",
        hiddenControl: true,
        disable: true // Auto-increment field, not editable
    },
    {
        name: "role_id",
        label: "Role",
        placeholder: "Role",
        type: 'select',
        value: '',
        bindValue: 'role_id',
        bindLabel: 'role',
        listName: 'role-id',
        required: true,
        disable: false,
    },
    {
        name: "ngo_id",
        label: "Ngo's",
        placeholder: "Ngo's",
        type: 'select',
        value: '',
        bindValue: 'ngo_id',
        bindLabel: 'ngo_name',
        listName: 'ngo-id',
        required: false,
        disable: false,
    },
    {
        name: "user_name",
        label: "User Name",
        placeholder: "Enter User Name",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter Password",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "full_name",
        label: "Full Name",
        placeholder: "Enter Full Name",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "email_id",
        label: "Email ID",
        placeholder: "Enter Email Address",
        type: "text",
        value: "",
        required: true,
        // extraButtonAdding: true,
        // extraButtonAddingText: 'VERIFY',
        // extraButtonAddingIcon: 'icofont icofont-check-circled font-primary',
        disable: false,
        validationFor:'email'
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Select Gender",
        type: "select",
        value: "",
        required: false,
        disable: false,
        listName: "gender",
        listData: ["Male", "Female", "Other"] // Gender options
    },
    {
        name: "mobile_no",
        label: "Mobile No.",
        placeholder: "Enter Mobile No.",
        type: "text",
        value: "",
        required: false,
        disable: false,
        validationFor:'contact'
    },
    {
        name: "bio",
        label: "Bio.",
        placeholder: "Enter Bio.",
        type: "textarea",
        value: "",
        required: false,
        disable: false
    },

    {
        name: "enrolling_date",
        label: "Enrolling Date",
        placeholder: "Select Enrolling Date",
        type: "date-time",
        value: "",
        required: true,
        disable: false
    },

    {
        name: "follower_no",
        label: "Follower No.",
        placeholder: "Enter Follower No.",
        type: "text",
        value: "",
        required: false,
        disable: true
    },
    // {
    //     name: "following_no",
    //     label: "Following No.",
    //     placeholder: "Enter Following No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "scores_no",
    //     label: "Total Scores No.",
    //     placeholder: "Enter Total Scores No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "request_no",
    //     label: "Total Requests No.",
    //     placeholder: "Enter Total Requests No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "reward_no",
    //     label: "Total Reward no",
    //     placeholder: "Enter Total Reward no",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    {
        name: "upload_photo",
        label: "Upload Photo",
        placeholder: "Upload Photo",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64: true,
        formConfigUpload: [
            {
                name: "upload_photo",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Photo.</h6></div>',
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
        colsize: 'col-12'
    },
    //     {
    //         name: "is_active",
    //         label: "Is Active",
    //         placeholder: "Select Active Status",
    //         type: "select",
    //         value: "1", // Default to active
    //         required: false,
    //         disable: false,
    //         listName: "active_status",
    //         listData: ["1", "0"], // Active/Inactive options
    //         bindValue: "status_id",
    //         bindLabel: "status_label"
    //     },
    //     {
    //         name: "created_by",
    //         label: "Created By",
    //         placeholder: "Enter Creator's Name or ID",
    //         type: "text",
    //         value: "",
    //         required: true,
    //         disable: false
    //     }
];

export const UserProfileMasterFormGroup: IFormStructure[] = [
    {
        name: "user_id",
        label: "User ID",
        placeholder: "Enter User ID",
        type: "number",
        value: "",
        hiddenControl: true,
        disable: true // Auto-increment field, not editable
    },
    {
        name: "user_name",
        label: "User Name",
        placeholder: "Enter User Name",
        type: "text",
        value: "",
        required: true,
        disable: true
    },
    // {
    //     name: "password",
    //     label: "Password",
    //     placeholder: "Enter Password",
    //     type: "text",
    //     value: "",
    //     required: true,
    //     disable: false
    // },
    {
        name: "full_name",
        label: "Full Name",
        placeholder: "Enter Full Name",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "email_id",
        label: "Email ID",
        placeholder: "Enter Email Address",
        type: "text",
        value: "",
        required: true,
        // extraButtonAdding: true,
        // extraButtonAddingText: 'VERIFY',
        // extraButtonAddingIcon: 'icofont icofont-check-circled font-primary',
        disable: true,
        validationFor:'email'
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Select Gender",
        type: "select",
        value: "",
        required: false,
        disable: false,
        listName: "gender",
        listData: ["Male", "Female", "Other"] // Gender options
    },
    {
        name: "mobile_no",
        label: "Mobile No.",
        placeholder: "Enter Mobile No.",
        type: "text",
        value: "",
        required: false,
        disable: false,
        validationFor:'contact'
    },
    {
        name: "bio",
        label: "Bio.",
        placeholder: "Enter Bio.",
        type: "textarea",
        value: "",
        required: false,
        disable: false
    },

    {
        name: "enrolling_date",
        label: "Enrolling Date",
        placeholder: "Select Enrolling Date",
        type: "date-time",
        value: "",
        required: false,
        disable: false
    },

    // {
    //     name: "follower_no",
    //     label: "Follower No.",
    //     placeholder: "Enter Follower No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "following_no",
    //     label: "Following No.",
    //     placeholder: "Enter Following No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "scores_no",
    //     label: "Total Scores No.",
    //     placeholder: "Enter Total Scores No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "request_no",
    //     label: "Total Requests No.",
    //     placeholder: "Enter Total Requests No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "reward_no",
    //     label: "Total Reward no",
    //     placeholder: "Enter Total Reward no",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    {
        name: "upload_photo",
        label: "Upload Photo",
        placeholder: "Upload Photo",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64: true,
        formConfigUpload: [
            {
                name: "upload_photo",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Photo.</h6></div>',
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
        colsize: 'col-12'
    },
    //     {
    //         name: "is_active",
    //         label: "Is Active",
    //         placeholder: "Select Active Status",
    //         type: "select",
    //         value: "1", // Default to active
    //         required: false,
    //         disable: false,
    //         listName: "active_status",
    //         listData: ["1", "0"], // Active/Inactive options
    //         bindValue: "status_id",
    //         bindLabel: "status_label"
    //     },
    //     {
    //         name: "created_by",
    //         label: "Created By",
    //         placeholder: "Enter Creator's Name or ID",
    //         type: "text",
    //         value: "",
    //         required: true,
    //         disable: false
    //     }
];

export const UserBlockMasterFormGroup: IFormStructure[] = [
    // {
    //     name: "user_id",
    //     label: "User ID",
    //     placeholder: "Enter User ID",
    //     type: "number",
    //     value: "",
    //     hiddenControl: true,
    //     disable: true // Auto-increment field, not editable
    // },
    {
        name: "blacklisted_user_id",
        label: "User",
        placeholder: "User",
        type: 'select',
        value: '',
        bindValue: 'user_id',
        bindLabel: 'full_name',
        listName: 'user-id',
        required: true,
        disable: false,
        colsize: 'col-4'
    },
    {
        name: "reason",
        label: "Reason",
        placeholder: "Enter Reason",
        type: "textarea",
        value: "",
        required: true,
        disable: false,
        colsize: 'col-8'
    },
    {
        name: "blacklisted_at",
        label: "Date",
        placeholder: "Date",
        type: "date-time",
        value: new Date(),
        required: true,
        disable: true,
        colsize: 'col-8'
    },
    // {
    //     name: "blacklisted_at",
    //     label: "Is Active",
    //     placeholder: "Select Active Status",
    //     type: "select",
    //     value: "1", // Default to active
    //     required: false,
    //     disable: false,
    //     listName: "active_status",
    //     listData: ["1", "0"], // Active/Inactive options
    //     bindValue: "status_id",
    //     bindLabel: "status_label"
    // },
];

// export const userMasterStatusCard = [
//     { number: 0, label: 'Total User', key: 'total_invoices', name: 'SHIPMENT HAS BEEN BOOKED' },
//     { number: 0, label: 'News User', key: 'proforma_invoice', name: 'OUT FOR HUB' },
//     // { number: 0, label: 'Total Pending', key: 'total_not_approved', name: 'IN SCAN' },
//     { number: 0, label: 'Actives User', key: 'draft_invoice', name: 'DRAFT' },
//     { number: 0, label: 'In Actives User', key: 'tax_invoice', name: 'TAX' },
//     { number: 0, label: 'Bloack User', key: 'total_irn', name: 'IRN' }
//     // { number: 0, label: 'Total IRN Not', key: 'total_not_irn', name: 'IRN Not' }, 
// ];
export const userMasterStatusCardAdmin = [
    { number: 0, label: 'Total Users', key: 'user_total_count', name: 'All Users' },
    { number: 0, label: 'New Users (This Month)', key: 'user_new_month_user', name: 'Joined This Month' },
    { number: 0, label: 'Active Users', key: 'user_total_active', name: 'Currently Active' },
    { number: 0, label: 'Previous Month Users', key: 'user_previous_month_user', name: 'Joined Last Month' },
    { number: 0, label: 'Blocked Users', key: 'user_total_blacklisted', name: 'Blacklisted' },
];
export const userMasterStatusCard = [
    { number: 0, label: 'Total Users', key: 'user_total_count', name: 'All Users' },
    { number: 0, label: 'New Users (This Month)', key: 'user_new_month_user', name: 'Joined This Month' },
    { number: 0, label: 'Active Users', key: 'user_total_active', name: 'Currently Active' },
    // { number: 0, label: 'Previous Month Users', key: 'user_previous_month_user', name: 'Joined Last Month' },
    // { number: 0, label: 'Blocked Users', key: 'user_total_blacklisted', name: 'Blacklisted' },
];


export const UserMasterNGOData: RowData = {
    "headers": [
        { label: "Sr.No", key: "user_id", type: 'autoIncrementNumber', size: '4%' },  // Display User ID as auto-incrementing number
        { label: "User Name", key: "user_name", type: '' },                             // Display User Name
        { label: "Full Name", key: "full_name", type: '' },                             // Display Full Name
        { label: "Email ID", key: "email_id", type: '' },
        { label: "Gender", key: "gender", type: '' },
        { label: "Designation", key: "designation_name", type: '' },                               // Display Email ID
        // { label: "Is First time login ", key: "first_time_login", type: 'convertboolean' },                               // Display Email ID
        // { label: "Enrolling Date", key: "enrolling_date", type: 'date' },               // Display Enrolling Date
        { label: "Status", key: "is_active", type: 'active&inactive' },                 // Display Active/Inactive status
        // { label: "Created By", key: "created_by", type: '' },                           // Display Created By user
        // { label: "Action", key: "action", type: 'action', size: '10%', buttonNames: ['edit', 'view', 'delete', 'lock', 'unlock'] } // Action buttons
        { label: "Action", key: "action", type: 'action', size: '10%', buttonNames: ['edit', 'view', 'delete'] } // Action buttons
    ],
    "data": [],  // Data array, will be populated dynamically
    "dataKey": 'user_id', // Unique key for each record
    "buttonname": 'Create User',  // Button text for creating new user
    "button": true,  // Whether the "Create User" button is enabled
    "statuses": [
        { label: 'Inactive', value: 'danger' },  // Danger color for inactive status
        { label: 'Active', value: 'success' }   // Success color for active status
    ],
    "filterfields": ['user_name'],  // Fields that can be filtered (e.g., filter by User Name)
    "isSearch": true,  // Enable search functionality for the table
    "blockDataKey": 'is_blacklisted'
}


export const UserMasterNGOFormGroup: IFormStructure[] = [
    {
        name: "user_id",
        label: "User ID",
        placeholder: "Enter User ID",
        type: "number",
        value: "",
        hiddenControl: true,
        disable: true // Auto-increment field, not editable
    },
    // {
    //     name: "role_id",
    //     label: "Role",
    //     placeholder: "Role",
    //     type: 'select',
    //     value: '',
    //     bindValue: 'role_id',
    //     bindLabel: 'role',
    //     listName: 'role-id',
    //     required: false,
    //     disable: false,
    // },
    // {
    //     name: "ngo_id",
    //     label: "Ngo's",
    //     placeholder: "Ngo's",
    //     type: 'select',
    //     value: '',
    //     bindValue: 'ngo_id',
    //     bindLabel: 'ngo_name',
    //     listName: 'ngo-id',
    //     required: false,
    //     disable: false,
    // },
    {
        name: "user_name",
        label: "User Name",
        placeholder: "Enter User Name",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter Password",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "full_name",
        label: "Full Name",
        placeholder: "Enter Full Name",
        type: "text",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "email_id",
        label: "Email ID",
        placeholder: "Enter Email Address",
        type: "text",
        value: "",
        required: true,
        disable: false,
        validationFor:'email'
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Select Gender",
        type: "select",
        value: "",
        required: false,
        disable: false,
        listName: "gender",
        listData: ["Male", "Female", "Other"] // Gender options
    },
    {
        name: "enrolling_date",
        label: "Enrolling Date",
        placeholder: "Select Enrolling Date",
        type: "date-time",
        value: "",
        required: true,
        disable: false
    },
    {
        name: "designation_id",
        label: "Designation",
        placeholder: "Designation",
        type: 'select',
        value: '',
        bindValue: 'ngo_designation_id',
        bindLabel: 'designation_name',
        listName: 'designation-id',
        required: false,
        disable: false,
    },

    // {
    //     name: "follower_no",
    //     label: "Follower No.",
    //     placeholder: "Enter Follower No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "following_no",
    //     label: "Following No.",
    //     placeholder: "Enter Following No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "scores_no",
    //     label: "Total Scores No.",
    //     placeholder: "Enter Total Scores No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "request_no",
    //     label: "Total Requests No.",
    //     placeholder: "Enter Total Requests No.",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    // {
    //     name: "reward_no",
    //     label: "Total Reward no",
    //     placeholder: "Enter Total Reward no",
    //     type: "text",
    //     value: "",
    //     required: false,
    //     disable: true
    // },
    {
        name: "upload_photo",
        label: "Upload Photo",
        placeholder: "Upload Photo",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64: true,
        formConfigUpload: [
            {
                name: "upload_photo",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Photo.</h6></div>',
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
        colsize: 'col-12'
    },
    //     {
    //         name: "is_active",
    //         label: "Is Active",
    //         placeholder: "Select Active Status",
    //         type: "select",
    //         value: "1", // Default to active
    //         required: false,
    //         disable: false,
    //         listName: "active_status",
    //         listData: ["1", "0"], // Active/Inactive options
    //         bindValue: "status_id",
    //         bindLabel: "status_label"
    //     },
    //     {
    //         name: "created_by",
    //         label: "Created By",
    //         placeholder: "Enter Creator's Name or ID",
    //         type: "text",
    //         value: "",
    //         required: true,
    //         disable: false
    //     }
];