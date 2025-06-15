// API Types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
  success: boolean
}

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  created_at: string
  updated_at: string
  last_login?: string
  permissions: string[]
}

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'staff'
export type UserStatus = 'active' | 'inactive' | 'pending'

export interface AgencyUser extends User {
  agency_id: string
  agency_name: string
  branch_id?: string
  branch_name?: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
}

// Agency Types
export interface Agency {
  _id: string
  name: string
  description: string
  industry: string
  size: AgencySize
  status: AgencyStatus
  contactEmail: string
  contactPhone: string
  website: string
  specializations: string[]
  locations: string[]
  created_at: string
  updated_at: string
  address: {
    street?: string
    city: string
    state?: string
    country: string
    postal_code?: string
  }
  primaryContact: {
    name: string
    email: string
    phone?: string
    position?: string
  }
  metrics: {
    userCount: number
    activeUserCount: number
    revenueMonthly: number
    totalPlacements: number
    clientCount: number
    workerCount: number
    jobsPosted: number
    fillRate: number
    satisfactionScore: number
  }
  billing: {
    plan: AgencyPlan
    amount: number
    currency: string
    invoices: unknown[] // TODO: Define invoice type
  }
  features: {
    enabledFeatures: string[]
    integrations: string[]
  }
  trial: {
    startDate: string
    endDate: string
    isConverted: boolean
  }
}

export interface AgencyStats {
  total_agencies: number
  active_agencies: number
  pending_agencies: number
  suspended_agencies: number
  total_revenue: number
  revenue_growth: number
  by_industry: Record<string, number>
  by_size: Record<string, number>
}

export type AgencySize = 'Small' | 'Medium' | 'Large'
export type AgencyStatus = 'active' | 'inactive' | 'pending' | 'suspended'
export type AgencyPlan = 'BASIC' | 'PRO' | 'ENTERPRISE' | 'CUSTOM'

export interface AgencyAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface AgencyContact {
  name: string
  email: string
  phone: string
  position: string
}

export interface CreateAgencyRequest {
  name: string
  description: string
  industry: string
  size: AgencySize
  contactEmail: string
  contactPhone: string
  website: string
  status: AgencyStatus
  address: AgencyAddress
  primaryContact: AgencyContact
  specializations: string[]
  plan?: AgencyPlan
  planPrice?: number
  features?: string[]
}

export interface UpdateAgencyRequest extends Partial<CreateAgencyRequest> {
  status?: 'active' | 'pending' | 'suspended' | 'inactive'
  verification_status?: 'verified' | 'pending' | 'rejected'
  settings?: {
    notifications_enabled?: boolean
    auto_approval?: boolean
    custom_branding?: boolean
  }
}

export interface AgencyFilters {
  search?: string
  status?: AgencyStatus
  industry?: string
  specialization?: string
  size?: AgencySize
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  plan?: AgencyPlan
}

// Dashboard Types
export interface DashboardMetrics {
  totalAgencies: number;
  activeAgencies: number;
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  activeCandidates: number;
  systemHealth: {
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    lastIncident?: string;
    activeAlerts: number;
  };
  recentActivity: {
    type: 'agency' | 'user' | 'job' | 'candidate' | 'system';
    action: string;
    description: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
  }[];
}

export interface AgencyRevenue {
  agencyId: string;
  agencyName: string;
  status: AgencyStatus;
  totalRevenue: number;
  monthlyRevenue: number;
  revenueHistory: {
    month: string;
    revenue: number;
  }[];
  metrics: {
    totalJobs: number;
    activeJobs: number;
    totalCandidates: number;
    activeCandidates: number;
    averageJobValue: number;
    successRate: number;
  };
}

// Admin Metrics Types
export interface AdminMetrics {
  activeUsers: number
  newUsers: number
  usersByDate: Array<{
    date: string
    active: number
    new: number
  }>
  usersByRole: {
    client: number
    worker: number
    superadmin: number
  }
  engagementRate: number
}

// Feature Management Types
export interface FeatureToggle {
  id: string
  name: string
  description: string
  is_enabled: boolean
  feature_key: string
  created_at: string
  updated_at: string
}

export interface FeatureToggleStats {
  total_features: number
  enabled_features: number
  disabled_features: number
  features_by_agency: Array<{
    agency_id: string
    agency_name: string
    enabled_features: number
  }>
}

// White Label Types
export interface WhiteLabelConfig {
  id: string
  agency_id: string
  agency_name: string
  primary_color: string
  secondary_color: string
  logo_url: string
  favicon_url: string
  custom_domain: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Security Types
export interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'permission_change' | 'system_change' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityDashboard {
  securityScore: {
    overall: number;
    authentication: number;
    dataProtection: number;
    apiSecurity: number;
    userSecurity: number;
    systemSecurity: number;
    lastUpdated: string;
    _id: string;
  };
  activeEvents: number;
  severityDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  typeDistribution: {
    login_failure: number;
    suspicious_access: number;
    permission_violation: number;
    rate_limit_exceeded: number;
    password_change: number;
    api_key_created: number;
    api_key_deleted: number;
    user_locked: number;
    admin_action: number;
    system_alert: number;
  };
  recentEvents: SecurityEvent[];
  eventsTrend: Array<{
    date: string;
    count: number;
  }>;
}

export interface SecuritySystem {
  twoFactorEnabled: boolean;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    maxAge: number;
  };
  sessionPolicy: {
    maxConcurrentSessions: number;
    sessionTimeout: number;
    requireReauth: boolean;
  };
  ipWhitelist: string[];
  lastSecurityAudit: string;
}

// Analytics Types
export interface TransactionMetrics {
  total_transactions: number
  successful_transactions: number
  failed_transactions: number
  pending_transactions: number
  total_amount: number
  average_transaction_amount: number
  transactions_by_date: Array<{
    date: string
    count: number
    amount: number
  }>
}

export interface UserActivityMetrics {
  total_active_users: number
  daily_active_users: number
  weekly_active_users: number
  monthly_active_users: number
  user_growth_rate: number
  activity_by_date: Array<{
    date: string
    active_users: number
  }>
}

export interface FeatureAdoptionMetrics {
  total_features: number
  adopted_features: number
  adoption_rate: number
  features_adoption: Array<{
    feature_name: string
    feature_key: string
    adoption_count: number
    adoption_rate: number
  }>
}

// Generic API Response Types
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    total_pages: number
    total_items: number
    items_per_page: number
  }
}

// Audit-specific response type for the actual API structure
export interface AuditLogsResponse {
  logs: AuditLog[]
  total: number
  page: string
  limit: string
}

export interface AgencyBranding {
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  accent_color?: string
  font_family?: string
  custom_css?: string
  custom_js?: string
  favicon_url?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  social_links?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}

export type AgencyFeature = 
  | 'custom_domain'
  | 'advanced_analytics'
  | 'white_label'
  | 'api_access'
  | 'bulk_import'
  | 'custom_workflows'
  | 'multi_currency'
  | 'multi_language'
  | 'sso'
  | 'audit_logs'

// Audit Log Types
export interface AuditLog {
  id: string;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  actionType: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogStats {
  totalLogs: number;
  actionTypeDistribution: {
    [key: string]: number;
  };
  entityTypeDistribution: {
    [key: string]: number;
  };
  userActivityDistribution: {
    [key: string]: number;
  };
  recentActivity: AuditLog[];
}

export interface AuditLogFilters {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  actionType?: string;
  entityType?: string;
  entityId?: string;
  ipAddress?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface AuditActionType {
  value: string;
  label: string;
  description?: string;
}

export interface AuditEntityType {
  value: string;
  label: string;
  description?: string;
} 