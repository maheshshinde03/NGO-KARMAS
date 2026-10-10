import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const EmployeeDetailsData: RowData = {
    "headers": [{ label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' }, 
    { label: "Employe Name", key: "employee_name", type: '' }, 
    { label: "Role", key: "role_name", type: '' }, 
    { label: "Contact", key: "contact_no", type: '' }, 
    { label: "Email", key: "email_id", type: '' }, 
    // { label: "Country Status", key: "is_active", type: 'active&inactive' }, 
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'emp_id',
    "buttonname": 'Create Employee',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['employee_name'],
    "isSearch": false
}

export const EmployeeTypeSearchGroup: IFormStructure[] = [
    {
        name: "emp_id",
        placeholder: "Employee Id",
        label: "Employee Type Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "employee_name",
        label: "Employee Name",
        placeholder: "Enter Employee Name",
        type: "text",
        value: "",
        required: true,
        disable: false,
    },
    {
        name: "role_id",
        placeholder: "Role",
        label: "Role",
        type: "select",
        value: "",
        bindValue: 'role_id',
        bindLabel: 'role_name',
        listName: 'role-id',
        required: true,
        disable: false,
    },
    {
        name: "contact_no",
        label: "Contact No",
        placeholder: "Enter Contact No",
        type: "text",
        value: "",
        required: false,
        disable: false,
        validationFor:'contact'
    },
    {
        name: "email_id",
        label: "Email Id",
        placeholder: "Enter Email Id",
        type: "text",
        value: "",
        required: false,
        disable: false,
        validationFor:'email'
    },
    {
        name: "address",
        label: "Address",
        placeholder: "Enter Address",
        type: "text",
        value: "",
        required: false,
        disable: false,
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Enter Gender",
        type: "text",
        value: "",
        required: false,
        disable: false,
    },
]