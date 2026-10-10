import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const ServiceDetailsData: RowData = {
    "headers": [
        { label: "", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Service Name", key: "service_name", type: '' },
        { label: "Service Code", key: "service_code", type: '' },
        { label: "Service Type", key: "service_type", type: '' },
        { label: "Charge Type", key: "charge_name", type: '' },
        // { label: "Service Status", key: "is_active", type: 'active&inactive' }, 
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'service_id',
    "buttonname": 'Create Service',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['service_name'],
    "isSearch": false
}

export const ServiceTypeDetailsData: RowData = {
    "headers": [
        { label: "", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Service Type", key: "service_type", type: '' },
        { label: "Description", key: "description", type: '' },
        // { label: "Service Type Status", key: "is_active", type: 'active&inactive' }, 
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'service_type_id',
    "buttonname": 'Create Service Type',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['service_type'],
    "isSearch": false
}

export const ServiceSubDetailsData: RowData = {
    "headers": [
        { label: "", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Service Type", key: "service_type", type: '' },
        { label: "Service Name", key: "service_name", type: '' },
        { label: "Service Sub Type", key: "service_sub_type", type: '' },
        { label: "Minimum Value", key: "minimum_value", type: '' },
        // { label: "Service Sub Status", key: "is_active", type: 'active&inactive' }, 
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'service_sub_type_id',
    "buttonname": 'Create Service Sub Type',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['service_sub_type'],
    "isSearch": false
}

export const ServiceSubUnitDetailsData: RowData = {
    "headers": [
        { label: "", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Service Sub Type", key: "service_sub_type", type: '' },
        { label: "Unit Name", key: "unit_name", type: '' },
        { label: "Is Default", key: "is_default", type: 'convertboolean' },
        // { label: "Service Sub Status", key: "is_active", type: 'active&inactive' }, 
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'id',
    "buttonname": 'Create Service Sub Type',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['service_sub_type'],
    "isSearch": false
}

export const ServicesDetailsAgentSideData: RowData = {
    headers: [
        { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
        { label: "Service Name", key: "service_name", type: '' },
        { label: "%complete", key: "service_code", type: '' },
        { label: "Unit", key: "is_active", type: '' },
        { label: "Qty", key: "is_active", type: '' },
        { label: "Rate", key: "is_active", type: '' },
        { label: "Contract id", key: "action", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    data: [],
    dataKey: 'service_id',
    buttonname: 'Add Service',
    button: false,
    statuses: [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' }
    ],
    filterfields: ['service_name', 'service_code'],
    isSearch: false
};

export const ServiceSearchGroup: IFormStructure[] = [
    {
        name: "service_id",
        label: "Service Id",
        placeholder: "Service Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "service_name",
        label: "Service Name",
        placeholder: "Enter service name",
        type: "text",
        value: "",
        required: true,
        disable: false,
        isUpperCase: true
    },
    {
        name: "service_code",
        label: "Service Code",
        placeholder: "Enter service code",
        type: "text",
        value: "",
        required: true,
        disable: false,
    },
    {
        name: "service_type_id",
        label: "Service Type",
        placeholder: "Enter service type",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'service_type_id',
        bindLabel: 'service_type',
        listName: 'service-type',
        listData: []

    },
    {
        name: "charge_type_id",
        label: "Charge Type",
        placeholder: "Enter charge type",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'charge_type_id',
        bindLabel: 'charge_name',
        listName: 'charge-type',
        listData: []
    },
]

export const ServiceTypeSearchGroup: IFormStructure[] = [
    {
        name: "service_type_id",
        label: "Service Type Id",
        placeholder: "Service Type Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "service_type",
        label: "Service Type",
        placeholder: "Enter service type",
        type: "text",
        value: "",
        required: true,
        disable: false,
        colsize: 'col-6',
        isUpperCase: true
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Enter description",
        type: "text",
        value: "",
        required: true,
        disable: false,
        colsize: 'col-6'
    },
]

export const ServiceSubTypeSearchGroup: IFormStructure[] = [
    {
        name: "service_sub_type_id",
        label: "Service Sub Type Id",
        placeholder: "Service Sub Type Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "service_sub_type",
        label: "Service Sub Type",
        placeholder: "Enter service sub type",
        type: "text",
        value: "",
        required: true,
        disable: false,
        isUpperCase: true
    },
    {
        name: "service_id",
        label: "Service",
        placeholder: "Enter service",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'service_id',
        bindLabel: 'service_name',
        listName: 'service',
        listData: []

    },
    {
        name: "minimum_value",
        label: "Minimum Value",
        placeholder: "Enter minimum value",
        type: "number",
        value: "",
        required: true,
        disable: false,
    },
    {
        name: "sac_id",
        label: "SAC",
        placeholder: "Enter sac",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'sac_id',
        bindLabel: 'sac_code',
        listName: 'sac',
        listData: []
    },
    {
        name: "supporting_document_req",
        label: "Document Upload Required",
        placeholder: "Enter service unit",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'id',
        bindLabel: 'name',
        listName: 'yesno',
        listData: []
    },
    {
        name: "is_mandatory",
        label: "Is Mandotory",
        placeholder: "Is Mandotory",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'id',
        bindLabel: 'name',
        listName: 'yesno',
        listData: []
    },
    {
        name: "account_code",
        label: "Account Code",
        placeholder: "Enter account code",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "remarks",
        label: "Remarks",
        placeholder: "Enter remarks",
        type: "text",
        value: "",
        disable: false,
    },

]

export const ServiceSubTypeUnitSearchGroup: IFormStructure[] = [
    {
        name: "id",
        label: "Service Sub Type Unit Id",
        placeholder: "Service Sub Type Unit Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "service_sub_type_id",
        label: "Service Sub Type",
        placeholder: "Enter service sub type",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'service_sub_type_id',
        bindLabel: 'service_sub_type',
        listName: 'service-subtype',
        listData: []

    },
    {
        name: "unit_id",
        label: "Unit",
        placeholder: "Enter unit",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'unit_id',
        bindLabel: 'unit_name',
        listName: 'unit',
        listData: []
    },
    {
        name: "is_default",
        label: "Is Default",
        placeholder: "Is Default",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'id',
        bindLabel: 'name',
        listName: 'yesno',
        listData: []
    },
]
