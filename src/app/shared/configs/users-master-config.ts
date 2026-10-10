import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const UsersMasterDetailsData: RowData = {
    "headers": [{ label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' }, 
    { label: "User Name", key: "user_name", type: '' }, 
    { label: "Role", key: "role_name", type: '' }, 
    { label: "Email", key: "email_id", type: '' }, 
    // { label: "Country Status", key: "is_active", type: 'active&inactive' }, 
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'user_id',
    "buttonname": 'Create User',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['user_name'],
    "isSearch": false
}

export const UsersTypeSearchGroup: IFormStructure[] = [
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
        name: "parent_id",
        placeholder: "parent Id",
        label: "parent_id Id",
        type: "number",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "agent_id",
        placeholder: "Agent",
        label: "Agent",
        type: "select",
        value: "",
        bindValue: 'agent_id',
        bindLabel: 'agent_name',
        listName: 'agent_id',
        required: false,
        disable: false,
        hiddenControl:true,
    },
    {
        name: "user_id",
        placeholder: "Employee Id",
        label: "Employee Type Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "user_name",
        label: "User Name",
        placeholder: "Enter User Name",
        type: "text",
        value: "",
        required: true,
        disable: false,
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter Password",
        type: "text",
        value: "",
        required: true,
        disable: false,
    },
    {
        name: "email_id",
        label: "Email Id",
        placeholder: "Enter Email Id",
        type: "text",
        value: "",
        required: true,
        disable: false,
        validationFor:'email'
    },
    {
        name: "status_id",
        label: "Is Active",
        placeholder: "Is Active",
        type: "select",
        value: "",
        bindValue: 'status_id',
        bindLabel: 'status_name',
        listName: 'yesno',
        required: true,
        disable: false,
    }
]