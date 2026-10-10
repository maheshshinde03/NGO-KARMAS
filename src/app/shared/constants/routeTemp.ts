export const AdminMenu = {
    menu: [
        { level: 1, id: 1, path: '/dashboard', title: "Dashboard", icon: "Home", active: true, type: "link" },
        { level: 1, id: 1, path: '/requests', title: "Requests", icon: "Wallet", active: false, type: "link" },
        { level: 1, id: 1, path: '/ngo-requests', title: "Requests", icon: "Wallet", active: false, type: "link" },
        { level: 1, id: 2, path: '/ngo', title: "NGO", icon: "User", active: false, type: "link" },
        // { level: 1, id: 3, path: '/empowerment', title: "Empowerment Call", icon: "Bag", active: false, type: "link" },
        { level: 1, id: 3, path: '/user-master', title: "User-master", icon: "User", active: false, type: "link" },
        {
            "active": false,
            "children": [
                {
                    "active": false,
                    "children": [
                        {
                            "path": "/permission",
                            "title": "Permission",
                            "type": "link"
                        },
                        {
                            "path": "/pages",
                            "title": "Pages",
                            "type": "link"
                        },
                        {
                            "path": "/page-permission",
                            "title": "Pages Permission",
                            "type": "link"
                        },
                        {
                            "path": "/role",
                            "title": "Role",
                            "type": "link"
                        },
                        {
                            "path": "/role-permission",
                            "title": "Role Page permission",
                            "type": "link"
                        },
                        {
                            "path": "/designation-permission",
                            "title": "Designation permission",
                            "type": "link"
                        }
                    ],
                    "level": 2,
                    "title": "Access Control",
                    "type": "sub"
                },
            ],
            "icon": "Setting",
            "id": 2,
            "level": 1,
            "title": "Setting",
            "type": "sub"
        },
        // { level: 1, id: 3, path: '/gift-reward', title: "Gift and Reward", icon: "Wallet", active: false, type: "link" },
        {
            "active": false,
            "badge": true,
            "children": [
                {
                    "path": "/gift-company-master",
                    "title": "Gift Company Master",
                    "type": "link"
                },
                {
                    "path": "/gift-master",
                    "title": "Gift Master",
                    "type": "link"
                },
                {
                    "path": "/coupon-master",
                    "title": "Coupon Master",
                    "type": "link"
                }
            ],
            "icon": "Filter",
            "id": 1,
            "level": 1,
            "title": "Reward Master",
            "type": "sub"
        },
        {
            "active": false,
            "badge": true,
            "children": [
                {
                    "path": "/ngo-block-list",
                    "title": "NGO-block-list",
                    "type": "link"
                },
                // {
                //     "path": "/user-block-list",
                //     "title": "User-block-list",
                //     "type": "link"
                // }
            ],
            "icon": "Filter",
            "id": 1,
            "level": 1,
            "title": "Blocked list",
            "type": "sub"
        },
        {
            "active": false,
            "children": [
                {
                    "path": "/designation-master",
                    "title": "Designation Master",
                    "type": "link"
                },
                {
                    "path": "/ngo-field",
                    "title": "Ngo Working Field Master",
                    "type": "link"
                },
                {
                    "path": "/ngo-type",
                    "title": "Ngo Type Master",
                    "type": "link"
                },
                {
                    "path": "/status-master",
                    "title": "Status Master",
                    "type": "link"
                },
                {
                    "path": "/ngo-designation-master",
                    "title": "Ngo-Designation-Master",
                    "type": "link"
                },
                {
                    "path": "/verify-ngo-register-master",
                    "title": "Verify-ngo-register-master",
                    "type": "link"
                },
                {
                    "active": false,
                    "children": [
                        {
                            "path": "/country",
                            "title": "Country",
                            "type": "link"
                        },
                        {
                            "path": "/state",
                            "title": "State",
                            "type": "link"
                        },
                        {
                            "path": "/district-master",
                            "title": "District",
                            "type": "link"
                        },
                        {
                            "path": "/city-master",
                            "title": "City",
                            "type": "link"
                        },
                    ],
                    "level": 2,
                    "title": "Locality Master",
                    "type": "sub"
                },
            ],
            "icon": "Document",
            "id": 2,
            "level": 1,
            "title": "Master",
            "type": "sub"
        },
        {
            "active": false,
            "badge": true,
            "children": [
                {
                    "path": "/score-board",
                    "title": "Scoreboard",
                    "type": "link"
                },
                {
                    "path": "/score-setting",
                    "title": "Score Setting",
                    "type": "link"
                }
            ],
            "icon": "Wallet",
            "id": 1,
            "level": 1,
            "title": "Score",
            "type": "sub"
        },
        // { level: 1, id: 3, path: '/score-board', title: "Score-Board", icon: "Wallet", active: false, type: "link" },
        // { level: 1, id: 3, path: '/score-setting', title: "Score Setting", icon: "Setting", active: false, type: "link" },
        { level: 1, id: 3, path: '/user-activity', title: "User Activity", icon: "Document", active: false, type: "link" },
        { level: 1, id: 3, path: '/blogs', title: "Blogs", icon: "Document", active: false, type: "link" },
        { level: 1, id: 2, path: '/ngo-user-master', title: "User-Master", icon: "User", active: false, type: "link" },
        { level: 1, id: 2, path: '/donation-master', title: "Donation-Master", icon: "Cash", active: false, type: "link" },

        {
            "active": false,
            "badge": true,
            "children": [
                // {
                //     "path": "/gift-company-master",
                //     "title": "Gift Company Master",
                //     "type": "link"
                // },
                {
                    "path": "/ticket-master",
                    "title": "Ticket-master",
                    "type": "link"
                },
                {
                    "path": "/ticket-module-type-master",
                    "title": "Ticket-module-type-master",
                    "type": "link"
                }
            ],
            "icon": "Ticket",
            "id": 1,
            "level": 1,
            "title": "Ticket Master",
            "type": "sub"
        },
        // { level: 1, id: 4, path: '/awb-entries', title: "AWB Entries", icon: "Show", active: false, type: "link" },
        // { level: 1, id: 5, path: '/manifest', title: "Manifest", icon: "handmade-landing", active: false, type: "link" },
        // // { level: 1, id: 6, path: '/master', title: "Master", icon: "More-box", active: false, type: "link" },
        // {
        //   "active": false,
        //   "children": [
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/customer",
        //           "title": "Customer",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/vendor",
        //           "title": "Vendor",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/vendor-type",
        //           "title": "Vendor Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/shipper",
        //           "title": "Shipper",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/forwarder",
        //           "title": "Forwarder",
        //           "type": "link"
        //         },

        //         {
        //           "path": "/product",
        //           "title": "Product",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/service",
        //           "title": "Service",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/consignee",
        //           "title": "Consignee",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/fsc",
        //           "title": "FSC",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/tat",
        //           "title": "TAT",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/mode",
        //           "title": "Mode",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/flight",
        //           "title": "Flight",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/charge-master",
        //           "title": "Charge master",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/manifest-charge",
        //           "title": "Manifest Charge",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/company-master",
        //           "title": "Company Master",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/currency-master",
        //           "title": "Currency master",
        //           "type": "link"
        //         }


        //       ],
        //       "level": 2,
        //       "title": "Customer/Vendor",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/service-contract",
        //           "title": "Service Contract",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/customer-contract",
        //           "title": "Customer Contract",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/cft-contract",
        //           "title": "CFT Contract",
        //           "type": "link"
        //         }
        //       ],
        //       "level": 2,
        //       "title": "Contracts",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/permission",
        //           "title": "Permission",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/pages",
        //           "title": "Pages",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/page-permission",
        //           "title": "Pages Permission",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/role",
        //           "title": "Role",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/role-permission",
        //           "title": "Role Page permission",
        //           "type": "link"
        //         }
        //       ],
        //       "level": 2,
        //       "title": "Access Control",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/free-form-item",
        //           "title": "Free Form Item",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/free-form-note",
        //           "title": "Free Form Note",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/popup",
        //           "title": "Popup",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/address-book",
        //           "title": "Address Book",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/licence-location",
        //           "title": "License Location",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/department",
        //           "title": "Department",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/rate-attachment",
        //           "title": "Rate Attachment",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/ticket-type",
        //           "title": "Ticket Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/dispatch-type",
        //           "title": "Dispatch Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/dashboard-slider",
        //           "title": "Dashboard Slider",
        //           "type": "link"
        //         }
        //       ],
        //       "level": 2,
        //       "title": "Other",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         // {
        //         //   "path": "/pincode",
        //         //   "title": "Pincode",
        //         //   "type": "link"
        //         // },
        //         {
        //           "path": "/hub-master",
        //           "title": "Hub",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/zone",
        //           "title": "Zone",
        //           "type": "Zone"
        //         },
        //         {
        //           "path": "/country",
        //           "title": "Country",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/state",
        //           "title": "State",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/district-master",
        //           "title": "District",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/city-master",
        //           "title": "City",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/location-master",
        //           "title": "Location",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/pickup-address-master",
        //           "title": "Pickup Address",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/route-master",
        //           "title": "Route Master",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/role-permission",
        //           "title": "TAT Holiday Master",
        //           "type": "link"
        //         }
        //       ],
        //       "level": 2,
        //       "title": "Locality Master",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/expense-type",
        //           "title": "Expense Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/expense-sub-type",
        //           "title": "Expense Sub Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/vehicle-master",
        //           "title": "Vehicle Master",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/voucher-submitted-master",
        //           "title": "Voucher Submitted by Master",
        //           "type": "link"
        //         },
        //       ],
        //       "level": 2,
        //       "title": "Vouchers",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/edi-bag-no",
        //           "title": "EDI Bag No. Master",
        //           "type": "link"
        //         },
        //       ],
        //       "level": 2,
        //       "title": "EDI BAG NO.",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/service-type",
        //           "title": "Service Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/invoice-range",
        //           "title": "Invoice Range",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/custom-invoice",
        //           "title": "Custom Invoice",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/awb-less-invoice",
        //           "title": "AWB Less Invoice",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/free-form-invoice-type",
        //           "title": "Free Form Invoice Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/duty-amount",
        //           "title": "Duty Amount",
        //           "type": "link"
        //         },
        //       ],
        //       "level": 2,
        //       "title": "Invoice Master",
        //       "type": "sub"
        //     },
        //     {
        //       "active": false,
        //       "children": [
        //         {
        //           "path": "/business-type",
        //           "title": "Business Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/lead-type",
        //           "title": "Lead Type",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/lead-status",
        //           "title": "Lead Status",
        //           "type": "link"
        //         },
        //         {
        //           "path": "/type-of-industry",
        //           "title": "Type Of Industry",
        //           "type": "link"
        //         },
        //       ],
        //       "level": 2,
        //       "title": "CRM",
        //       "type": "sub"
        //     },
        //   ],
        //   "icon": "Document",
        //   "id": 2,
        //   "level": 1,
        //   "title": "Master",
        //   "type": "sub"
        // },
        // { level: 1, id: 7, path: '/invoice', title: "Invoices", icon: "Document", active: false, type: "link" },
        // { level: 1, id: 8, path: '/rate-cals', title: "Rate Cals", icon: "Ticket", active: false, type: "link" },
        // { level: 1, id: 9, path: '/report-master', title: "Report", icon: "Document", active: false, type: "link" },
        { level: 1, id: 9, path: '/quotes-master', title: "Quotes", icon: "Document", active: false, type: "link" },
        { level: 1, id: 9, path: '/request-docs-master', title: "Request Docs", icon: "Document", active: false, type: "link" },
        {
            "active": false,
            "badge": true,
            "children": [
                {
                    "path": "/report-master",
                    "title": "Report",
                    "type": "link"
                },
                {
                    "path": "/report-type-master",
                    "title": "Report Type Master",
                    "type": "link"
                },
                {
                    "path": "/report-page-type-master",
                    "title": "Report Page Type Master",
                    "type": "link"
                }
            ],
            "icon": "Document",
            "id": 1,
            "level": 1,
            "title": "Report",
            "type": "sub"
        }, 
    ]
}

export const NgoMenu = {
    menu: [
        { level: 1, id: 1, path: '/dashboard', title: "Dashboard", icon: "Home", active: true, type: "link" },
        // { level: 1, id: 1, path: '/requests', title: "Requests", icon: "Wallet", active: false, type: "link" },
        { level: 1, id: 1, path: '/ngo-requests', title: "Requests", icon: "Wallet", active: false, type: "link" },

        { level: 1, id: 2, path: '/ngo', title: "NGO", icon: "User", active: false, type: "link" },
        { level: 1, id: 2, path: '/ngo-user-master', title: "User-Master", icon: "User", active: false, type: "link" },
        // // { level: 1, id: 3, path: '/empowerment', title: "Empowerment Call", icon: "Bag", active: false, type: "link" },
        // { level: 1, id: 3, path: '/user-master', title: "User-master", icon: "User", active: false, type: "link" },
        //         {
        //     "active": false,
        //     "children": [
        //         {
        //             "active": false,
        //             "children": [
        //             {
        //                 "path": "/permission",
        //                 "title": "Permission",
        //                 "type": "link"
        //             },
        //             {
        //                 "path": "/pages",
        //                 "title": "Pages",
        //                 "type": "link"
        //             },
        //             {
        //                 "path": "/page-permission",
        //                 "title": "Pages Permission",
        //                 "type": "link"
        //             },
        //             {
        //                 "path": "/role",
        //                 "title": "Role",
        //                 "type": "link"
        //             },
        //             {
        //                 "path": "/role-permission",
        //                 "title": "Role Page permission",
        //                 "type": "link"
        //             }
        //             ],
        //             "level": 2,
        //             "title": "Access Control",
        //             "type": "sub"
        //         },
        //     ],
        //     "icon": "Setting",
        //     "id": 2,
        //     "level": 1,
        //     "title": "Setting",
        //     "type": "sub"
        // },
        // // { level: 1, id: 3, path: '/gift-reward', title: "Gift and Reward", icon: "Wallet", active: false, type: "link" },
        // {
        //     "active": false,
        //     "badge": true,
        //     "children": [
        //         {
        //             "path": "/gift-company-master",
        //             "title": "Gift Company Master",
        //             "type": "link"
        //         },
        //         {
        //             "path": "/gift-master",
        //             "title": "Gift Master",
        //             "type": "link"
        //         },
        //         {
        //             "path": "/coupon-master",
        //             "title": "Coupon Master",
        //             "type": "link"
        //         }
        //     ],
        //     "icon": "Filter",
        //     "id": 1,
        //     "level": 1,
        //     "title": "Reward Master",
        //     "type": "sub"
        // },
        // {
        //     "active": false,
        //     "badge": true,
        //     "children": [
        //         {
        //             "path": "/ngo-block-list",
        //             "title": "NGO-block-list",
        //             "type": "link"
        //         },
        //         {
        //             "path": "/user-block-list",
        //             "title": "User-block-list",
        //             "type": "link"
        //         }
        //     ],
        //     "icon": "Filter",
        //     "id": 1,
        //     "level": 1,
        //     "title": "Blocked list",
        //     "type": "sub"
        // },
        // {
        //     "active": false,
        //     "children": [
        //         {
        //             "path": "/designation-master",
        //             "title": "Designation Master",
        //             "type": "link"
        //         },
        //         {
        //             "path": "/ngo-field",
        //             "title": "Ngo Field Master",
        //             "type": "link"
        //         },
        //         {
        //             "path": "/status-master",
        //             "title": "Status Master",
        //             "type": "link"
        //         },
        //         {
        //             "active": false,
        //             "children": [
        //                 {
        //                     "path": "/country",
        //                     "title": "Country",
        //                     "type": "link"
        //                 },
        //                 {
        //                     "path": "/state",
        //                     "title": "State",
        //                     "type": "link"
        //                 },
        //                 {
        //                     "path": "/district-master",
        //                     "title": "District",
        //                     "type": "link"
        //                 },
        //                 {
        //                     "path": "/city-master",
        //                     "title": "City",
        //                     "type": "link"
        //                 },
        //             ],
        //             "level": 2,
        //             "title": "Locality Master",
        //             "type": "sub"
        //         },
        //     ],
        //     "icon": "Document",
        //     "id": 2,
        //     "level": 1,
        //     "title": "Master",
        //     "type": "sub"
        // },
        // {
        //     "active": false,
        //     "badge": true,
        //     "children": [
        //         {
        //             "path": "/score-board",
        //             "title": "Score-Board",
        //             "type": "link"
        //         },
        //         {
        //             "path": "/score-setting",
        //             "title": "Score Setting",
        //             "type": "link"
        //         }
        //     ],
        //     "icon": "Wallet",
        //     "id": 1,
        //     "level": 1,
        //     "title": "Score",
        //     "type": "sub"
        // }
    ]
}

