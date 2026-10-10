import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const KycTypeDetailsData: RowData = {
    "headers": [{ label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' }, 
    { label: "Kyc Name", key: "kyc_type_name", type: '', size: '8%' }, 
    { label: "Kyc Remarks", key: "remarks", type: '', size: '8%' },
    { label: "Action", key: "action", type: 'action', size: '3%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'kyc_type_id',
    "buttonname": 'Create Kyc Type',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['kyc_type_name'],
    "isSearch": false
}

export const KycTypeSearchGroup: IFormStructure[] = [
    {
        name: "kyc_type_id",
        placeholder: "Kyc Type Id",
        label: "Kyc Type Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "kyc_type_name",
        label: "KYC  Name",
        placeholder: "Enter KYC  Name",
        type: "text",
        value: "",
        required: true,
        disable: false,
        isUpperCase:true
    },
    {
        name: "remarks",
        label: "KYC Remarks",
        placeholder: "Enter KYC Remarks",
        type: "text",
        value: "",
        required: false,
        disable: false,
    },
    {
        name: "is_mandatory",
        label: "Is Mandatory",
        placeholder: "Is Mandatory",
        type: "select",
        value: "",
        bindValue: 'id',
        bindLabel: 'name',
        listName: 'yesno',
        disable: false,
    },
]