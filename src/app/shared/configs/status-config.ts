import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const StatusDetailsData: RowData = {
    headers: [
        // { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
        { label: "Status Id", key: "parent_status_name", type: '' },
        { label: "Table Id", key: "parent_status_name", type: '' },
        { label: "Status Name", key: "status_name", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    data: [],
    dataKey: 'status_id',
    buttonname: 'Add Status',
    button: true,
    statuses: [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' }
    ],
    filterfields: ['status_name'],
    isSearch: false
};

export const statusSearchGroup: IFormStructure[] = [
    {
        name: "status_id",
        label: "Status Id",
        placeholder: "Enter status id",
        type: "text",
        value: "",
        hiddenControl: false,
        disable: true
    },
    {
        name: "table_id",
        label: "Table Id",
        placeholder: "Select Table id",
        type: "select",
        value: "",
        bindValue: 'status_id',
        bindLabel: 'status_name',
        listName: 'parent',
        disable: false,
    },
    {
        name: "status_name",
        label: "Status Name",
        placeholder: "Enter status name",
        type: "text",
        value: "",
        required: true,
        disable: false,
    },
    {
        name: "is_active",
        label: "Is Active",
        placeholder: "Select Active Status",
        type: "select",
        value: "1", // Default to active
        required: false,
        disable: false,
        listName: "active_status",
        listData: ["1", "0"], // Active/Inactive options
        bindValue: "status_id",
        bindLabel: "name"
    },
]

export const globalStatus: any[] = [
    {
        name: "Embark",
        id: 22,
    },
    {
        name: "Disembark",
        id: 23,
    },
    {
        name: "Transit",
        id: 24,
    },
    {
        name: "No Show",
        id: 25,
    },
    {
        name: "Uploaded",
        id: 19,
    },
    {
        name: "Not Upload",
        id: 20,
    },
    {
        name: "PMS Upload",
        id: 99999,
    },


    // Port Call
    {
        id: 5,
        class: 'primary',
        name: 'Scheduled',
    },
    {
        id: 6,
        class: 'danger',
        name: 'Delayed',
    },
    {
        id: 7,
        class: 'success',
        name: 'Arrived',
    },
    {
        id: 8,
        class: 'success',
        name: 'Departed',
    },
    {
        id: 9,
        class: 'primary',
        name: 'Fueling',
    },
    {
        id: 40,
        class: 'success',
        name: 'Closed',
    },

    // DRS
    {
        id: 15,
        name: 'OPEN',
    },
];


export const globalStatusIDS: any = {

    // PORT CALL
    PORT_CALL_ClOSED: 40,
    PORT_ARRIVED: 7,

    // DRS
    DRS_OPEN: 15,
    DRS_INPROGRESS: 16,
    DRS_COMPLETE: 17,

    // JOB ID
    JOBID_OPEN: 11,
    JOBID_ACTIVE: 12,

    // PAYMENT
    PAYMENT_APPROVED: 36,
    PAYMENT_REJECT: 31,
    PAYMENT_INREVIEW: 28,

    // Other Service
    OPEN_REQUEST: 33,
    OPERATOR_PROCEED: 34,
    OPERATOR_REJECTED: 39,
    AGENT_CONFIRM: 35,
    AGENT_REJECTED: 37,

    // Settings
    COF_CJ: 11,

    // INVOICE
    INVOICE_APPROVED: 43
};
