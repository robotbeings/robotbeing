-- Add sub_category column to robots table
ALTER TABLE public.robots 
ADD COLUMN IF NOT EXISTS sub_category text DEFAULT 'General';
