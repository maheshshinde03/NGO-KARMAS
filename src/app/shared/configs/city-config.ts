import { IFormStructure } from "@shared/models/form";
import { RowData } from "@shared/models/table";

export const CityDetailsData: RowData = {
    "headers": [{ label: "Sr.No", key: "SR.NO", type: 'autoIncrementNumber', size: '4%' }, { label: "City  Name", key: "city_name", type: '' },
    { label: "State", key: "state_name", type: '' },
    // { label: "State Code", key: "state_code", type: '' },
    { label: "Country", key: "country_name", type: '' },
    // { label: "Country Code", key: "country_code", type: '' },
    // { label: "city  Status", key: "is_active", type: 'active&inactive' }, 
    { label: "Action", key: "action", type: 'action', size: '8%', buttonNames: ['edit', 'view', 'delete'] }],
    "data": [],
    "dataKey": 'city_id',
    "buttonname": 'Create city ',
    "button": true,
    "statuses": [
        { label: 'false', value: 'danger' },
        { label: 'true', value: 'success' },
    ],
    "filterfields": ['city _name'],
    "isSearch": false
}

export const CityTypeSearchGroup: IFormStructure[] = [
    {
        name: "city_id",
        placeholder: "city Id",
        label: "City Id",
        type: "text",
        value: "",
        hiddenControl: true,
        disable: false
    },
    {
        name: "city_name",
        label: "City Name",
        placeholder: "Enter city",
        type: "text",
        value: "",
        required: true,
        disable: false,
        isUpperCase: true
    },
    {
        name: "state_id",
        label: "State",
        placeholder: "Enter State",
        type: "select",
        value: "",
        required: false,
        disable: false,
        bindValue: 'state_id',
        bindLabel: 'state_name',
        listName: 'state',
        listData: []
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

    }
    // {
    //     name: "city_code",
    //     label: "City Type Code",
    //     placeholder: "Enter city  type code",
    //     type: "text",
    //     value: "",
    //     required: true,
    //     disable: false,
    // }
]