
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function verify() {
    const { data, error } = await supabase
        .from('page_items')
        .select('id, name, cta_text');

    if (error) {
        console.error(error);
        return;
    }

    console.log('--- Current DB State ---');
    data.forEach(item => {
        console.log(`${item.id}: ${item.name} -> ${item.cta_text}`);
    });
}

verify();
