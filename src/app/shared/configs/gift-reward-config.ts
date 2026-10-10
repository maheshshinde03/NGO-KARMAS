import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const GiftAndRewardsDetailsData: RowData = {
    "headers": [
        { label: "SR.NO", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' },
        // { label: "Parent ID", key: "parent_id", type: 'number' },
        { label: "User Name", key: "user_name", type: 'text' },
        { label: "User ID", key: "user_id", type: 'text' },
        { label: "Gender", key: "gender", type: 'text' },
        { label: "Total Request No.", key: "total_request_no", type: 'text' },
        { label: "Total Score", key: "total_score", type: 'text' },
        { label: "Total Reward No. ", key: "total_reward_no", type: 'text' },
        { label: "Status ", key: "status", type: 'text' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    "data": [],
    "dataKey": 'page_id',
    "buttonname": 'Create Score-Board',
    "button": true,
    "statuses": [
        { label: 'inactive', value: 'danger' },
        { label: 'active', value: 'success' }
    ],
    "filterfields": ['parent_id', 'page_name', 'page_url', 'mobile_url'],
    "isSearch": false
}

export const GiftAndRewardsFormStructure: IFormStructure[] = [
    {
        name: "user_name",
        label: "User Name",
        placeholder: "Enter User Name",
        type: "text",
        value: "",
        required: true,
        disable: false,
        maxLength: 100
    },
    {
        name: "user_id",
        label: "User Id",
        placeholder: "Enter User Id",
        type: "text",
        value: "",
        required: true,
        disable: false,
        maxLength: 100
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Enter Gender",
        type: "select",
        value: "",
        listData:'',
        listName:'gender',
        bindLabel:'gender',
        bindValue:'value',
        required: true,
        disable: false,
        maxLength: 100
    },
    {
        name: "upload_photo",
        label: "Upload Photo",
        placeholder: "Upload Photo",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64: true,
        formConfigUpload: [
            {
                name: "upload_photo",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload File.</h6></div>',
                dropzoneConfig: {
                    clickable: true,
                    url: 'https://httpbin.org/post',
                    addRemoveLinks: true,
                    parallelUploads: 1,
                    acceptedFiles: '.jpg,.jpeg,.pdf,.png',
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-12'
    },
]
