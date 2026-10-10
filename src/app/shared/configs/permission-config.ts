import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";


export const PermissionDetails: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '1rem' }, 
        // { label: "ID", key: "permission_id", type: '',size: '2rem' }, 
        { label: "Permission", key: "permission", type: '' }, 
        // { label: "Action", type: "button", key: "delete", size: '4rem' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete']}
    ],
    "data": [],
    "dataKey": 'permission_id',
    "buttonname": 'Create Role Permission',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields":['permission_id', 'permission_id'],
    "isSearch": true
}

export const RolePermissionDetails: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '1rem' }, 
        // { label: "ID", key: "role_page_permission_id", type: 'link', url: "/permission/role-permission/", size: '2rem' }, 
        { label: "Role Name", key: "role_name", type: '' }, 
        { label: "Page Name", key: "page_name", type: '', size: '13rem', truncateString: false }, 
        { label: "Description", key: "description", type: '', size: '13rem', truncateString: false }, 
        // { label: "Action", type: "button", key: "delete" }
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete']}
    ],
    "data": [],
    "dataKey": 'role_page_permission_id',
    "buttonname": 'Create Role Permission',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields":['role_page_permission_id', 'role_name', 'page_name'],
    "isSearch": true
}

export const RoleDetails: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '1rem' }, 
        // { label: "ID", key: "role_id", type: '',size: '2rem' }, 
        { label: "Role Name", key: "role", type: '', size: '13rem' }, 
        // { label: "Action", type: "button", key: "delete" }
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete']}
    ],
    "data": [],
    "dataKey": 'role_id',
    "buttonname": 'Create Role',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields":['role_id', 'role'],
    "isSearch": true
}

export const PageDetails: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '1rem' }, 
        // { label: "ID", key: "page_id", type: 'link', size: '2rem' }, 
        { label: "Page Name", key: "page_name", type: '', size: '13rem', truncateString: false }, 
        { label: "Page URL", key: "page_url", type: '', size: '13rem', truncateString: false }, 
        { label: "Mobile URL", key: "mobile_url", type: '', size: '13rem', truncateString: false }, 
        { label: "Module Name", key: "module_name", type: '' }, 
        // { label: "Action", type: "button", key: "delete" }
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete']}
    ],
    "data": [],
    "dataKey": 'page_id',
    "buttonname": 'Create Page',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields":['page_name', 'page_url', 'mobile_url', 'module_name'],
    "isSearch": true
}

export const PagePermissionDetails: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '1rem' }, 
        // { label: "ID", key: "page_permission_id", type: '',size: '2rem' }, ß
        { label: "Page Name", key: "page_name", type: '', size: '13rem', truncateString: false }, 
        { label: "Permission", key: "permission", type: '' }, 
        // { label: "Action", type: "button", key: "delete" }
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete']}
    ],
    "data": [],
    "dataKey": 'page_permission_id',
    "buttonname": 'Create Page Permission',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields":['page_name', 'permission'],
    "isSearch": true
}

export const RoleFormGroup: IFormStructure[] = [
    {
        name: "role_id",
        label: "Role ID",
        placeholder: "Role ID",
        type: "text",
        value: "",
        disable: false,
        hiddenControl: true,
    },
    {
        name: "role",
        label: "Role",
        placeholder: "Role",
        type: "text",
        value: "",
        disable: false,
        required: true,
        colsize: "col-6"
    },
    {
        name: "menu_id",
        label: "Based On",
        placeholder: "Based On",
        type: "select",
        value: "",
        bindValue: 'menu_id',
        bindLabel: 'role_type',
        listName: 'menu-set',
        required:true,
        disable: false,
    },
]

export const PermissionFormGroup: IFormStructure[] = [
    {
        name: "permission_id",
        label: "Permission ID",
        placeholder: "Permission ID",
        type: "text",
        value: "",
        disable: true,
        hiddenControl: true,
    },
    {
        name: "permission_values",
        label: "Permission Values",
        placeholder: "Permission Values",
        type: "text",
        value: "",
        disable: true,
        hiddenControl: true,
    },
    {
        name: "permission",
        label: "Permission",
        placeholder: "Permission",
        type: "text",
        value: "",
        disable: false,
        required: true,
        colsize: "col-6"
    }
]

export const RolePermissionFormGroup: IFormStructure[] = [
    {
        name: "role_page_permission_id",
        label: "Role Permission ID",
        placeholder: "Role Permission ID",
        type: "text",
        value: "",
        disable: true,
        hiddenControl: true,
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
        required: false,
        disable: false,
    },
    {
        name: "permission",
        label: "Permission",
        placeholder: "Permission",
        type: 'select',
        value: '',
        bindValue: 'permission_id',
        bindLabel: 'permission',
        listName: 'permission-id',
        required: false,
        disable: false,
        bindMultiple:true
    },
    {
        name: "page_id",
        label: "Page",
        placeholder: "Page",
        type: 'select',
        value: '',
        bindValue: 'page_id',
        bindLabel: 'page_name',
        listName: 'page-id',
        required: false,
        disable: false,
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Description",
        type: "text",
        value: "",
        disable: false,
    },
]

export const RolePagePermissionGroup: IFormStructure[] = [
    {
      name: "permission",
      label: "permission",
      placeholder: "permission",
      type: "number",
      value: "",
      disable: false,
      hiddenControl:true
    },
    {
      name: "role_id",
      label: "Role",
      placeholder: "Enter role",
      type: "select",
      value: "",
      required: true,
      disable: false,
      bindValue: 'role_id',
      bindLabel: 'role',
      listName: 'role-id',
      listData: []
    },
    {
      name: "page_id",
      label: "Pages",
      placeholder: "Enter service type",
      type: "select",
      value: "",
      required: true,
      disable: false,
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
      listData: []
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description",
      type: "text",
      value: "",
      disable: false
    }
];

export const PageFormGroup: IFormStructure[] = [
    {
        name: "page_id",
        label: "Page ID",
        placeholder: "Page ID",
        type: "text",
        value: "",
        disable: false,
        hiddenControl: true,
    },
    {
        name: "interface",
        label: "Interface",
        placeholder: "Interface",
        type: "text",
        value: "",
        disable: false,
        hiddenControl: true,
    },
    {
        name: "page_name",
        label: "Page Name",
        placeholder: "Page Name",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "page_url",
        label: "Page URL",
        placeholder: "Page URL",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "mobile_url",
        label: "Mobile URL",
        placeholder: "Mobile URL",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "module_name",
        label: "Module Name",
        placeholder: "Module Name",
        type: "text",
        value: "",
        disable: false,
    }
]

export const PagePermissionFormGroup: IFormStructure[] = [
    {
        name: "page_permission_id",
        label: "Page Permission ID",
        placeholder: "Page Permission ID",
        type: "text",
        value: "",
        disable: false,
        hiddenControl: true,
    },
    {
        name: "page_id",
        label: "Page",
        placeholder: "Page",
        type: 'select',
        value: '',
        bindValue: 'page_id',
        bindLabel: 'page_name',
        listName: 'page-id',
        required: false,
        disable: false,
    },
    {
        name: "permission_id",
        label: "Permission",
        placeholder: "Permission",
        type: 'select',
        value: '',
        bindValue: 'permission_id',
        bindLabel: 'permission',
        listName: 'permission-id',
        required: false,
        disable: false,
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Description",
        type: "text",
        value: "",
        disable: false,
    }
]


export const RoleWisePagePermissionGroupTable: IFormStructure[] = [

    {
      name: "role_id",
      label: "Role",
      placeholder: "Enter role",
      type: "select",
      value: "",
      required: true,
      disable: false,
      bindValue: 'role_id',
      bindLabel: 'role',
      listName: 'role-id',
      listData: []
    },
];


