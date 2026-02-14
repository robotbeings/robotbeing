const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'robot-being-secret-key-2026';

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null;

// Initialize Supabase only if credentials are valid
if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Connected to Supabase');
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error.message);
  }
} else {
  console.warn('⚠️ Supabase credentials not found or invalid. Running in MOCK MODE.');
}

// Mock Data
const MOCK_ROBOTS = [];

const MOCK_CONTACTS = [];
const MOCK_ADMINS = [
  {
    id: 1,
    email: 'robotbeings@gmail.com',
    // hashed MailBala&*^001
    password: '$2b$10$kWbaQhpY1MtndXuICGB5Zuw..wBCMtSc233fs4QS0kM8netYyBPL6'
  }
];

// Routes
app.get('/', (req, res) => {
  res.send('Robot API is running');
});

// Admin Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = null;

    if (!supabase) {
      admin = MOCK_ADMINS.find(a => a.email === email);
    } else {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();

      if (!error) admin = data;
    }

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, admin: { email: admin.email } });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Contact Form Submission
app.post('/api/contacts', async (req, res) => {
  const { firstName, lastName, email, company, industry, message } = req.body;

  if (!supabase) {
    const newContact = {
      id: MOCK_CONTACTS.length + 1,
      first_name: firstName,
      last_name: lastName,
      email,
      company,
      industry,
      message,
      created_at: new Date().toISOString()
    };
    MOCK_CONTACTS.push(newContact);
    console.log('Contact saved to mock data:', newContact);
    return res.status(201).json(newContact);
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      first_name: firstName,
      last_name: lastName,
      email,
      company,
      industry,
      message
    }])
    .select();

  if (error) {
    console.error('Supabase error saving contact:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});


// Get all robots
app.get('/api/robots', async (req, res) => {
  if (!supabase) {
    // Return mock data if Supabase is not connected
    console.log('Serving mock data for /api/robots');
    return res.json(MOCK_ROBOTS);
  }

  const { data, error } = await supabase
    .from('robots')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Get robot by ID
app.get('/api/robots/:id', async (req, res) => {
  const { id } = req.params;

  if (!supabase) {
    const robot = MOCK_ROBOTS.find(r => r.id == id);
    if (!robot) return res.status(404).json({ error: 'Robot not found' });
    return res.json(robot);
  }

  const { data, error } = await supabase
    .from('robots')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Create new robot
app.post('/api/robots', authenticateToken, async (req, res) => {
  const { name, type, description, image_url, sub_category } = req.body;

  if (!supabase) {
    const newRobot = {
      id: MOCK_ROBOTS.length + 1,
      name,
      type,
      description,
      image_url,
      sub_category: sub_category || 'General'
    };
    MOCK_ROBOTS.push(newRobot);
    console.log('Added to mock data:', newRobot);
    return res.status(201).json(newRobot);
  }

  const { data, error } = await supabase
    .from('robots')
    .insert([{ name, type, description, image_url, sub_category: sub_category || 'General' }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
});

// Delete robot
app.delete('/api/robots/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!supabase) {
    const index = MOCK_ROBOTS.findIndex(r => r.id == id);
    if (index === -1) return res.status(404).json({ error: 'Robot not found' });

    MOCK_ROBOTS.splice(index, 1);
    console.log('Deleted from mock data:', id);
    return res.json({ message: 'Robot deleted successfully' });
  }

  const { error } = await supabase
    .from('robots')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: 'Robot deleted successfully' });
});

// =====================================================
// CMS API ENDPOINTS
// =====================================================

// Get all pages (optionally filter by category)
app.get('/api/pages', async (req, res) => {
  const { category } = req.query;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    let query = supabase.from('pages').select('*').order('display_order');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single page by slug with sections and items
app.get('/api/pages/:slug', async (req, res) => {
  const { slug } = req.params;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    // Get page
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (pageError) throw pageError;

    // Get sections
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .order('display_order');

    if (sectionsError) throw sectionsError;

    // Get items
    const { data: items, error: itemsError } = await supabase
      .from('page_items')
      .select('*')
      .eq('page_id', page.id)
      .order('display_order');

    if (itemsError) throw itemsError;

    res.json({ page, sections, items });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new page (admin only)
app.post('/api/pages', authenticateToken, async (req, res) => {
  const { slug, title, subtitle, hero_image, content, category, meta_description } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data, error } = await supabase
      .from('pages')
      .insert([{ slug, title, subtitle, hero_image, content, category, meta_description }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update page (admin only)
app.put('/api/pages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { slug, title, subtitle, hero_image, content, category, is_published, display_order, meta_description } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data, error } = await supabase
      .from('pages')
      .update({ slug, title, subtitle, hero_image, content, category, is_published, display_order, meta_description })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete page (admin only)
app.delete('/api/pages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// PAGE SECTIONS ENDPOINTS
// =====================================================

// Create section (admin only)
app.post('/api/sections', authenticateToken, async (req, res) => {
  const { page_id, section_type, title, content, data, display_order } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data: result, error } = await supabase
      .from('page_sections')
      .insert([{ page_id, section_type, title, content, data, display_order }])
      .select();

    if (error) throw error;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update section (admin only)
app.put('/api/sections/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { section_type, title, content, data, display_order } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data: result, error } = await supabase
      .from('page_sections')
      .update({ section_type, title, content, data, display_order })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(result[0]);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete section (admin only)
app.delete('/api/sections/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { error } = await supabase
      .from('page_sections')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// PAGE ITEMS ENDPOINTS
// =====================================================

// Create item (admin only)
app.post('/api/items', authenticateToken, async (req, res) => {
  const { page_id, name, image_url, description, specs, cta_text, cta_link, display_order } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data, error } = await supabase
      .from('page_items')
      .insert([{ page_id, name, image_url, description, specs, cta_text, cta_link, display_order }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update item (admin only)
app.put('/api/items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, image_url, description, specs, cta_text, cta_link, display_order } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data, error } = await supabase
      .from('page_items')
      .update({ name, image_url, description, specs, cta_text, cta_link, display_order })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete item (admin only)
app.delete('/api/items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { error } = await supabase
      .from('page_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// NAVIGATION MENU ENDPOINTS
// =====================================================

// Get navigation structure
app.get('/api/navigation', async (req, res) => {
  if (!supabase) {
    // Return mock navigation
    return res.json([
      { id: 1, label: 'PRODUCTS', category: 'products', display_order: 1, is_visible: true },
      { id: 2, label: 'SOLUTIONS', category: 'solutions', display_order: 2, is_visible: true },
      { id: 3, label: 'INDUSTRIES', category: 'industries', display_order: 3, is_visible: true },
      { id: 4, label: 'COMPANY', category: 'company', display_order: 4, is_visible: true },
      { id: 5, label: 'RESOURCES', category: 'resources', display_order: 5, is_visible: true }
    ]);
  }

  try {
    const { data, error } = await supabase
      .from('navigation_menu')
      .select('*')
      .order('display_order');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create navigation item (admin only)
app.post('/api/navigation', authenticateToken, async (req, res) => {
  const { parent_id, label, slug, url, category, display_order, icon } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data, error } = await supabase
      .from('navigation_menu')
      .insert([{ parent_id, label, slug, url, category, display_order, icon }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating navigation item:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update navigation item (admin only)
app.put('/api/navigation/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { parent_id, label, slug, url, category, display_order, is_visible, icon } = req.body;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { data, error } = await supabase
      .from('navigation_menu')
      .update({ parent_id, label, slug, url, category, display_order, is_visible, icon })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating navigation item:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete navigation item (admin only)
app.delete('/api/navigation/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!supabase) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { error } = await supabase
      .from('navigation_menu')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Navigation item deleted successfully' });
  } catch (error) {
    console.error('Error deleting navigation item:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

