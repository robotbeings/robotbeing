async function verify() {
    console.log('--- Checking /api/robots ---');
    try {
        const res = await fetch('http://localhost:5000/api/robots');
        const text = await res.text();
        try {
            const data = JSON.parse(text);
            console.log('Status:', res.status);
            console.log('Is Array:', Array.isArray(data));
            console.log('Data Preview:', Array.isArray(data) ? data.slice(0, 1) : data);
        } catch {
            console.log('Raw body:', text.substring(0, 100));
        }
    } catch (e) {
        console.log('Error:', e.message);
    }

    console.log('\n--- Checking /api/pages ---');
    try {
        const res = await fetch('http://localhost:5000/api/pages');
        const text = await res.text();
        console.log('Status:', res.status);
        try {
            const data = JSON.parse(text);
            console.log('Is Array:', Array.isArray(data));
            console.log('Data Preview:', Array.isArray(data) ? data.slice(0, 1) : data);
        } catch {
            console.log('Raw body (not JSON):', text.substring(0, 200));
        }
    } catch (e) {
        console.log('Error:', e.message);
    }
}

verify();
