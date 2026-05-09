async function testAuthLimiting() {
    console.log("Testing Auth Rate Limiting (Max 10 requests)...");
    for (let i = 1; i <= 12; i++) {
        try {
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`Request ${i}: Status ${response.status}`);
            } else {
                console.log(`Request ${i}: Status ${response.status} - ${data.message}`);
            }
        } catch (error) {
            console.log(`Request ${i}: Error - ${error.message}`);
        }
    }
}

async function testPagination() {
    console.log("\nTesting Food Pagination (Page 1, Limit 2)...");
    try {
        const response = await fetch('http://localhost:4000/api/food/list?page=1&limit=2');
        const data = await response.json();
        if (response.ok) {
            console.log("Pagination Data:", JSON.stringify(data.pagination, null, 2));
            console.log("Items count:", data.data.length);
        } else {
            console.log("Pagination Test Failed:", data.message);
        }
    } catch (error) {
        console.log("Pagination Test Error:", error.message);
    }
}

async function testOrderLimit() {
    console.log("\nTesting Minimum Order Amount ($10)...");
    try {
        const response = await fetch('http://localhost:4000/api/order/place', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: '67cb44a10787caec68be54cb', // Use a dummy valid-looking MongoDB ID
                items: [],
                amount: 5,
                address: {}
            })
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Order Status:", data.success);
        } else {
            console.log(`Status ${response.status} - ${data.message}`);
        }
    } catch (error) {
        console.log("Order Test Error:", error.message);
    }
}

async function runTests() {
    await testAuthLimiting();
    await testPagination();
    await testOrderLimit();
}

runTests();
