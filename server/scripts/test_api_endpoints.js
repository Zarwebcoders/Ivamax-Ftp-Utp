// fetch is global in Node 18+

const BASE_URL = 'http://localhost:5000/api';

async function testFlow() {
    try {
        console.log('--- Starting API Test ---');

        // 1. Register
        const randomId = Math.floor(Math.random() * 10000);
        const userPayload = {
            name: `Test User ${randomId}`,
            email: `test${randomId}@example.com`,
            password: 'password123',
            mobile: '1234567890',
            placement: 'Left',
            sponsorId: 'IVA100001'
        };

        console.log(`1. Registering user: ${userPayload.email}`);
        let res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload)
        });

        let data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        console.log('   Registration Success:', data.user.userId);
        const token = data.token;

        // 2. Login (Optional since we have token, but good to test)
        console.log('2. Logging in...');
        res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: data.user.userId, password: 'password123' })
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        console.log('   Login Success. Token received.');

        // 3. Get Wallet
        console.log('3. Fetching Wallet...');
        res = await fetch(`${BASE_URL}/wallet`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Wallet fetch failed');
        console.log('   Wallet Balance:', data.captok ? data.captok.main : 'N/A');

        // 4. Create Support Ticket
        console.log('4. Creating Support Ticket...');
        res = await fetch(`${BASE_URL}/support/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                subject: 'Test Ticket',
                message: 'This is a test ticket from script',
                category: 'General',
                priority: 'Low'
            })
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Ticket creation failed');
        console.log('   Ticket Created:', data.ticketId);

        console.log('--- API Test Completed Successfully ---');

    } catch (err) {
        console.error('--- Test Failed ---');
        console.error(err.message);
    }
}

testFlow();
