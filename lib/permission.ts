import {
    LucideIcon,
    Store, ShoppingCart, Users2, LayoutDashboard,
    FileText, UserCog, CalendarDays, BarChart2,
  } from 'lucide-react';
  
  
  export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    permission?: string;
    items?: NavSubItem[];
  }
  
  export interface NavSubItem {
    title: string;
    url: string;
    permission?: string;
    items?: NavSubItem[];
  }
  
  export const PERMISSIONS = {
    DASHBOARD: { VIEW: 'dashboard:view' },
    PRODUCTS: {
      VIEW: 'products:view',
      ITEMS: { 
        VIEW: 'products:items:view',
        CREATE: 'products:items:create',
        UPDATE: 'products:items:update'
       },
    },
    ORDERS: {
      VIEW: 'orders:view',
      CREATE: 'orders:create',
      UPDATE: 'orders:update',
    },
    DEALERS: {
      VIEW: 'dealers:view',
      DEALER: { VIEW: 'dealers:dealer:view' },
      MARKET_DAYS: { VIEW: 'dealers:market_days:view' },
    },
    SALESMAN: {
      VIEW: 'salesman:view',
      TODAY: { VIEW: 'salesman:today:view' },
      VISITS: { VIEW: 'salesman:visits:view' },
      MANAGE: { VIEW: 'salesman:manage:view' },
    },
    BILLING: { VIEW: 'billing:view', CREATE: 'billing:create' },
    REPORTS: {
      VIEW: 'reports:view',
      ORDERS: { VIEW: 'reports:orders:view' },
      EXPORT: 'reports:export',
    },
    STAFF: {
      VIEW: 'staff:view',
      PERMISSIONS: { MANAGE: 'staff:permissions:manage' },
    },
  }
  
  // Navigation configuration using the permissions
  export const navigationItems: NavItem[] = [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        title: 'Products',
        url: '/products',
        icon: Store,
        permission: PERMISSIONS.PRODUCTS.VIEW,
        items: [
          {
            title: 'Items',
            url: '/products/items',
            permission: PERMISSIONS.PRODUCTS.ITEMS.VIEW,
          },
        ],
      },
      {
        title: 'Orders',
        url: '/orders',
        icon: ShoppingCart,
        permission: PERMISSIONS.ORDERS.VIEW,
        items: [
          {
            title: 'All orders',
            url: '/orders',
            permission: PERMISSIONS.ORDERS.VIEW,
          },
          {
            title: 'Today\'s orders',
            url: '/orders/today',
            permission: PERMISSIONS.ORDERS.VIEW,
          },
        ],
      },
      {
        title: 'Dealers',
        url: '/dealers',
        icon: Users2,
        permission: PERMISSIONS.DEALERS.VIEW,
        items: [
          {
            title: 'All dealers',
            url: '/dealers',
            permission: PERMISSIONS.DEALERS.DEALER.VIEW,
          },
          {
            title: 'Market days',
            url: '/dealers/market-days',
            permission: PERMISSIONS.DEALERS.MARKET_DAYS.VIEW,  // wholesaler only
          },
        ],
      },
      {
        title: 'Salesman',
        url: '/salesman',
        icon: CalendarDays,
        permission: PERMISSIONS.SALESMAN.VIEW,
        items: [
          {
            title: 'Today\'s market',
            url: '/salesman/today',
            permission: PERMISSIONS.SALESMAN.TODAY.VIEW,
          },
          {
            title: 'Visit log',
            url: '/salesman/visits',
            permission: PERMISSIONS.SALESMAN.VISITS.VIEW,
          },
          {
            title: 'All salesmen',
            url: '/salesman/manage',
            permission: PERMISSIONS.SALESMAN.MANAGE.VIEW,  // wholesaler only
          },
        ],
      },
      {
        title: 'Billing',
        url: '/billing',
        icon: FileText,
        permission: PERMISSIONS.BILLING.VIEW,  // wholesaler only
        items: [
          {
            title: 'Generate bill',
            url: '/billing/generate',
            permission: PERMISSIONS.BILLING.CREATE,
          },
          {
            title: 'History',
            url: '/billing/history',
            permission: PERMISSIONS.BILLING.VIEW,
          },
        ],
      },
      {
        title: 'Reports',
        url: '/reports',
        icon: BarChart2,
        permission: PERMISSIONS.REPORTS.VIEW,  
        items: [
          {
            title: 'Orders report',
            url: '/reports/orders',
            permission: PERMISSIONS.REPORTS.ORDERS.VIEW,
          },
          {
            title: 'Export (Excel)',
            url: '/reports/export',
            permission: PERMISSIONS.REPORTS.EXPORT,
          },
        ],
      },
      {
        title: 'Staff & access',
        url: '/staff',
        icon: UserCog,
        permission: PERMISSIONS.STAFF.VIEW, 
        items: [
          {
            title: 'Team members',
            url: '/staff',
            permission: PERMISSIONS.STAFF.VIEW,
          },
          {
            title: 'Roles & permissions',
            url: '/staff/permissions',
            permission: PERMISSIONS.STAFF.PERMISSIONS.MANAGE,
          },
        ],
      },
  ];
  
  // Route permissions mapping
  export const ROLE_PERMISSIONS: Record<string, string[]> = {
    wholesaler: [
      'dashboard:view',
      'products:view', 'products:items:view','products:items:update','products:items:create',
      'orders:view', 'orders:create', 'orders:update',
      'dealers:view', 'dealers:dealer:view', 'dealers:market_days:view',
      'salesman:view', 'salesman:today:view', 'salesman:visits:view', 'salesman:manage:view',
      'billing:view', 'billing:create',
      'reports:view', 'reports:orders:view', 'reports:export',
      'staff:view', 'staff:permissions:manage',
      'settings:view',
    ],
    dealer: [
      'dashboard:view',
      'products:view', 'products:items:view',
      'orders:view',
    ],
    salesman: [
      'dashboard:view',
      'orders:view',
      'salesman:view', 'salesman:today:view', 'salesman:visits:view',
    ],
    warehouse: [
      'dashboard:view',
      'orders:view', 'orders:dispatch:view',
    ],
  }
  
  /**
   * Permission checking utility (synchronous)
   * Use this when you already have permissions array
   * Safe to use in middleware (Edge runtime)
   */
//   export function checkPermission(
//     userPermissions: string[],
//     requiredPermission: string | undefined
//   ): boolean {
//     if (!requiredPermission) {
//       return false;
//     }
  
//     // If user has wildcard permission, allow everything
//     if (userPermissions.includes('*')) {
//       return true;
//     }
  
//     // Check for exact permission match
//     if (userPermissions.includes(requiredPermission)) {
//       return true;
//     }
  
//     // Check for wildcard matches (e.g., "catalog:*" matches "catalog:view")
//     const [resource] = requiredPermission.split(':');
//     if (userPermissions.includes(`${resource}:*`)) {
//       return true;
//     }
  
//     return false;
//   }
  
