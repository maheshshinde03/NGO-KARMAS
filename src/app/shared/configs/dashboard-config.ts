import { RowData } from "@shared/models/table";


export const shipData: RowData = {
    headers: [
        { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Job No", key: "job_no", type: '' },
        { label: "Ship", key: "ship_name", type: '' },
        { label: "Port Call", key: "port_call_no", type: '' },
        { label: "Vessel Name", key: "ship_name", type: '' },
        { label: "Actual Arr. date", key: "actual_arrival_date", type: 'date&time' },
        { label: "Actual Dep. date", key: "actual_departure_date", type: 'date&time' },
    ],
    data: [],
    dataKey: 'job_no',
    buttonname: 'Add header',
    button: false,
    statuses: [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' }
    ],
    filterfields: ['port_call_no'],
    isSearch: false
};

export const serviceData: RowData = {
    headers: [
        { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "Job No", key: "job_no", type: '' },
        { label: "Service Name", key: "service_name", type: '' },
        { label: "Service Sub Type", key: "service_sub_type", type: '' },
        { label: "Start Date And Time", key: "start_datetime", type: 'date&time' },
        { label: "End Date And Time", key: "end_datetime", type: 'date&time' },
    ],
    data: [],
    dataKey: 'job_no',
    buttonname: 'Add header',
    button: false,
    statuses: [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' }
    ],
    filterfields: ['port_call_no'],
    isSearch: false
};

export const passengerData: RowData = {
    headers: [
        { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        { label: "First Name", key: "first_name", type: '' },
        { label: "Last Name", key: "last_name", type: '' },
        { label: "Document Number", key: "document_no", type: '' },
        { label: "Gender", key: "gender", type: '' },
        { label: "Status", key: "status_name", type: '' },
    ],
    data: [],
    dataKey: 'job_no',
    buttonname: 'Add header',
    button: false,
    statuses: [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' }
    ],
    filterfields: ['port_call_no'],
    isSearch: false
};