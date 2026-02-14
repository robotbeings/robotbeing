
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Parse connection string or build from vars
// .env usually has DATABASE_URL for pg, or SUPABASE_URL (which is API URL).
// We need the postgres connection string. Supabase provides it in Dashboard.
// Usually it is: postgres://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
// But here we only have SUPABASE_URL and SUPABASE_KEY in .env (typical for Supabase JS client).
// Wait, if we don't have DATABASE_URL, we can't use 'pg' client directly unless we know the credentials.
// SUPABASE_KEY is a JWT/API key, not a DB password.

// Let's check .env content for DATABASE_URL.
// I can't read .env directly, but I can check if process.env.DATABASE_URL is set.

if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not found in .env. Checking for explicit connection params...');
    // Often it's not there by default in Supabase starter kits.
    // If we can't connect via PG, we MUST use Supabase JS client.
} else {
    console.log('DATABASE_URL found.');
}

async function run() {
    if (process.env.DATABASE_URL) {
        // We have a DB URL, use pg
        console.log('Using pg client...');
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });

        try {
            await client.connect();

            // 1. Apply Schema
            const schemaPath = path.join(__dirname, '../db/07_cms_schema.sql');
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            console.log('Applying schema...');
            await client.query(schemaSql);
            console.log('Schema applied.');

            // 2. Update Data
            console.log('Updating CTAs...');
            const updateQuery = `
          UPDATE public.page_items 
          SET cta_text = 'CONTACT FOR DETAILS' 
          WHERE cta_text NOT IN ('READ BLOGS', 'WATCH NOW', 'OUR STORY', 'JOIN US');
        `;
            const res = await client.query(updateQuery);
            console.log(`Updated ${res.rowCount} rows.`);

            await client.end();
        } catch (err) {
            console.error('PG Error:', err);
        }
    } else {
        console.log('No DATABASE_URL. Retrying with Supabase JS client and RPC/Query...');
        // If we don't have DB URL, we are stuck with Supabase JS.
        // But Supabase JS gave 205 error.
        // Maybe we can try to use the 'rpc' interface if a function exists?
        // No...
    }
}

run();
