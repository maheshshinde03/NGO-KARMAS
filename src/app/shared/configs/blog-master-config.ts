import { RowData } from "@shared/models/table";
import { IFormStructure } from "@shared/models/form";

/**
 * Table configuration for Bonus Master listing
 */
export const BlogMasterDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "Title", key: "title", type: "text" },
    { label: "Content", key: "content", type: "" },
    { label: "Total Likes", key: "total_likes", type: "" },
    { label: "Total Comments", key: "total_comments", type: "" },
    { label: "Created At", key: "created_at", type: "date&time" },
    { label: "Action", key: "action", type: "action", size: "8%", buttonNames: ["edit", "view", "delete"] }
  ],
  data: [],
  dataKey: "blog_id",
  buttonname: "Create Blog",
  button: true,
  statuses: [],
  filterfields: ["content", "title","total_likes","total_comments"],
  isSearch: true
};

/**
 * Form configuration for Blog Master create/edit/view
 */
export const BlogMasterFormStructure: IFormStructure[] = [
   {
    name: "blog_id",
    label: "Blog ID",
    placeholder: "Enter Blog ID",
    type: "hidden",
    value: "",
    required: false,
    disable: true,
    maxLength: 20,
    hiddenControl: true
   },
   {
    name: "title",
    label: "Title",
    placeholder: "Enter Title",
    type: "text",
    value: "",
    required: true,
    disable: false
  },
  {
    name: "content",
    label: "Content",
    placeholder: "Enter Content",
    type: "text",
    value: "",
    required: true,
    disable: false
  }
];
