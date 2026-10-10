export const Roles = {
    Admin: '1',
    Agent: '2',
    Operator: '3'
    // Add more roles as needed
};

export enum Permissions {
    ViewDashboard = 'dashboard',
    EditVendor = 'vendor',
    ViewVendorType = 'vendor-type',
    ViewAgent = 'agent',
    ViewCountry = 'country',
    ViewService = 'service',
    ViewServiceType = 'service_type',
    ViewServiceSubtype = 'service_subtype',
    ViewPermission = 'permission',
    ViewPages = 'pages',
    ViewPagePermission = 'page_permission',
    ViewRole = 'role',
    ViewRolePagePermission = 'role_page_permission',
}