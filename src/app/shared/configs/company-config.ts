import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';

export const CompanyDetailsData: RowData = {
    headers: [
        { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
        { label: "Company Name", key: "company_name", type: '' },
        { label: "Code", key: "code", type: '' },
        { label: "Email Id", key: "email_id", type: '' },
        { label: "Contact No", key: "contact_no", type: '' },
        { label: "Website", key: "website", type: '' },
        { label: "Address", key: "address", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    data: [],
    dataKey: 'company_id',
    buttonname: 'Create Company',
    button: false,
    statuses: [],
    filterfields: ['company_name', 'website'],
    isSearch: false
};

export const CompanyBankDetailsData: RowData = {
    headers: [
        { label: "SR NO", key: "SR.NO", type: 'autoIncrementNumber', size: '5%' },
        { label: "Account Name", key: "account_name", type: '' },
        { label: "Account No.", key: "account_number", type: '' },
        { label: "Bank Name", key: "bank_name", type: '' },
        { label: "IFSC", key: "ifsc_code", type: '' },
        { label: "Is Default", key: "is_default", type: 'statusesYesNo' },
        // { label: "Website", key: "file_name", type: '' },
        { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }
    ],
    data: [],
    dataKey: 'company_bank_id',
    buttonname: 'Add Bank',
    button: true,
    statuses: [],
    filterfields: ['company_name', 'website'],
    isSearch: false
};

export const CompanySearchGroup: IFormStructure[] = [
    {
        name: "company_id",
        label: "Company Id",
        placeholder: "Enter company id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "company_name",
        label: "Company Name",
        placeholder: "Enter company name",
        type: "text",
        value: "",
        disable: false,
        isUpperCase:true
    },
    {
        name: "code",
        label: "Code",
        placeholder: "Enter code",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "email_id",
        label: "Email Id",
        placeholder: "Enter email id",
        type: "text",
        value: "",
        disable: false,
        validationFor:'email'
    },
    {
        name: "contact_no",
        label: "Contact Number",
        placeholder: "Enter contact no",
        type: "text",
        value: "",
        required:true,
        disable: false,
        validationFor:'contact'
    },
    {
        name: "fax_no",
        label: "Fax No",
        placeholder: "Enter nextPort",
        type: "number",
        value: "",
        disable: false,
    },
    {
        name: "website",
        label: "Website",
        placeholder: "Enter website",
        type: "text",
        value: "",
        required:true,
        disable: false,
    },
    {
        name: "tracking_url",
        label: "Tracking URL",
        placeholder: "Enter tracking url",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "redirect_url",
        label: "Redirect URL",
        placeholder: "Enter redirect url",
        type: "text",
        value: "",
        disable: false,
    },
    {
        name: "country_id",
        label: "Country",
        placeholder: "Enter Country",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'country_id',
        bindLabel: 'country_name',
        listName: 'country',
        listData: []
    },
    {
        name: "state_id",
        label: "State",
        placeholder: "Enter State",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'state_id',
        bindLabel: 'state_name',
        listName: 'state',
        listData: []
    },
    {
        name: "city_id",
        label: "City",
        placeholder: "Enter City",
        type: "select",
        value: "",
        required: true,
        disable: false,
        bindValue: 'city_id',
        bindLabel: 'city_name',
        listName: 'city',
        listData: []

    },
    {
        name: "address",
        label: "Address",
        placeholder: "Enter address",
        type: "text",
        value: "",
        required:true,
        disable: false,
        maxLength:100
    },
    {
        name: "address_1",
        label: "Address 1",
        placeholder: "Enter Address 1",
        type: "text",
        value: "",
        required:true,
        disable: false,
        maxLength:100
    },
    {
        name: "address_2",
        label: "Address 2",
        placeholder: "Enter Address 2",
        type: "text",
        value: "",
        required:false,
        disable: false,
        maxLength:100
    },
    {
        name: "pincode",
        label: "Pincode",
        placeholder: "Enter pincode",
        type: "number",
        value: "",
        required:true,
        disable: false,
    },
    {
        name: "pan_number",
        label: "Pan Number",
        placeholder: "Enter pan number",
        type: "text",
        value: "",
        isUpperCase:true,
        disable: false,
        validationFor:'pan_no'
    },
    {
        name: "cin_number",
        label: "CIN Number",
        placeholder: "Enter cin number",
        type: "text",
        value: "",
        maxLength:21,
        isUpperCase:true,
        disable: false,
    },
    {
        name: "trn_number",
        label: "TRN Number",
        placeholder: "Enter trn number",
        type: "text",
        value: "",
        isUpperCase:true,
        disable: false,
    },
    {
        name: "gstin_vat_number",
        label: "GSTIN Vat Number",
        placeholder: "Enter gstin vat number",
        type: "text",
        value: "",
        isUpperCase:true,
        disable: false,
    },
    {
        name: "sac_code",
        placeholder: "SAC Code",
        label: "SAC Code",
        disable: false,
        type: "text",
        value: "",
        isUpperCase:true,
        required: false,
    },
    // {
    //     name: "blank",
    //     label: "Blank",
    //     placeholder: "Enter blank",
    //     type: "blank",
    //     value: "",
    //     disable: false,
    // },
    {
        name: "logo_path_name",
        label: "logo_path_name",
        placeholder: "logo_path_name",
        type: "blank",
        value: "",
        hiddenControl:true,
        disable: false,
    },
    {
        name: "logo_path",
        label: "logo_path",
        placeholder: "logo_path",
        type: "blank",
        value: null,
        hiddenControl:true,
        disable: false,
    },
    {
        name: "logo_file",
        label: "LOGO",
        placeholder: "Select logo",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64:true,
        formConfigUpload: [
            {
                name: "logo_file",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Logo.</h6></div>',
                dropzoneConfig: {
                    clickable: true,
                    url: 'https://httpbin.org/post',
                    addRemoveLinks: true,
                    parallelUploads: 1,
                    acceptedFiles: '.jpg,.jpeg,.png,.pdf',
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-6'
    },
    {
        name: "digital_signature_path_name",
        label: "logo_path_name",
        placeholder: "logo_path_name",
        type: "blank",
        value: "",
        hiddenControl:true,
        disable: false,
    },
    {
        name: "digital_signature_path",
        label: "logo_path",
        placeholder: "logo_path",
        type: "blank",
        value: null,
        hiddenControl:true,
        disable: false,
    },
    {
        name: "digital_signature_file",
        label: "Digital Signature Path",
        placeholder: "Select digital signature path",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64:true,
        formConfigUpload: [
            {
                name: "digital_signature_file",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Digital Signature.</h6></div>',
                dropzoneConfig: {
                    clickable: true,
                    url: 'https://httpbin.org/post',
                    addRemoveLinks: true,
                    parallelUploads: 1,
                    acceptedFiles: '.jpg,.jpeg,.png,.pdf',
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-6'
    },
    {
        name: "stamp_path_name",
        label: "stamp_path_name",
        placeholder: "stamp_path_name",
        type: "blank",
        value: "",
        hiddenControl:true,
        disable: false,
    },
    {
        name: "stamp_path",
        label: "stamp_path",
        placeholder: "stamp_path",
        type: "blank",
        value: null,
        hiddenControl:true,
        disable: false,
    },
    {
        name: "stamp_file",
        label: "Stamp Path",
        placeholder: "Select stamp path",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64:true,
        formConfigUpload: [
            {
                name: "stamp_file",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Stamp.</h6></div>',
                dropzoneConfig: {
                    clickable: true,
                    url: 'https://httpbin.org/post',
                    addRemoveLinks: true,
                    parallelUploads: 1,
                    acceptedFiles: '.jpg,.jpeg,.png,.pdf',
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-6'
    },
    {
        name: "authorization_letter_path_name",
        label: "authorization_letter_path_name",
        placeholder: "authorization_letter_path_name",
        type: "blank",
        value: "",
        hiddenControl:true,
        disable: false,
    },
    {
        name: "authorization_letter_path",
        label: "authorization_letter_path",
        placeholder: "authorization_letter_path",
        type: "blank",
        value: null,
        hiddenControl:true,
        disable: false,
    },
    {
        name: "authorization_letter_file",
        label: "Authorization Letter Path",
        placeholder: "Select authorization letter path",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64:true,
        formConfigUpload: [
            {
                name: "authorization_letter_file",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Authorization Letter.</h6></div>',
                dropzoneConfig: {
                    clickable: true,
                    url: 'https://httpbin.org/post',
                    addRemoveLinks: true,
                    parallelUploads: 1,
                    acceptedFiles: '.jpg,.jpeg,.png,.pdf',
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-6'
    }
]

export const CompanyBankSearchGroup: IFormStructure[] = [
    {
        name: "company_id",
        label: "Company Id",
        placeholder: "Enter company id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "account_name",
        label: "Account Name",
        placeholder: "Enter account_name",
        type: "text",
        value: "",
        disable: false,
        colsize:'col-6'
    },
    {
        name: "account_number",
        label: "Account Number",
        placeholder: "Enter account_number",
        type: "text",
        value: "",
        disable: false,
        colsize:'col-6'
    },
    {
        name: "bank_name",
        label: "Bank Name",
        placeholder: "Enter bank_name",
        type: "text",
        value: "",
        disable: false,
        colsize:'col-6'
    },
    {
        name: "is_default",
        label: "Is Default",
        placeholder: "Is Default",
        type: "select",
        value: "",
        bindValue: 'id',
        bindLabel: 'name',
        listName: 'yesno',
        disable: false,
        colsize:'col-6'
    },
    {
        name: "ifsc_code",
        label: "IFSC Code",
        placeholder: "Enter ifsc_code",
        type: "text",
        value: "",
        disable: false,
        colsize:'col-6'
    },
    {
        name: "bank_swift_id",
        label: "Swift Code",
        placeholder: "Enter Swift Id",
        type: "text",
        value: "",
        disable: false,
        colsize:'col-6'
    },
    {
        name: "upi_image_path_file",
        label: "Bank Passbook",
        placeholder: "Select Bank Passbook",
        type: "upload",
        value: "",
        required: false,
        disable: false,
        requireBase64:true,
        formConfigUpload: [
            {
                name: "upi_image_path_file",
                type: 'EXCEL',
                required: true,
                disable: false,
                text: ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><h6>Upload Bank Passbook.</h6></div>',
                dropzoneConfig: {
                    clickable: true,
                    url: 'https://httpbin.org/post',
                    addRemoveLinks: true,
                    parallelUploads: 1,
                    acceptedFiles: '.jpg,.jpeg,.png,.pdf',
                    maxFiles: 1
                }
            }
        ],
        colsize: 'col-12'
    }

]