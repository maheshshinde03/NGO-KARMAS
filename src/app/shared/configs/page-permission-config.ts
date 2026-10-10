import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const PagePermissionDetailsData: RowData = {
    "headers": [
        { label: "", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Page Name", key: "page_name", type: 'text' },
        { label: "Permission", key: "permission", type: 'text' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [
        // { "SR.NO": 1, "role": "Admin", "permission": "Add, Edit, Delete, View, Download, Upload, Approval, Excel" },
        // { "SR.NO": 2, "role": "User", "permission": "View, Download" }
    ],
    "dataKey": 'page_permission_id',
    "buttonname": 'Create Permission',
    "button": true,
    "statuses": [
        { label: 'inactive', value: 'danger' },
        { label: 'active', value: 'success' }
    ],
    "filterfields": ['page_id', 'page_permission_id', 'page_name'],
    "isSearch": false
}

export const PagePermissionSearchGroup: IFormStructure[] = [
    {
        name: "page_id",
        label: "Pages",
        placeholder: "Enter service type",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindMultiple: false,
        bindValue: 'page_id',
        bindLabel: 'page_name',
        listName: 'page-id',
        listData: []
    },
    {
        name: "permission_id",
        label: "Permission",
        placeholder: "Enter permission",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindMultiple: true,
        bindValue: 'permission_id',
        bindLabel: 'permission',
        listName: 'permission-id',
        listData: [],
    },
]
