import { Routes } from '@angular/router';
// import { PermissionGuard } from '@shared/guard/auth.guard';
import { PermissionGuard } from '@shared/guard/permission.guard';

export const dashData: Routes = [
    {
        path: 'dashboard',
        data: {
            title: "Dashboard",
            breadcrumb: "dashboard",
            pageId: 1
        },
        loadChildren: () => import('@modules/dashboard/dashboard.module').then(r => r.DashboardModule),
        canActivate: [PermissionGuard]
    },
    {
        path: 'requests',
        data: {
            title: "Request",
            breadcrumb: "request",
            pageId: 4
        },
        loadChildren: () => import('@modules/operations/requests/requests.module').then(r => r.RequestsModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo',
        data: {
            title: "NGO",
            breadcrumb: "ngo",
            pageId: 5
        },
        loadChildren: () => import('@modules/operations/ngo/ngo.module').then(r => r.NgoModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'user-master',
        data: {
            title: "User",
            breadcrumb: "user",
            pageId: 6
        },
        loadChildren: () => import('@modules/operations/user-master/user-master.module').then(r => r.UserMasterModule),
        // canActivate: [PermissionGuard]
    },
    // SECURITY
    {
        path: 'permission',
        data: {
            title: "Permission",
            breadcrumb: "permission",
            pageId: 7,
        },
        loadChildren: () => import('@modules/masters/access-control/permission/permission.module').then(r => r.PermissionModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'pages',
        data: {
            title: "Pages",
            breadcrumb: "pages",
            pageId: 8,
        },
        loadChildren: () => import('@modules/masters/access-control/pages/pages.module').then(r => r.PagesModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'page-permission',
        data: {
            title: "Page permission",
            breadcrumb: "page-permission",
            pageId: 9,
        },
        loadChildren: () => import('@modules/masters/access-control/page-permission/page-permission.module').then(r => r.PagePermissionModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'role',
        data: {
            title: "Role",
            breadcrumb: "role",
            pageId: 10,
        },
        loadChildren: () => import('@modules/masters/access-control/role/role.module').then(r => r.RoleModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'role-permission',
        data: {
            title: "Role page permission",
            breadcrumb: "role-permission",
            pageId: 11,
        },
        loadChildren: () => import('@modules/masters/access-control/role-page-permission/role-page-permission.module').then(r => r.RolePagePermissionModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'gift-company-master',
        data: {
            title: "Gift Company Master",
            breadcrumb: "Gift Company Master",
            pageId: 12
        },
        loadChildren: () => import('@modules/operations/reward-master/gift-company-master/gift-company-master.module').then(r => r.GiftCompanyMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'gift-master',
        data: {
            title: "Gift Master",
            breadcrumb: "Gift Master",
            pageId: 13
        },
        loadChildren: () => import('@modules/operations/reward-master/gift-master/gift-master.module').then(r => r.GiftMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo-block-list',
        data: {
            title: "NGO Block List",
            breadcrumb: "NGO Block List",
            pageId: 15
        },
        loadChildren: () => import('@modules/operations/ngo-block-list/ngo-block-list.module').then(r => r.NGOBlockListModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'user-block-list',
        data: {
            title: "User Block List",
            breadcrumb: "User Block List",
            pageId: 16
        },
        loadChildren: () => import('@modules/operations/user-block-list/user-block-list.module').then(r => r.USERBlockListModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'designation-master',
        data: {
            title: "city",
            breadcrumb: "city",
            pageId: 17,
        },
        loadChildren: () => import('@modules/masters/designation-master/designation-master.module').then(r => r.DesignationMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo-field',
        data: {
            title: "Ngo Field Master",
            breadcrumb: "Ngo Field Master",
            pageId: 18,
        },
        loadChildren: () => import('@modules/masters/ngo-field-master/ngo-field-master.module').then(r => r.NgoFieldMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'status-master',
        data: {
            title: "Status Master List",
            breadcrumb: "Status Master List",
            pageId: 19
        },
        loadChildren: () => import('@modules/masters/status-master/status-master.module').then(r => r.StatusMasterModule),
        // canActivate: [PermissionGuard]
    },
    // Locality Masters
    {
        path: 'country',
        data: {
            title: "Country",
            breadcrumb: "country",
            pageId: 20,
        },
        loadChildren: () => import('@modules/masters/locality-master/country/country.module').then(r => r.CountryModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'state',
        data: {
            title: "state",
            breadcrumb: "state",
            pageId: 21,
        },
        loadChildren: () => import('@modules/masters/locality-master/state/state.module').then(r => r.StateModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'district-master',
        data: {
            title: "district",
            breadcrumb: "district",
            pageId: 22,
        },
        loadChildren: () => import('@modules/masters/locality-master/district/district.module').then(r => r.DistrictModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'city-master',
        data: {
            title: "city",
            breadcrumb: "city",
            pageId: 23,
        },
        loadChildren: () => import('@modules/masters/locality-master/city/city.module').then(r => r.CityModule),
        // canActivate: [PermissionGuard]
    },
    // {
    //     path: 'page-permission-table',
    //     data: {
    //         title: "Role page permission",
    //         breadcrumb: "role-permission",
    //         pageId: 104,
    //     },
    //     loadChildren: () => import('@modules/masters/access-control/page-permission-table/page-permission-table.module').then(r => r.PagePermissionTableModule),
    //     // canActivate: [PermissionGuard]
    // },
    // {
    //     path: 'empowerment',
    //     data: {
    //         title: "Empowerment Call",
    //         breadcrumb: "empowerment",
    //         pageId:36
    //     },
    //     loadChildren: () => import('@modules/operations/empowerment-call/empowerment-call.module').then(r => r.EmpowermentCallModule),
    //     // canActivate: [PermissionGuard]
    // },
    {
        path: 'score-board',
        data: {
            title: "Score Board",
            breadcrumb: "Score Board",
            pageId: 24
        },
        loadChildren: () => import('@modules/operations/score-boards/score-boards.module').then(r => r.ScoreBoardsModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'score-setting',
        data: {
            title: "Status Master List",
            breadcrumb: "Status Master List",
            pageId: 25
        },
        loadChildren: () => import('@modules/masters/bonus-master/bonus-master.module').then(r => r.BonusMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'user-activity',
        data: {
            title: "User Activity Master",
            breadcrumb: "User Activity Master",
            pageId: 26,
        },
        loadChildren: () => import('@modules/operations/user-activity/user-activity.module').then(r => r.UserActivityModule),
        // canActivate: [PermissionGuard]
    },
    // {
    //     path: 'gift-reward',
    //     data: {
    //         title: "Gift And Reward",
    //         breadcrumb: "Gift And Reward",
    //         pageId:36
    //     },
    //     loadChildren: () => import('@modules/operations/gift-reward/gift-reward.module').then(r => r.GiftRewardModule),
    //     // canActivate: [PermissionGuard]
    // },

    {
        path: 'coupon-master',
        data: {
            title: "Coupon Master",
            breadcrumb: "Coupon Master",
            pageId: 29
        },
        loadChildren: () => import('@modules/operations/reward-master/coupon-master/coupon-master.module').then(r => r.CouponMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'blogs',
        data: {
            title: "Blogs Master",
            breadcrumb: "Blogs Master",
            pageId: 30
        },
        loadChildren: () => import('@modules/masters/blog-master/blog-master.module').then(r => r.BlogMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo-requests',
        data: {
            title: "Ngo Request",
            breadcrumb: "Ngo Request",
            pageId: 31
        },
        loadChildren: () => import('@modules/operations/ngo-requests/ngo-requests.module').then(r => r.NgoRequestsModule),
        // canActivate: [PermissionGuard]
    },

    {
        path: 'ngo-type',
        data: {
            title: "Ngo Type Master",
            breadcrumb: "Ngo Type Master",
            pageId: 35,
        },
        loadChildren: () => import('@modules/masters/ngo-types/ngo-types.module').then(r => r.NgoTypesModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo-user-master',
        data: {
            title: "Ngo User Master",
            breadcrumb: "Ngo User Master",
            pageId: 37,
        },
        loadChildren: () => import('@modules/operations/ngo-user-master/ngo-user-master.module').then(r => r.NgoUserMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo-designation-master',
        data: {
            title: "Ngo Designation Master",
            breadcrumb: "Ngo Designation Master",
            pageId: 38,
        },
        loadChildren: () => import('@modules/masters/ngo-designation-master/ngo-designation-master.module').then(r => r.NgoDesignationMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'donation-master',
        data: {
            title: "Donation Master",
            breadcrumb: "Donation Master",
            pageId: 39,
        },
        loadChildren: () => import('@modules/masters/donation-master/donation-master.module').then(r => r.DonationMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ticket-module-type-master',
        data: {
            title: "Ticket Module Type Master",
            breadcrumb: "Ticket Module Type Master",
            pageId: 40,
        },
        loadChildren: () => import('@modules/masters/ticket-module-type/ticket-module-type.module').then(r => r.TicketModuleTypeModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ticket-master',
        data: {
            title: "Ticket Master",
            breadcrumb: "Ticket Master",
            pageId: 41,
        },
        loadChildren: () => import('@modules/masters/ticket-master/ticket-master.module').then(r => r.TicketMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'verify-ngo-register-master',
        data: {
            title: "Verify Ngo Verification Master",
            breadcrumb: "Verify Ngo Verification Master",
            pageId: 42,
        },
        loadChildren: () => import('@modules/masters/ngo-register-list/ngo-register-list.module').then(r => r.NgoRegisterListModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'report-master',
        data: {
            title: "Report Master",
            breadcrumb: "Report Master",
            // pageId: 44,
            pageId: 48,
        },
        loadChildren: () => import('@modules/masters/report-master/report-master.module').then(r => r.ReportMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'quotes-master',
        data: {
            title: "Quotes Master",
            breadcrumb: "Quotes Master",
            pageId: 45,
        },
        loadChildren: () => import('@modules/masters/quotes-master/quotes-master.module').then(r => r.QuotesMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'profile-master',
        data: {
            title: 'Profile Master',
            breadcrumb: 'Profile Master',
            pageId: 46,
        },
        loadComponent: () =>
            import('@modules/masters/profile-master/profile-master.component')
                .then(c => c.ProfileMasterComponent),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'ngo-profile-master',
        data: {
            title: 'Ngo Profile Master',
            breadcrumb: 'Ngo Profile Master',
            pageId: 47,
        },
        loadComponent: () =>
            import('@modules/masters/ngo-profile-master/ngo-profile-master.component')
                .then(c => c.NgoProfileMasterComponent),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'request-docs-master',
        data: {
            title: 'Request Documents Master',
            breadcrumb: 'Request Documents Master',
            pageId: 45,
        },
        loadChildren: () => import('@modules/masters/request-documents/request-documents.module').then(r => r.RequestDocumentsModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'designation-permission',
        data: {
            title: 'Designation Permission Master',
            breadcrumb: 'Designation Permission Master',
            pageId: 46,
        },
        loadChildren: () => import('@modules/masters/access-control/designation-permission/designation-permission.module').then(r => r.DesignationPermissionModule),
        // canActivate: [PermissionGuard]
    },


    // {
    //     path: 'profile-master',
    //     data: {
    //         title: "Profile Master",
    //         breadcrumb: "Profile Master",
    //         pageId: 46,
    //     },
    //     loadChildren: () => import('@modules/masters/profile-master/profile-master.component').then(r => r.ProfileMasterComponent),
    //     // canActivate: [PermissionGuard]
    // },

    {
        path: 'report-type-master',
        data: {
            title: "Report Type Master",
            breadcrumb: "Report Type Master",
            // pageId: 44,
            pageId: 49,
        },
        loadChildren: () => import('@modules/masters/report-type-master/report-type-master.module').then(r => r.ReportTypeMasterModule),
        // canActivate: [PermissionGuard]
    },
    {
        path: 'report-page-type-master',
        data: {
            title: "Report Page Type Master",
            breadcrumb: "Report Page Type Master",
            // pageId: 44,
            pageId: 50,
        },
        loadChildren: () => import('@modules/masters/report-page-type-master/report-page-type-master.module').then(r => r.ReportPageTypeMasterModule),
        // canActivate: [PermissionGuard]
    },

]