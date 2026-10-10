export interface Header {
    label: string;
    key: string;
    type?: string;
    url?: string
    size?: string;
    truncateString?: boolean;
    buttonNames?: any;
    isbuttonMenu?: boolean;
    buttonMenu?: any;
    bindTagName?:any;
    firstkey?: string;
    secondKey?: string;
}

export interface RowData {
    headers: Header[];
    data: any;
    statuses: any;
    dataKey: string;
    buttonname?: string;
    button?: boolean;
    secondbuttonname?: string;
    secondbutton?: boolean;
    thirdbuttonname?:string;
    thirdbutton?:boolean;
    filterfields?: any;
    isSearch?: boolean;
    exportExcel?: boolean;
    excelKeys?: any;
    isSearchIndividual?:boolean;
    operationId?:string;
    isCheckBox?: boolean;
    checkboxbuttonname?: string;
    checkboxbutton?: boolean;
    blockDataKey?:any;
    approveRejectKey?:any;
    approveId?:any;
    rejectId?:any;
    isassignKeyUnable?:any;
}