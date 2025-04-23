const client = require('./client');

async function runSetExamples() {
    await client.del('fruits');

    // Add to set
    await client.sadd('fruits', 'apple');
    await client.sadd('fruits', ['banana', 'orange', 'apple']);

    // Get all members
    const fruits = await client.smembers('fruits');
    console.log('Fruits:', fruits); // ["apple", "banana", "orange"]

    // Size of set
    const size = await client.scard('fruits');
    console.log('Number of fruits:', size);

    // Check membership
    console.log('Has apple?', await client.sismember('fruits', 'apple')); // 1
    console.log('Has grape?', await client.sismember('fruits', 'grape')); // 0

    // Remove a member
    await client.srem('fruits', 'banana');
    console.log('After removal:', await client.smembers('fruits'));

    // Random member
    const randomFruit = await client.srandmember('fruits');
    console.log('Random fruit:', randomFruit);

    // Pop a member
    const popped = await client.spop('fruits');
    console.log('Popped fruit:', popped);
    console.log('Remaining fruits:', await client.smembers('fruits'));

    // Set operations
    await client.del('set1', 'set2');
    await client.sadd('set1', ['a', 'b', 'c']);
    await client.sadd('set2', ['b', 'c', 'd']);

    const union = await client.sunion('set1', 'set2');
    const inter = await client.sinter('set1', 'set2');
    const diff = await client.sdiff('set1', 'set2');

    console.log('Union:', union);
    console.log('Intersection:', inter);
    console.log('Difference:', diff);
}

runSetExamples();
