-- =====================================================
-- DATABASE VIEWS
-- Useful pre-defined queries for common operations
-- =====================================================

-- View: Available Robots
-- Shows only robots that are available for rental/purchase
CREATE OR REPLACE VIEW public.available_robots AS
SELECT 
  id,
  name,
  type,
  sub_category,
  description,
  image_url,
  height,
  weight,
  battery_life,
  speed,
  rental_price_daily,
  rental_price_weekly,
  rental_price_monthly,
  purchase_price,
  stock_quantity,
  created_at
FROM public.robots
WHERE is_available = TRUE AND stock_quantity > 0
ORDER BY type, sub_category, name;

-- View: Robots by Category
-- Summary statistics grouped by category and sub-category
CREATE OR REPLACE VIEW public.robots_by_category AS
SELECT 
  type as category,
  sub_category,
  COUNT(*) as robot_count,
  COUNT(*) FILTER (WHERE is_available = TRUE) as available_count,
  AVG(rental_price_daily) as avg_daily_price,
  AVG(rental_price_weekly) as avg_weekly_price,
  AVG(rental_price_monthly) as avg_monthly_price,
  SUM(stock_quantity) as total_stock
FROM public.robots
GROUP BY type, sub_category
ORDER BY type, sub_category;

-- View: Recent Contacts
-- Shows recent contact form submissions
CREATE OR REPLACE VIEW public.recent_contacts AS
SELECT 
  id,
  first_name || ' ' || last_name as full_name,
  email,
  phone,
  company,
  industry,
  status,
  created_at
FROM public.contacts
ORDER BY created_at DESC
LIMIT 100;

-- View: Active Bookings
-- Shows all active and upcoming rental bookings
CREATE OR REPLACE VIEW public.active_bookings AS
SELECT 
  b.id,
  b.confirmation_number,
  r.name as robot_name,
  r.type as robot_type,
  b.customer_name,
  b.customer_email,
  b.start_date,
  b.end_date,
  b.duration_days,
  b.total_price,
  b.status,
  b.payment_status,
  b.created_at
FROM public.rental_bookings b
JOIN public.robots r ON b.robot_id = r.id
WHERE b.status IN ('pending', 'confirmed', 'active')
ORDER BY b.start_date;

-- View: Booking Revenue Summary
-- Financial summary of bookings by status
CREATE OR REPLACE VIEW public.booking_revenue_summary AS
SELECT 
  status,
  payment_status,
  COUNT(*) as booking_count,
  SUM(total_price) as total_revenue,
  AVG(total_price) as avg_booking_value,
  SUM(deposit_amount) as total_deposits
FROM public.rental_bookings
GROUP BY status, payment_status
ORDER BY status, payment_status;

-- View: Robot Utilization
-- Shows how often each robot is booked
CREATE OR REPLACE VIEW public.robot_utilization AS
SELECT 
  r.id,
  r.name,
  r.type,
  r.sub_category,
  COUNT(b.id) as total_bookings,
  COUNT(b.id) FILTER (WHERE b.status = 'completed') as completed_bookings,
  SUM(b.duration_days) as total_rental_days,
  SUM(b.total_price) as total_revenue
FROM public.robots r
LEFT JOIN public.rental_bookings b ON r.id = b.robot_id
GROUP BY r.id, r.name, r.type, r.sub_category
ORDER BY total_revenue DESC NULLS LAST;
