# Database Schema Files

This directory contains separate SQL schema files for the Robot Being application. Run them in order for initial setup.

## 📁 File Structure

### Core Tables (Required)
1. **`01_robots_schema.sql`** - Main product catalog
   - Robot products with categorization
   - Technical specifications
   - Pricing and availability
   - Includes sample data

2. **`02_contacts_schema.sql`** - Contact form submissions
   - Customer inquiries
   - CRM status tracking
   - Lead management

3. **`03_admins_schema.sql`** - Admin authentication
   - User credentials (bcrypt hashed)
   - Role-based access control
   - Security features (login attempts, account locking)
   - Default admin: `robotbeings@gmail.com` / `MailBala&*^001`

### Optional Tables (Future Features)
4. **`04_rental_bookings_schema.sql`** - Rental management
   - Booking tracking
   - Payment status
   - Auto-generated confirmation numbers
   - Customer management

5. **`05_audit_log_schema.sql`** - Security audit trail
   - System event tracking
   - Change history
   - Admin activity logs

### Utilities
6. **`06_views.sql`** - Database views
   - Pre-defined queries for common operations
   - Revenue reports
   - Utilization statistics

## 🚀 Quick Start

### For Supabase (Production)
Run each file in the Supabase SQL Editor in order:
```sql
-- 1. Core tables first
01_robots_schema.sql
02_contacts_schema.sql
03_admins_schema.sql

-- 2. Optional tables (if needed)
04_rental_bookings_schema.sql
05_audit_log_schema.sql

-- 3. Views last
06_views.sql
```

### For Local Development
The current `schema.sql` is already compatible. To upgrade:
```bash
# Backup current data first
# Then run new schemas in order
```

## 📊 Key Features

### Robots Table
- ✅ Main category (type) + Sub-category (usage)
- ✅ Technical specs (height, weight, battery, speed)
- ✅ Pricing (rental daily/weekly/monthly, purchase)
- ✅ Stock management
- ✅ Media URLs (images, videos, datasheets)
- ✅ Flexible features (JSON)
- ✅ Auto-updating timestamps

### Security
- ✅ Row Level Security (RLS) policies
- ✅ Bcrypt password hashing
- ✅ Failed login attempt tracking
- ✅ Account locking mechanism
- ✅ Audit logging

### Performance
- ✅ Indexes on frequently queried columns
- ✅ Optimized views for common queries
- ✅ Efficient foreign key relationships

## 🔐 Default Admin Credentials
- **Email:** `robotbeings@gmail.com`
- **Password:** `MailBala&*^001`
- **Role:** `super_admin`

⚠️ **Change this password immediately in production!**

## 📝 Notes

- All tables include `created_at` timestamps
- Tables with updates include `updated_at` (auto-updated via triggers)
- RLS policies are configured for Supabase
- Sample data is included in robots table
- Foreign keys use CASCADE delete where appropriate
