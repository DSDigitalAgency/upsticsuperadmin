Super Admin Functionalities
Here’s a comprehensive list of functionalities for the Super Admin role in a white-labelled healthcare recruitment SaaS platform. The Super Admin has the highest privileges and can manage everything across the system including clients, internal teams, and platform settings.
________________________________________
🔒 Super Admin Functionalities
1. Platform Management
•	White Labelling Settings
o	Upload custom logos, favicons
o	Set color theme / branding
o	Configure domain/subdomain (we can create subdomains for agencies)
•	Subscription & Billing
o	Manage pricing plans (monthly/annual)
o	View & modify client subscription statuses
o	Automated billing & invoicing
o	Payment gateway integration
•	License Control
o	Set user limits based on plan
o	Allocate/terminate licenses
________________________________________
2. Client (Agency) Management
•	Agency Onboarding
o	Add new client with branding setup
o	Assign plan, trial period, or custom package
•	Agency Status Monitoring
o	Active / Inactive / Suspended clients
o	View usage, performance, renewal alerts
•	Agency Customization
o	Enable/disable features per agency
________________________________________
3. User Role & Permissions
•	Define Roles
o	Admin, Recruiter, Compliance Officer, Payroll Officer, etc.
•	Access Control
o	Set permissions (view/edit/delete) by role
o	Multi-agency access toggles for corporate accounts
•	Session & Activity Logs
o	View login history, suspicious activity, device info
________________________________________
4. Data & Workflow Configuration
•	Custom Forms
o	Candidate, client, job order form builder
•	Workflow Management
o	Set hiring stages (shortlist > compliance > offer > placement)
________________________________________
•	Email/SMS Templates
o	Setup automated comms with placeholders
o	Per-agency customization
________________________________________
5. Master Data Management
•	Database of Standard Lists
o	Job categories, grades, shifts, bands (Need more information)
In a healthcare recruitment SaaS—especially for UK-based NHS and private medical clients—“Grades and Bands” refer to job levels or roles that categorize healthcare professionals based on their qualifications, experience, and pay scale.
________________________________________
🎯 What “Grades and Bands” Mean:

✅ 
Grades

Typically used in Doctor recruitment, indicating seniority and role:
Grade	Role Example
FY1 / FY2	Foundation Year 1 / 2
SHO	Senior House Officer
ST1-ST8	Specialty Trainee Levels
SPR	Specialist Registrar
SAS	Staff Grade and Associate Specialists
Consultant	Senior-most Doctor Grade
________________________________________
✅ 
Bands

Used mainly for Nurses, Allied Health Professionals (AHPs), and Support Staff, based on NHS Agenda for Change pay structure:
Band	Role Example
Band 2	Healthcare Assistant (HCA)
Band 3	Senior HCA / Therapy Assistant
Band 4	Assistant Practitioner
Band 5	Registered Nurse (RN) / AHP entry level
Band 6	Specialist Nurse / Senior AHP
Band 7	Clinical Nurse Specialist
Band 8a-8d	Matrons, Heads of Service
Band 9	Directors
________________________________________
🔧 How It Fits in Your SaaS Platform:

Super Admin Panel:
•	Define standard or custom Grades and Bands
•	Map them to:
o	Pay rates
o	Job categories
o	Job types (Locum, Permanent)
o	Specialties (Cardiology, A&E, etc.)
•	Enable/disable grades for specific agencies

Agency Admin Panel:
•	Use pre-defined bands and grades or create sub-categories (e.g., Band 5 - ICU)
•	Assign to job listings
•	Use as filters in CV search

Recruiters:
•	Tag candidates with appropriate grade/band
•	Filter job applicants based on grade
•	Match jobs with candidate level

Clients:
•	Filter job orders by desired band/grade
•	See suitable candidates automatically
________________________________________

o	Compliance document list
o	Payroll codes (IR35, Umbrella, PAYE, etc.)
•	Location & Region Settings
o	NHS regions, Trusts, Private facilities
o	Country/state/city dropdowns
•	Time Zone & Locale Settings
o	Multi-timezone support for global agencies
________________________________________
6. Compliance & Document Control
•	Global Compliance Settings
o	Set document validity, expiry rules
o	Assign mandatory docs by job type
•	Auto Notifications
o	Configure expiring document alerts
o	Agency or candidate-level settings
________________________________________
7. Finance & Invoicing Engine
•	Rate Management
o	Global rate templates (day/night, bank holiday) (need rates list) – Sent separate attachment
o	Role/Trust-specific rate exceptions (need more information)
•	Invoice Cycle Configuration
o	Weekly/monthly cycle selection
o	Automated timesheet approval and invoicing
•	Tax Settings
o	VAT, GST setup based on country
o	TDS or withholding tax rules
________________________________________
8. System Logs & Audit Trails
•	Action Logs
o	Track actions across candidates, shifts, jobs, users
•	Error Logs
o	Platform or integration error reports
•	Audit Snapshots
o	Downloadable logs for compliance review
________________________________________
10. Support & Monitoring
•	Live Usage Dashboard
o	Monitor peak usage times, top modules used
•	Feedback Collection
o	Per agency feedback, ratings, NPS
•	Support Ticket System
o	Internal ticket flow + SLA tracking
________________________________________
11. AI & Automation Settings
•	AI Feature Toggles
o	Enable AI CV parsing, job matching, auto shortlisting
•	Automation Rules
o	“If X then Y” logic builder (e.g., auto move to compliance if all docs are valid)
________________________________________
12. Backup & Recovery
•	Backup Scheduling
o	Set hourly/daily/weekly backup frequency
•	Disaster Recovery Settings
o	Rollback agency to specific date/version
•	Data Export/Import
o	Full platform or agency-specific data dump (CSV, JSON)
________________________________________
13. Security & Access
•	Multi-Factor Authentication
o	Enforce 2FA for all users or admins
•	IP Whitelisting
o	Agency or admin-level access restrictions
•	Penetration Testing Controls
o	Run security audits or allow external pen-testing access
________________________________________
14. Analytics & Reports
•	Super Admin Dashboard
o	Active users, agency count, revenue, document status
•	Agency-Level Reports
o	Candidate performance, fill rates, job status, compliance health
•	System Performance Reports
o	Uptime, latency, feature usage trends
________________________________________

Admin Functionalities
Here's a complete list of functionalities for the "Admin" role in a white-labelled recruitment SaaS platform, particularly tailored for healthcare recruitment but extensible to other domains. This structure includes headings, subheadings, and detailed capabilities.
________________________________________
🧭 1. Dashboard & Overview
• KPI Overview
•	Active Jobs, Open Shifts, Pending Approvals
•	Candidate Pipeline Status
•	Today's Tasks & Activities
•	Revenue Metrics (Optional for Agencies)
• Quick Actions
•	Post Job/Shift
•	Add New Candidate
•	Add New Client
________________________________________
🏢 2. Organization & Branch Management
• Organization Profile
•	Company Info, Logo, Contact Details
•	Branding Settings
• Branch/Sub-agency Management
•	Add/Edit Branches
•	Assign Managers to Branches
•	View Performance by Branch
________________________________________
👥 3. User & Role Management
• Staff Users
•	Add/Edit/Delete Recruiters
•	Assign Roles: Recruiter, Compliance, Manager, Viewer
•	Branch-level Access Control
• Permission Matrix
•	Define Role-based Permissions
•	Custom Role Creation
________________________________________
🧑‍⚕️ 4. Candidate Management
• Candidate Profiles
•	Create, View, Edit Profiles
•	Assign Candidates to Recruiters
•	Tag with Skills, Location, Experience
• CV Parsing & Generation
•	Upload CV → Auto-profile generation
•	AI-based CV Formatting
• Compliance Documents
•	Upload & Track Right to Work, DBS, Certifications
•	Auto Alerts for Expiry
•	eSignature Integration
• Smart Matching
•	Match Candidates to Jobs
•	AI Suggested Candidates
________________________________________
📋 5. Job & Shift Management
• Post Jobs/Shifts
•	One-time or Recurring
•	Public, Internal, or Client Viewable
• Job Board Integration
•	Push to NHS Jobs, Indeed, etc.
•	Sync with Company Careers Page
• Calendar View
•	Shift Calendar
•	Drag & Drop Rescheduling
• Shift Fill Status
•	Assigned, Unfilled, Backup Options
________________________________________
🧾 6. Client Management
• Client Profiles
•	Add/Edit Clients
•	Contact Info, Departments, Locations
• Contracts & Rate Cards
•	Upload Contracts
•	Set Pay Rates & Bill Rates by Role/Shift Type
• Client Portals (If enabled)
•	Invite Clients to View/Approve Candidates & Shifts
________________________________________
📑 7. Timesheets & Invoicing
• Timesheet Submission
•	Manual Entry, Mobile Upload, Auto-Generated
• Timesheet Approval
•	1-Click Client Approval
•	Flag Discrepancies
• Invoicing Integration
________________________________________
🧾 
Admin Functionality: 
🔹 
Section:
 Finance & Accounting
________________________________________
🔸 
2. Export Options
Export Type	Description
Approved Timesheets	Export candidate hours, pay rate, and client job data.
Client Invoices	Export billable invoices generated based on shifts worked.
Payroll Files	Export payable data for internal or external payroll processing.
Expenses/Deductions	Sync items like travel reimbursements or statutory deductions.
Pension & NI	Export contributions and employer liabilities if applicable.
________________________________________
🔸 
3. Export Controls
•	Manual Export – Choose time range, items to export.
•	Scheduled Export – Set daily/weekly automatic sync jobs.
•	Export Preview – Review data before confirming sync.
•	Error Handling – Notifications for missing mappings or data conflicts.
•	Audit Log – Timestamped log of export actions and users.
________________________________________
🔸 
4. Reporting View
•	Export summary dashboard:
o	Total value exported
o	Export status (Success / Failed / Pending)
________________________________________

•	Track Paid vs Unpaid Invoices
________________________________________
🔐 8. Compliance & Document Hub
• Automated Document Checklists
•	NHS Core Standards
•	Custom Compliance Templates
• Status Dashboard
•	Red/Amber/Green Indicators for Candidates
• Mass Document Upload/Reminders
•	Bulk Upload & Assign
•	Auto Reminder System
________________________________________
📣 9. Communication & Engagement
• SMS & Email Templates
•	Predefined Templates (Shift Reminders, Interview Confirmations)
• WhatsApp Business Integration
•	Auto-Send Interview Confirmations, Onboarding Links
• Notes & Timeline
•	Communication History with Candidates & Clients
________________________________________
📊 10. Reporting & Analytics
• Standard Reports
•	Placements, Fill Rates, Compliance Rates
• Custom Report Builder
•	Drag & Drop Report Fields
•	Save & Schedule Reports
• Export Options
•	CSV, PDF, Excel, JSON API
________________________________________
⚙️ 11. Platform Settings
• Branding & White Labelling
•	Logo, Colour Scheme, Domain Setup
• Email & SMS Configuration
•	SMTP
• Notification Settings
•	Push, Email, and SMS Alerts Setup
• Audit Logs
•	View all user activity by timestamp
________________________________________
🔄 12. Workflow Automation
• Candidate Auto-Tagging Rules
•	Based on Skills, Role, Compliance
• Job Auto-Matching Rules
•	Location Radius, Availability, Pay Preference
• Drip Campaign Setup
•	Auto Engage Dormant Candidates or Clients
________________________________________


Recruiter Functionalities
Perfect. Here's a comprehensive, structured list of functionalities for the Recruiter role in your white-labelled healthcare recruitment SaaS platform.
________________________________________
🧑‍💼 Recruiter Role – Full List of Functionalities
________________________________________
1. Dashboard
•	📊 Overview Widgets:
o	Jobs posted / active / closed
o	Candidates in pipeline (per stage)
o	Upcoming interviews
o	Pending actions (e.g., candidate follow-ups)
•	🔍 Search bar: Global search for jobs, candidates, or shifts
•	🔔 Recent activity feed (personal & team)
________________________________________
2. Job Management
•	➕ Create New Job / Shift
o	Job title, location, specialty, shift details
o	Auto-suggest templates for faster entry
•	✏️ Edit Job Details
•	📌 Publish / Unpublish / Archive Job
•	🔁 Duplicate job post
•	🔍 Search & Filter Jobs by:
o	Date, specialty, facility, status
•	📎 Assign job to candidate(s) or team members
________________________________________
3. Candidate Sourcing
•	🔍 Search Internal Database
o	By name, specialty, availability, location, compliance
•	🔄 Import CVs (bulk upload or drag-and-drop)
•	📤 Send job to external sources (job boards, WhatsApp, email)
•	⚙️ Boolean search & filters
o	Compliance ready, preferred distance, past placements
•	📍 Geo-location match for local roles
________________________________________
4. Candidate Pipeline Management
•	👤 Candidate Profiles:
o	Work history, documents, compliance, preferences
•	🧩 Drag-and-drop Pipeline View
o	Shortlisted → Interview Scheduled → Offer Made → Placed
•	💬 Comment & Notes Section per candidate
•	📌 Pin high-priority candidates
•	🤝 Candidate-Job Match Score (AI-based)
________________________________________
5. Interview Scheduling & Coordination
•	🗓 Integrated Calendar
•	📅 Schedule Interview
o	With candidate and client
o	Auto-email + WhatsApp notification
•	✅ Confirmations & Reminders
•	📝 Feedback collection module
o	For both interviewer and candidate
________________________________________
6. Communication & Notes
•	📩 Send Email / SMS / WhatsApp from platform
•	🧾 Message Templates (with auto-fill)
•	📌 Pinned Notes per job or candidate
•	🗣️ Internal Chat / Mentions for collaboration
________________________________________
7. Compliance & Documents
•	📁 Upload/View Documents (Provide the list of docs needed)
o	CVs, IDs, certificates, DBS, etc.
•	📋 Compliance Checklist
o	Auto-highlight missing or expiring items
•	🔄 Renewal Reminders
•	✅ Approval Tags (e.g., "Ready to Place")

Here’s a detailed list of documents that should be uploadable and viewable by recruiters under the “Upload/View Documents” section of the Recruiter Functionalities → Compliance & Documentation module in your white-labelled recruitment SaaS:
________________________________________
📁 Upload / View Documents

(For Recruiters to Manage Candidate Compliance & Onboarding Documentation)

📌 Functional Actions:
•	Upload documents per candidate profile
•	Set expiry dates & alerts (e.g., training, visas)
•	View document status: Pending / Approved / Expired / Missing
•	Filter by compliance stage or document type
•	Send reminders to candidates for missing or expiring documents
________________________________________
✅ 
Essential Documents by Category

1. 🆔 
Identity & Right to Work
•	Passport / Visa
•	BRP (Biometric Residence Permit)
•	National ID (if applicable)
•	Driving License (if used as proof)
•	Right to Work Status Letter
•	COS (Certificate of Sponsorship), if applicable
•	RTW Checklist Form
________________________________________
2. 📜 
Professional Registrations & Qualifications
•	NMC / GMC / HCPC Registration Certificate
•	Degree / Diploma Certificate(s)
•	Mandatory Training Certificates (BLS, Manual Handling, Infection Control, etc.)
•	CPD Evidence
•	Appraisal Documents (NHS Annual Appraisal Evidence)
________________________________________
3. 👨‍⚕️ 
Medical & Occupational Health
•	Fit to Work Certificate
•	TB Screening Report
•	Hepatitis B, MMR, Varicella Immunity Proof
•	COVID-19 Vaccination Certificate
•	Occupational Health Clearance
________________________________________
4. 📋 
Employment & Background Verification
•	CV (up-to-date)
•	Work History Form
•	Employment References (minimum 2)
•	Reference Consent Forms
•	Gap Explanation Letters (if any)
________________________________________
5. 🔐 
DBS & Background Checks
•	Enhanced DBS Certificate (within 12 months or Update Service)
•	DBS Update Service Consent
•	Police Clearance Certificate (For Non-UK Nationals)
•	Overseas Police Check (where required)
________________________________________
6. 🧾 
Compliance Declarations & Policies
•	Working Time Regulations (WTR) Acknowledgement
•	Agency Worker Regulations (AWR) Consent
•	IR35 Declaration (if applicable)
•	Confidentiality & GDPR Agreement
•	Code of Conduct / Social Media Policy Acknowledgement
•	Rehabilitation of Offenders Declaration
•	Equal Opportunities Agreement
•	Counter-Fraud Declaration
•	Health & Safety Agreement
________________________________________
7. 💼 
HR, Contracts & Legal
•	Signed Contract / Offer Letter
•	Key Information Document (KID)
•	Visa Compliance Confirmation (for non-UK nationals)
•	Terms & Conditions (Signed Copy)
•	Staff Handbook Acknowledgement
•	Data Retention Policy Acknowledgement
________________________________________
8. 🏦 
Banking & Payment
•	Bank Details Form
•	NI Number Proof
•	UTR (If Self-employed)
•	Tax Status Declaration
•	Indemnity Insurance Certificate (If CNST Not Applicable)
________________________________________
9. 🪪 
Badges & Uniform
•	Uniform Size Form (if applicable)
•	Photo for ID Badge (Recent, as per agency policy)
•	ID Badge Request Form
•	ID Badge Acknowledgement / Return Policy
________________________________________
🔁 
Automation & Validation (Optional Enhancements)
•	Auto-flag expiring documents (DBS, training, etc.)
•	API Integration with Yoti / Onfido for ID checks
•	Upload via mobile (camera capture option)
•	E-signature support for declarations
________________________________________
Not all the above data needs uploading Mostly from 1,2,3and 5.

________________________________________
8. Activity Logs & Analytics
•	📊 Placement Stats
o	Daily/weekly/monthly success
•	📝 Activity Logs
o	Calls made, messages sent, interviews arranged
•	📈 Conversion Funnel
o	Applied → Shortlisted → Placed
________________________________________
9. Alerts & Notifications
•	🔔 Real-time Notifications
o	New applications, document uploads, interview changes
•	📱 Push notifications (if mobile)
•	📬 Daily summary email (optional)
________________________________________
10. Personal Settings
•	👤 Edit Profile
•	🔐 Password & 2FA
•	📬 Email/SMS Preferences
•	📅 Working hours & availability settings
________________________________________

Client Functionalities
Here’s a comprehensive list of functionalities for the “Client” role within a white-labelled recruitment SaaS platform. These functionalities are designed for hospitals, clinics, or other client organizations using the platform to manage and track healthcare staffing needs.
________________________________________
🔷 
1. Dashboard
•	Overview Widgets
o	Open job requests
o	Active placements
o	Upcoming shifts
o	Candidate onboarding status
•	Quick Actions
o	Raise new request
o	View profiles
o	Approve timesheets
________________________________________
🔷 
2. Job Requests Management
•	Raise New Request
o	Role type, shift timing, skill set, location
o	Urgency (ASAP, Scheduled)
•	Request Templates
o	Save frequently requested role templates
•	Manage Requests
o	View, edit, cancel job requests
o	Filter by date, role, urgency, status

1. 
Raise New Request

Clients can post a job request directly to their associated agency (or agencies, if multi-agency enabled).

Fields to Fill:
Field	Description	Example
Role Type	Type of staff needed	Nurse, Doctor, HCA, RMN
Shift Timing	Shift time & date	08:00–20:00 on 25 May 2025
Skill Set	Any specific skills required	Tracheostomy, ICU experience
Location	Site or department	Royal Free Hospital, A&E Ward
Urgency	When the role is needed	ASAP, Scheduled (future date)
Additional Notes	Extra details for recruiters	“Needs IV Cert. Must have NHS exp.”
________________________________________
2. 💾 
Request Templates

Clients can save frequently used job request formats so they don’t have to re-enter data each time.

Features:
•	Save a job request as a template
•	Name templates for easy reuse (e.g., “Night ICU Nurse”, “Weekend GP Locum”)
•	Load template and modify if needed before submitting

✅ Use Case: A hospital regularly needs weekend RMNs – saves a template and reuses it weekly with minor edits.
________________________________________
3. 🗂️ 
Manage Requests

Clients can view and manage all active and past job requests.

Features:
•	View Requests: See all posted jobs – pending, filled, or cancelled
•	Edit Requests: Change shift time, location, or other fields if not yet filled
•	Cancel Requests: Withdraw a request if no longer needed
•	Request Status View: Submitted → Accepted → Candidate Assigned → Completed

Filters Available:
Filter	Use
Date Range	         Show requests posted or due in specific timeframe
Role Type	         View only nurse or doctor requests
Urgency	         See only ASAP or scheduled roles
Status	         Pending / Filled / Cancelled / In Progress

📌 Bonus Features:
•	Clone request: Instantly duplicate a previous job request
•	Track fulfillment: See which recruiter filled the job and which candidate was assigned
________________________________________
🔷 
3. Candidate Review & Selection
•	Profile Preview
o	Summary view with experience, compliance, ratings
•	Full Profile Access
o	CV, documents, availability, reference notes
•	Shortlist/Reject
o	Add notes
o	Tag multiple stakeholders
•	Interview Scheduling
o	Video/phone/in-person options
o	Integrated calendar invite
________________________________________
🔷 
4. Shifts & Roster View
•	Calendar View
o	Daily/Weekly/Monthly staff overview
•	Shift Status
o	Filled, Pending, Unfilled
•	Real-time Updates
o	See last-minute changes and replacements
________________________________________
🔷 
5. Timesheet Approval
•	Pending Timesheets
o	View weekly timesheets submitted by staff
•	Digital Sign-Off
o	One-click approval with comments
•	Timesheet History
o	Filter by staff, week, status
________________________________________
🔷 
6. Compliance Dashboard
•	View Compliance Status
o	Staff compliance scores and alerts
•	Document Access
o	DBS, training certificates, immunizations
•	Alerts & Notifications
o	For expired or soon-to-expire documents
________________________________________
🔷 
7. Feedback & Ratings
•	Rate Staff
o	After shift completion
•	Provide Feedback
o	Anonymous or named comments
•	Flag Issues
o	Immediate alert to agency or admin
________________________________________
🔷 
8. Invoicing & Billing
•	View Invoices
o	Date-wise, staff-wise, job-wise
•	Download & Export
o	PDF and Excel formats
•	Payment Status
o	Paid, Overdue, Pending
•	Raise Disputes
o	On specific invoices or line items
________________________________________
🔷 
9. Communication
•	Chat with Recruiters
o	Real-time messaging with agency staff
•	Broadcast Messages
o	Announcements to assigned staff
•	Notification Preferences
o	Email, SMS, in-app
________________________________________
🔷 
10. Reports & Analytics
•	Hiring Metrics
o	Fill rate, time-to-fill, cancellations
•	Cost Analysis
o	Weekly/monthly spend
•	Shift Trend Reports
o	Most/least requested roles, seasonal patterns
________________________________________
🔷 
11. Team Access Control
•	Add Team Members
o	Multiple user accounts for one client organization
•	Permission Settings
o	Define who can raise requests, approve timesheets, etc.
________________________________________
🔷 
12. Settings & Support
•	Profile & Company Info
•	Integration Settings
o	Calendar, payroll, accounting software
•	Help & Support
o	Knowledge base
o	Raise a ticket
o	Contact account manager
________________________________________

Candidate Functionalities
Candidate Pre-Onboarding
Here’s a breakdown of Candidate Functionalities Prior to Onboarding, both for app sign-up and agency onboarding (compliance and approval).
________________________________________
🔷 PRE-ONBOARDING FUNCTIONALITIES (CANDIDATE)

🟢 1. App Sign-Up & Initial Registration
•	Multi-Method Sign-Up
o	Email + Password
o	Mobile OTP Verification
o	Google/Apple sign-in (optional)
•	User type: Candidate
•	Role Selection
o	Nurse, HCA, Doctor, Allied Health, etc. (Full list needed)
Role Categories with Sub-Roles

1. 🧑‍⚕️ 
Nursing Roles
•	Nursing Associate 
•	Registered General Nurse (RGN)
•	Mental Health Nurse (RMN)
•	Learning Disability Nurse (RNLD)
•	Midwife
•	Theatre Nurse (Scrub, Recovery, Anaesthetics)
•	ITU/ICU Nurse
•	A&E Nurse
•	Community Nurse
•	District Nurse
•	Practice Nurse
•	Nurse Practitioner (NP)
•	Clinical Nurse Specialist (CNS)
•	Nurse Prescriber
________________________________________
2. 👨‍⚕️ 
Doctor Roles
•	General Practitioner (GP)
•	Consultant (specialties: Cardiology, Neurology, etc.)
•	Registrar
•	SHO (Senior House Officer)
•	FY1/FY2 (Foundation Doctors)
•	Locum Doctor (across specialties)
•	Emergency Medicine
•	Psychiatry
•	Paediatrics
•	Surgery (General, Orthopaedic, etc.)
________________________________________
3. 👩‍🔬 
Allied Health Professionals (AHP)
•	Physiotherapist
•	Occupational Therapist
•	Radiographer (Diagnostic / Therapeutic)
•	Dietitian
•	Speech & Language Therapist (SALT)
•	Biomedical Scientist
•	Podiatrist
•	Prosthetist/Orthotist
•	Pharmacist
________________________________________
4. 🤝 
Health Care Assistants / Support Roles
•	HCA (Hospital / Community)
•	Mental Health Support Worker
•	Complex Care Worker
•	Nursing Assistant
•	Therapy Assistant
•	Phlebotomist
•	Rehabilitation Assistant
•	Maternity Support Worker
•	Domiciliary Carer
•	Live-in Carer
________________________________________
5. 🧬 
Healthcare Scientists & Technicians
•	Clinical Laboratory Technician
•	Medical Lab Assistant
•	Operating Department Practitioner (ODP)
•	ECG / Cardiac Technician
•	Audiologist
•	Respiratory Physiologist
________________________________________
6. 🧑‍💼 
Non-Clinical / Admin Roles (Optional based on agency)
•	Receptionist (Medical)
•	Medical Secretary
•	Ward Clerk
•	Medical Records Clerk
•	Scheduler / Booking Coordinator
________________________________________
🔧 Optional Filters (Post Role Selection)
After selecting their role, candidates can optionally specify:
•	Preferred Work Type: Temp / Locum / Permanent
•	Preferred Settings: NHS / Private / Homecare / Community / Hospital
•	Work Hours: Full-time / Part-time / Nights / Weekends only
________________________________________

•	Location Preferences
o	Country, Region/City, Radius
•	Referral Code (Optional)
o	Apply code during sign-up for rewards
________________________________________
🟢 2. Candidate Profile Pre-Onboarding
•	Upload Resume (CV) – PDF/Word
•	Upload Recent Passport-Sized Photograph
•	Basic Information Collection
o	Full name, gender, date of birth
o	Contact info (phone, email)
o	Marital status (optional)
o	Ethnicity (for equality monitoring)
o	Emergency contact & acknowledgement
•	Education
o	Degrees, certifications
o	Year & institution
o	Upload certificates
•	Experience Snapshot
o	Total experience (dropdowns) – Employers list (past 10 years)
o	Previous roles/facilities (quick entry)
o	Gaps explanation
o	Upload job references / documents
•	Upcoming NHS Appraisal
o	Evidence upload
o	Last appraisal date
o	Next due date
________________________________________
🟢 3. References – Auto populated as per work history – current to most recent 
•	References (Last 5 years)
o	Referee names, positions, contact
o	Auto email/reference request
o	Upload written references (if available)
o	Annual Auto email/reference request
o	Post placement feedback request
________________________________________
🟢 4. Pre-Employment Checks & Document Upload Interface
o	✅ Identity Document Upload & Verification
	Passport, Driving License, or BRP
o	✅ Right to Work Check (RTW) – Upload Share code Document & COS (if sponsored) – Automated email to the COS
	Manual upload or system-integrated lookup
o	✅ Professional Registration (e.g., NMC/GMC validation)
	Upload NMC Registration and NMC PIN
	Automated NMC PIN Check
	HPAN Check
list of Professional Registration Bodies to include in your Pre-Employment Checks & Document Upload Interface for healthcare recruitment. These will allow recruiters and admin users to validate a candidate’s professional PIN or registration during onboarding. 
________________________________________
✅ 
United Kingdom – Primary Registration Bodies
Profession	Registration Body	Validation Info
Nurses & Midwives	NMC – Nursing & Midwifery Council	NMC PIN Lookup
Doctors	GMC – General Medical Council	GMC Reference Number
Dentists	GDC – General Dental Council	GDC Number
Pharmacists	GPhC – General Pharmaceutical Council	GPhC Registration No.
Pharmacy Technicians	GPhC – General Pharmaceutical Council	Same as above
Paramedics, Radiographers, Physiotherapists, etc.	HCPC – Health & Care Professions Council	HCPC Registration No.
Optometrists / Dispensing Opticians	GOC – General Optical Council	GOC Number
Osteopaths	GOsC – General Osteopathic Council	GOsC Number
Chiropractors	GCC – General Chiropractic Council	GCC Registration No.
Biomedical Scientists / AHPs	HCPC	HCPC Number
Social Workers (England)	Social Work England	Registration Number
Podiatrists / Chiropodists	HCPC	HCPC Number
Operating Department Practitioners (ODPs)	HCPC	HCPC Number
________________________________________

📎 Candidate Upload Options
•	PIN / Registration Number Input
•	Expiry Date of License
•	Auto-check if integration is enabled (e.g., NMC API)
•	Upload: Certificate / Screenshot of live registration
•	Verification status: Validated / Expired / Pending
________________________________________

o	✅ Qualifications + Validation
	Upload Qualification Certificates
	Automated email – Student Confirmation
o	✅ Enhanced DBS Upload
	Declaration
	Upload DBS Certificate (both sides)
	Upload Update service
	Automated Update Service Check
o	✅ Work Health Questionnaire
	Complete Health Questionnaire
	Upload Immunisation Reports
	Automated Annual FTW Request
o	✅ NI Number
	Upload National Insurance Letter / Card
o	✅ 2 x Proof of Address (utility/bank statement)
	Upload statements from last 3 months
o	✅ Mandatory Training Upload & Verification
	Upload Mandatory Training Certificate
	Enter Mandatory Training provider details for verification
	Auto email request – training verification
	Mandatory eLearning Links
	Auto-linked or integrated e-learning
•	Real-Time Compliance Checklist
o	DBS
o	NMC PIN/Professional License
o	Proof of Address
o	Certificates (BLS, Manual Handling, etc.)
o	References (email or file upload)
•	Progress Bar
o	Visual onboarding % complete
________________________________________
🟢 5. Competency Assessment
 Skills Assessment
•	Skills Review
o	Select & rate proficiency
o	Upload skill certifications

Detailed list of skills candidates can select and self-rate in the Competency Assessment – Skills Review section, along with an option to upload supporting certifications. These are tailored for the healthcare sector, and categorized by role for better structure.
________________________________________
📝 
Competency Assessment > Skills Review

📋 Format:
•	Skill Category > Skill
•	✅ Select Skill
•	⭐ Rate Proficiency (1–5 scale)
•	📎 Upload Certification (Optional)
________________________________________
👩‍⚕️ General Nursing Skills
•	Vital Signs Monitoring (BP, HR, SpO2, Temp)
•	Medication Administration (Oral, IV, IM, SC)
•	Aseptic Technique
•	Wound Dressing & Care
•	IV Cannulation & Phlebotomy
•	PEG Feeding
•	Urinary Catheterization (Male/Female)
•	Manual Handling & Hoist Use
•	Pressure Ulcer Prevention
•	Infection Control Practices
•	Patient Hygiene & Personal Care
•	Pain Assessment & Management
•	Observations & Charting
•	CPR / BLS / ALS Certification Upload
________________________________________
🧑‍⚕️ Healthcare Assistant (HCA) Skills
•	Personal Care & Bed Bathing
•	Assisting with Mobility & Transfers
•	Monitoring Fluid Intake / Output
•	Assisting with Feeding
•	Basic Wound Care
•	Observing & Reporting Health Changes
•	Dementia Care
•	End of Life / Palliative Support
•	Use of Mobility Aids
•	Assisting with Toileting
•	Infection Control Awareness
________________________________________
👨‍⚕️ Doctors & Medical Professionals
•	History Taking & Clinical Examination
•	Prescribing Medications (UK-based)
•	Clinical Decision Making
•	Emergency Response (ALS, PALS)
•	Minor Procedures (e.g., Suturing)
•	Interpretation of Diagnostics (ECG, X-ray, Labs)
•	Documentation & SOAP Notes
•	Patient Handover Protocols
•	NHS IT Systems Familiarity (e.g., SystemOne, EMIS)
________________________________________
🩺 Allied Health Professionals (AHPs)

(Physiotherapists, Radiographers, OTs, SLTs)
•	Mobility Assessment
•	Gait Training
•	Pulmonary Rehab Techniques
•	Cognitive Therapy Exercises
•	Swallow Assessments (SLTs)
•	Radiographic Positioning & Safety
•	Handling Assistive Devices
•	Sensory Integration Therapy
•	Speech & Communication Plans
________________________________________
💊 Mental Health Professionals
•	Mental State Examination (MSE)
•	Suicide Risk Assessment
•	De-escalation Techniques
•	Administering Psychotropic Meds
•	Section 136/Section 3 Handling (UK Mental Health Act)
•	Safeguarding Children/Vulnerable Adults
•	Substance Misuse Protocols
•	Behaviour Management Plans
________________________________________
🏥 Clinical Admin & Compliance Skills (for all roles)
•	NHS Compliance & Audits
•	Electronic Patient Record Systems (e.g., Cerner, Epic)
•	GDPR/Data Handling
•	Safeguarding Training (Level 1–3)
•	Clinical Governance Awareness
•	Duty of Candour
•	Incident Reporting Procedures
________________________________________
📎 Optional Skill Certificate Upload
•	NVQ Certificates
•	Mandatory Training Records
•	ALS / BLS / MH Certificates
•	PMVA/MAPA Certifications
•	Manual Handling / Infection Control Training
•	CPD Logs
________________________________________

🟢 6. Declarations (Digital Signatures)
•	Legislative Declarations
o	✅ Working Time Regulations (WTR)
o	✅ Agency Worker Regulations (AWR)
o	✅ IR35 (if applicable)
o	✅ Terms of engagement
o	✅ Key Information Document (KID)
o	✅ Visa Conditions (for non-UK nationals)
o	✅ Ongoing Declaration of Compliance
o	✅ Self-Declaration of Continued Eligibility
•	Contractual / Company Policy Acknowledgements
o	✅ Declaration of Accuracy and Current Status
o	✅ GDPR Consent & Confidentiality
o	✅ Staff Handbook
	✅ Data Retention Policy
	✅ Anti-Fraud Measures
	✅ Social Media Policy
	✅ Code of Conduct
o	✅ Rehabilitation of Offenders Act
o	✅ Health Declaration
o	✅ Equal Opportunities
o	✅ Tax & NI Deduction Consent
o	✅ Indemnity Insurance Declaration (for non-CNST cover)
•	Consent for Checks
o	Ongoing Pre-Employment Checks, Ongoing Compliance Checks and Continuous Vetting, Compliance Audits
o	Third-party Audit consent acknowledgment
________________________________________
🟢 7. Agency-Specific Forms
•	Bank Details Form
•	NI Number / UTR Entry
•	Uniform Size or Badge Details
•	Custom Docs (if any)
________________________________________
🟢 8. Recruiter Assignment (Optional)
•	Auto-Assign Recruiter
o	Based on availability, geography, or load balancing
•	Intro Message or Call Scheduler
o	In-app booking with recruiter
•	Interview & Assessment (Optional)
o	Self-book video interview
o	Recruiter notes & rating capture (backend)
o	Interview result: Pass / Hold / Reject
________________________________________
🟢 9. Approval Workflow
•	Internal Review Triggered
o	Recruiter/Compliance officer reviews submission
•	Conditional Approval
o	Candidate onboarded but needs remaining docs
•	Rejected
o	With feedback for re-submission
•	Approved
o	Induction Checklist – Agency specific or Recruit Pass specific
	Digital checklist covering
	App training
	Document guidance
	Policies explained
	Confirmation steps
o	Recruitment and Compliance Checklist created
o	Complete Compliance Audit Report
o	Auto-unlocks access to dashboard features
________________________________________
🟢 10. Notifications & Follow-Up
•	Progress Nudges
o	“You’re 60% done, upload your DBS to continue”
•	Reminder Emails/SMS
o	Incomplete onboarding
•	Recruiter Follow-Up (Optional)
o	Triggered if no activity for X days
________________________________________

Candidate Post-Onboarding
Here’s a complete and structured list of functionalities for the “Candidate” role in your white-labelled recruitment SaaS platform, specifically tailored for healthcare professionals (e.g., nurses, HCAs, doctors, etc.).
________________________________________
🔷 
1. Candidate Dashboard
•	Overview Widgets
o	Upcoming shifts
o	Pending timesheets
o	Compliance status
o	Application status (new, under review, accepted)
•	Quick Actions
o	Update availability
o	Submit timesheet
o	Apply for job
________________________________________
🔷 
2. Profile & Documents
•	Personal Information
o	Contact details, address, photo, emergency contact
•	Professional Details
o	Skills, specializations, years of experience, language preferences
•	Document Upload
o	DBS, Passport, Right to Work, Visa, Certificates
•	Auto Compliance Score
o	Real-time visual meter of compliance level
________________________________________
🔷 
3. Job Search & Applications
•	Smart Job Matching
o	Based on availability, skills, location preference
•	Search & Filter Jobs
o	By location, shift time, pay rate, employer type
•	Job Details View
o	Pay rate, duration, description, client feedback
•	Apply / Withdraw
o	One-click application with status tracker
________________________________________
🔷 
4. Shift Management
•	Shift Calendar View
o	Upcoming, completed, cancelled shifts
•	Shift Details
o	Date/time, location map, client name, special instructions
•	Shift Acceptance
o	Confirm/Decline with reason
•	Navigation Integration
o	Google Maps or Apple Maps
________________________________________
🔷 
5. Availability & Preferences
•	Set Weekly Availability
o	By day, shift (morning/afternoon/night)
•	Block Unavailable Dates
o	For holidays, breaks, or personal time
•	Preferred Locations & Facilities
o	Pin or rank favorite places
________________________________________
🔷 
6. Timesheets
•	Submit Timesheet
o	Auto or manual hours entry
•	Upload Evidence
o	Photo of signed sheet or clock-in data
•	Track Approval Status
o	Approved, pending, rejected with feedback
•	Edit/Resubmit Timesheets
o	Before approval deadline
________________________________________
🔷 
7. Payments
•	Payment History
o	Weekly/monthly breakdown with job ref
•	Payment Method Setup
o	Bank details or payment partner
•	Earnings Summary
o	Graph view for income trends
•	Raise Payment Queries
o	Submit query with reference to job/invoice
________________________________________
🔷 
8. Ratings & Feedback
•	Rate Work Experience
o	Rate facility or recruiter post-shift
•	View Feedback
o	From clients or recruiters
•	Raise Concerns
o	With specific shifts or incidents
________________________________________
🔷 
9. Notifications & Alerts
•	New Shift Matching
o	Real-time alerts for matching jobs
•	Compliance Reminders
o	Expiring documents, training due
•	Shift Reminders
o	1 hour before shift, 1 day prior
•	Timesheet Submission Alerts
________________________________________
🔷 
10. Messaging & Support
•	In-App Chat
o	With recruiters or support team
•	FAQs & Guides
o	How to apply, document uploading, payroll help
•	Raise Support Ticket
o	Track ticket status & resolution
________________________________________
🔷 
12. App & Account Settings
•	Profile Settings
o	Name, password, language, photo
•	Notification Preferences
o	Email, SMS, in-app toggles
•	Deactivate / Pause Account
•	Referral Program
o	Share code, track referrals, bonuses