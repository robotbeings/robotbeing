
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: SUPABASE_URL or SUPABASE_KEY not found in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAllCtas() {
    console.log('Starting CTA update...');

    // 1. Fetch all items
    const { data: items, error: fetchError } = await supabase
        .from('page_items')
        .select('id, name, cta_text');

    if (fetchError) {
        console.error('Error fetching items:', fetchError);
        return;
    }

    console.log(`Found ${items.length} items.`);

    // 2. Identify items to update
    // We want to update EVERYTHING that looks like a product CTA or is one of the old ones.
    // Actually, user said "change all".
    // Let's filter out only known "non-product" ones if necessary.
    // "READ BLOGS", "WATCH NOW", "OUR STORY", "JOIN US" are Company/Resources.
    const nonProductCtas = ['READ BLOGS', 'WATCH NOW', 'OUR STORY', 'JOIN US'];

    const toUpdate = items.filter(item => {
        // If current CTA is already correct, skip
        if (item.cta_text === 'CONTACT FOR DETAILS') return false;

        // If it's a known non-product CTA, skip
        if (nonProductCtas.includes(item.cta_text)) return false;

        return true;
    });

    console.log(`Identified ${toUpdate.length} items to update.`);

    // 3. Update them
    let updatedCount = 0;
    for (const item of toUpdate) {
        const { error: updateError } = await supabase
            .from('page_items')
            .update({ cta_text: 'CONTACT FOR DETAILS' })
            .eq('id', item.id);

        if (updateError) {
            console.error(`Failed to update item ${item.id} (${item.name}):`, updateError);
        } else {
            console.log(`Updated item ${item.id} (${item.name}) from "${item.cta_text}" to "CONTACT FOR DETAILS"`);
            updatedCount++;
        }
    }

    console.log(`Update complete. Updated ${updatedCount} items.`);
}

updateAllCtas();
