import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const PageDetailsData: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        // { label: "Parent ID", key: "parent_id", type: 'number' },
        { label: "Page Name", key: "page_name", type: 'text' },
        { label: "Page URL", key: "page_url", type: 'text' },
        // { label: "Mobile URL", key: "mobile_url", type: 'text' },
        // { label: "Is Active", key: "is_active", type: 'status' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'page_id',
    "buttonname": 'Create Page',
    "button": true,
    "statuses": [
        { label: 'inactive', value: 'danger' },
        { label: 'active', value: 'success' }
    ],
    "filterfields": ['parent_id', 'page_name', 'page_url', 'mobile_url'],
    "isSearch": false
}

export const PageFormStructure: IFormStructure[] = [
    {
        name: "page_name",
        label: "Page Name",
        placeholder: "Enter page name",
        type: "text",
        value: "",
        required: true,
        disable: false,
        maxLength: 100
    },
    {
        name: "page_url",
        label: "Page URL",
        placeholder: "Enter page URL",
        type: "text",
        value: "",
        required: true,
        disable: false,
        maxLength: 100
    }
]
