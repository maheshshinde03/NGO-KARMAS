import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const TicketMasterData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
    { label: "Ticket Code", key: "ticket_code", type: '' },
    { label: "Subject", key: "subject", type: '' },
    { label: "Description", key: "description", type: '' },
    {
      label: "Action",
      key: "action",
      type: "action",
      size: "8%",
      buttonNames: ["edit", "view", "delete"]
    }
  ],
  data: [],
  dataKey: 'ticket_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Ticket',
  button: false,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['create_score', 'score_category', 'status_name'],
  isSearch: false
};

export const TicketMasterFormGroup: IFormStructure[] = [
  {
    name: "ticket_code",
    label: "Ticket Code",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: false,
    disable: true
  },
  {
    name: "module_name",
    label: "Module",
    placeholder: "Enter Subject",
    type: "text",
    value: "",
    required: false,
    disable: true
  },
  {
    name: "assigned_full_name",
    label: "Assigned",
    placeholder: "Enter",
    type: "text",
    value: "",
    required: false,
    disable: false
  },
  {
    name: "subject",
    label: "Subject",
    placeholder: "Enter Subject",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "is_active",
    label: "Is Active",
    placeholder: "Select status",
    type: "select",
    value: "1",
    required: false,
    disable: false,
    listName: "active_status",
    listData: ["1", "0"],
    bindValue: "status_id",
    bindLabel: "name"
  }
];
