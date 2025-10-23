// Application constants

export const APP_NAME = 'Impact Story Builder'
export const APP_DESCRIPTION = 'Empowering non-profits to share their impact stories'

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
  VOLUNTEER: 'volunteer',
} as const

// Beneficiary statuses
export const BENEFICIARY_STATUSES = {
  ACTIVE: 'active',
  GRADUATED: 'graduated',
  INACTIVE: 'inactive',
} as const

// Report types
export const REPORT_TYPES = {
  DONOR: 'donor',
  GRANT: 'grant',
  BOARD: 'board',
  SOCIAL: 'social',
} as const

// Date formats
export const DATE_FORMATS = {
  FULL: 'MMMM d, yyyy',
  SHORT: 'MMM d, yyyy',
  YEAR_MONTH: 'MMMM yyyy',
  ISO: 'yyyy-MM-dd',
} as const

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  BENEFICIARIES: '/beneficiaries',
  STORIES: '/stories',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  ORGANIZATION: '/organization',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    RESET_PASSWORD: '/auth/reset-password',
    CALLBACK: '/auth/callback',
  },
} as const

