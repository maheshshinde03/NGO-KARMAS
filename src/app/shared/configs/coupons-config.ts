import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

/**
 * Table configuration for displaying coupon data
 */
export const CouponsDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Coupon Code", key: "coupon_code", type: "text" },
    { label: "Expiry Date", key: "expiry_date", type: "date" },
    { label: "Redeem Date", key: "redeem_date", type: "date" },
    { label: "Status", key: "status_name", type: "statuses" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "coupon_id",
  buttonname: "Create Coupon",
  button: true,
  statuses: [
    { label: 'Ticket Completed', value: 'success' },
    { label: 'Redeemed', value: 'danger' }
  ],
  filterfields: ["coupon_code"],
  isSearch: true
};

/**
 * Form structure for creating, editing, viewing coupon data
 */
export const CouponsFormStructure: IFormStructure[] = [
  {
    name: "gift_master_id",
    label: "Gift",
    placeholder: "Select Gift",
    type: "select",
    value: "",
    listName: "gift_list", // used to fetch gifts for dropdown
    listData: "",
    bindLabel: "gift_name",
    bindValue: "gift_master_id",
    required: true,
    disable: false
  },
  {
    name: "coupon_code",
    label: "Coupon Code",
    placeholder: "Enter Coupon Code",
    type: "text",
    value: "",
    required: true,
    disable: false,
    maxLength: 45
  },
  {
    name: "expiry_date",
    label: "Expiry Date",
    placeholder: "Select Expiry Date",
    type: "date",
    minDate: new Date().toISOString(),
    value: "",
    required: true,
    disable: false
  },
  {
    name: "redeem_date",
    label: "Redeem Date",
    placeholder: "Select Redeem Date",
    type: "date",
    minDate: new Date().toISOString(),
    value: "",
    required: false,
    disable: false
  }
];
