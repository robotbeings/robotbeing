const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Testing connection to:', supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        console.log('Attempting to select from "contacts" table...');
        const { count, error } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Connection Failed:', error.message);
            if (error.message.includes('relation "public.contacts" does not exist')) {
                console.error('HINT: The contacts table does not exist. Run the migration script.');
            }
        } else {
            console.log('✅ Successfully connected to Supabase!');
            console.log(`Found ${count} records in "contacts" table.`);
        }
    } catch (err) {
        console.error('❌ Exception:', err.message);
    }
}

testConnection();
