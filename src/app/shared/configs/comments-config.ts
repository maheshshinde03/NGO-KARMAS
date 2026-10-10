import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';

export const CommentsDetailsData: RowData = {
  headers: [
    { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
    { label: "Comments", key: "comment", type: '' },
    { label: "Date & Time", key: "date", type: '' },
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
  ],
  data: [],
  dataKey: 'comment_id',
  buttonname: 'Add Comment',
  button: false,
  statuses: [],
  filterfields: ['user', 'comment'],
  isSearch: false
};

export const commentSearchGroup: IFormStructure[] = [
  {
    name: "comment_id",
    label: "Comment Id",
    placeholder: "Enter comment id",
    type: "text",
    value: "",
    hiddenControl: true,
    disable: false
  },
  {
    name: "internal_comment",
    label: "Internal Comments",
    placeholder: "Enter internal comments",
    type: "textarea",
    value: "",
    disable: false,
    colsize: 'col-12'
  },
  {
    name: "external_comment",
    label: "External Comments",
    placeholder: "Enter External Comments",
    type: "textarea",
    value: "",
    disable: false,
    colsize: 'col-12'
  }
]