const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addColumn() {
    console.log('Attempting to add sub_category column...');

    // We can't run DDL via the JS client easily without rpc or similar. 
    // However, since we installed pg, let's use that if we can.
    // Wait, if I am writing this script to rely on pg, I should use pg.

    // BUT, I can try to use a Supabase trick: just select from the column and see if it error.
    // If it errors, we need to add it.
    // Standard supabase client doesn't support ALTER TABLE.

    // Okay, plan B: Use `pg` directly since I installed it.

    const { Client } = require('pg');

    // Construct connection string from supabase URL if possible, or assume it's in .env
    // Often Supabase provides a connection string. 
    // If not available, we might be stuck.
    // Let's check .env content first? No, I shouldn't read .env values directly if I can avoid it for security, 
    // but here I am running code in the user's environment.

    // Actually, looking at the previous `index.js`, it only uses `SUPABASE_URL`.
    // It does NOT have a full connection string.

    // Retrying with a different approach:
    // If we can't run DDL, we can't fix the DB from here without the dashboard or a connection string.
    // Let me check if there is a `DATABASE_URL` in `.env`?
    console.log('Note: To run DDL, we need a DATABASE_URL. Checking for it...');
}

// Actually, I'll just write a script that tries to use pg with DATABASE_URL.
// If DATABASE_URL is not there, I will have to ask the user to add the column manually or provide the string.

const { Client } = require('pg');

async function run() {
    if (!process.env.DATABASE_URL) {
        console.error('Error: DATABASE_URL is not set in .env. Cannot run migrations.');
        console.log('Please add "sub_category" column to "robots" table manually via Supabase Dashboard.');
        return;
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        await client.query('ALTER TABLE robots ADD COLUMN IF NOT EXISTS sub_category text;');
        console.log('Successfully added sub_category column to robots table.');
    } catch (err) {
        console.error('Error executing query:', err);
    } finally {
        await client.end();
    }
}

run();
