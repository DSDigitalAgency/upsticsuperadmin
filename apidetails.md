base api url: https://api.upstic.com/api/


APi endpoints are

Auth
Authentication endpoints



POST
/api/auth/register
Register new user


POST
/api/auth/login
Login user


POST
/api/auth/logout
Logout user



POST
/api/auth/forgot-password
Request password reset


POST
/api/auth/reset-password
Reset password


GET
/api/auth/me
Get current user profile



POST
/api/auth/refresh-token
Refresh access token



Super Admin Dashboard


GET
/api/api/admin/dashboard/metrics
Get dashboard metrics



GET
/api/api/admin/dashboard/agencies/revenue
Get agency revenue metrics


Admin - Feature Management


GET
/api/api/admin/features
Get all feature toggles



POST
/api/api/admin/features
Create feature toggle



GET
/api/api/admin/features/stats
Get feature toggle statistics



GET
/api/api/admin/features/{id}
Get feature toggle by ID



PUT
/api/api/admin/features/{id}
Update feature toggle



DELETE
/api/api/admin/features/{id}
Delete feature toggle



PUT
/api/api/admin/features/{id}/agency
Toggle feature for agency


Admin - White Label Management


GET
/api/api/admin/white-label
Get all white label configurations



POST
/api/api/admin/white-label
Create white label configuration



GET
/api/api/admin/white-label/{agencyId}
Get white label configuration for an agency



PUT
/api/api/admin/white-label/{agencyId}
Update white label configuration



DELETE
/api/api/admin/white-label/{agencyId}
Delete white label configuration


Admin - Security Management


GET
/api/api/admin/security/dashboard
Get security dashboard data



GET
/api/api/admin/security/events
Get security events



POST
/api/api/admin/security/events
Create security event



GET
/api/api/admin/security/events/{id}
Get security event by ID



PUT
/api/api/admin/security/events/{id}
Update security event



GET
/api/api/admin/security/score
Get security score



POST
/api/api/admin/security/score/calculate
Calculate security score



GET
/api/api/admin/security/system
Get security system



PUT
/api/api/admin/security/system
Update security system


Admin - Analytics


GET
/api/api/admin/metrics/transactions
Get transaction metrics



GET
/api/api/admin/metrics/user-activity
Get user activity metrics



GET
/api/api/admin/metrics/feature-adoption
Get feature adoption metrics