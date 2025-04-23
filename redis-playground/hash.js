const client = require('./client');

async function init() {
    await client.del('user:1');

    // Set multiple fields
    await client.hset('user:1', {
        name: 'Alice',
        email: 'alice@example.com',
        age: '30'
    });

    // Get one field
    const name = await client.hget('user:1', 'name');
    console.log('Name:', name);

    // Get multiple fields
    const emailAndAge = await client.hmget('user:1', 'email', 'age');
    console.log('Email and Age:', emailAndAge);

    // Get all fields and values
    const allFields = await client.hgetall('user:1');
    console.log('All fields:', allFields);

    // Get all field names
    const keys = await client.hkeys('user:1');
    console.log('Fields:', keys);

    // Get all values
    const values = await client.hvals('user:1');
    console.log('Values:', values);

    // Set only if not exists
    const setnx = await client.hsetnx('user:1', 'age', '40');
    console.log('Tried to set age to 40 (hsetnx):', setnx); // 0 = not set

    // Delete a field
    await client.hdel('user:1', 'age');
    console.log('After deleting age:', await client.hgetall('user:1'));

    // Field count
    const fieldCount = await client.hlen('user:1');
    console.log('Number of fields:', fieldCount);

    // Field existence
    console.log('Name exists?', await client.hexists('user:1', 'name'));
    console.log('Age exists?', await client.hexists('user:1', 'age'));

    // Increment and decrement numeric field
    await client.hincrby('user:1', 'visits', 1);
    await client.hincrby('user:1', 'visits', 5);
    await client.hincrby('user:1', 'visits', 55);
    const visit1 = await client.hget('user:1', 'visits');
    console.log('Total visits:', visit1);

    await client.hincrby('user:1', 'visits', -55);
    const visit2 = await client.hget('user:1', 'visits');
    console.log('Total visits:', visit2);
}

init();
