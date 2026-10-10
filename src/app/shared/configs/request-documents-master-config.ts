import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const RequestDocumentMasterData: RowData = {
  headers: [
    { label: "Sr.No", key: "SR.NO", type: "autoIncrementNumber", size: "5%" },
    { label: "Documents Type", key: "document_type", type: "" },
    // { label: "Is Active", key: "is_active", type: "convertboolean" },
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
  ],
  data: [],
  dataKey: 'document_type_id', // Make sure this matches your backend's primary key
  buttonname: 'Add Document Type',
  button: true,
  statuses: [
    { label: 'Inactive', value: 'danger' },
    { label: 'Active', value: 'success' },
  ],
  filterfields: ['document_type'],
  isSearch: false
};

export const RequestDocumentMasterFormGroup: IFormStructure[] = [
  {
    name: "document_type_id",
    label: "d",
    placeholder: "Auto Generated",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: true
  },
  {
    name: "document_type",
    label: "Document Type",
    placeholder: "Document Type",
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
