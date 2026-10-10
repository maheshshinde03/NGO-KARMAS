import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const OtherRequestDetailsData: RowData = {
  headers: [
    { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
    { label: "Job No.", key: "job_no", type: '' },
    { label: "Service Name", key: "service_name", type: '' },
    { label: "Quantity", key: "quantity", type: '' },
    { label: "From date", key: "start_datetime", type: '' },
    { label: "To date", key: "end_datetime", type: '' },
    { label: "Remarks", key: "remark", type: '' },
    // { label: "Submitted On", key: "request_status", type: 'active&inactive' },
    { label: "Status", key: "status_name", type: 'statuses' },
    // { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
  ],
  data: [],
  dataKey: 'service_request_id',
  buttonname: 'Add Service',
  button: true,
  statuses: [
    { label: 'false', value: 'danger' },
    { label: 'true', value: 'success' }
  ],
  filterfields: ['job_no', 'service_name','start_datetime','end_datetime'],
  isSearch: false
};


export const OtherRequestSearchGroup: IFormStructure[] = [
  
  {
      name: "service_sub_type",
      label: "Service Name",
      placeholder: "Enter Service",
      type: "text",
      value: "",
      required: true,
      disable: false,
  },
  {
    name: "agent_job_id",
    placeholder: "Rquest Id",
    label: "Request Id",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: false
  },
  // {
  //   name: "service_sub_type",
  //   label: "Service Sub Type",
  //   placeholder: "Enter Sub Type",
  //   type: "text",
  //   value: "",
  //   required: true,
  //   disable: false,
  // },
  {
    name: "unit_id",
    label: "Unit",
    placeholder: "Enter Unit",
    type: "select",
    value: "",
    bindValue: 'unit_id',
    bindLabel: 'unit_name',
    listName: 'unit_id',
    required: true,
    disable: false,
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "Enter Quantity",
    type: "number",
    value: "",
    required: true,
    disable: false,
  },
  {
    name: "start_datetime",
    label: "Start Date",
    placeholder: "Enter start date",
    type: "date-time",
    value: "",
    required: true,
    disable: false,
  },
  {
      name: "end_datetime",
      label: "End Date",
      placeholder: "Enter end date",
      type: "date-time",
      value: "",
      required: true,
      disable: false,
  },
  {
      name: "no_of_km",
      label: "Number Of KM",
      placeholder: "Enter no km",
      type: "number",
      value: "",
      required: false,
      disable: false,
      hiddenControl: true
  },
  {
      name: "remarks",
      label: "Remarks",
      placeholder: "Enter Remarks",
      type: "text",
      value: "",
      required: false,
      disable: false,
  },
]