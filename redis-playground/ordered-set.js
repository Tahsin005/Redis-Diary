const client = require('./client');

async function init () {
    await client.del('leaderboard');

    // Add members with scores
    await client.zadd('leaderboard',
        100, 'Alice',
        200, 'Bob',
        150, 'Charlie'
    );

    // Get all members (asc)
    const asc = await client.zrange('leaderboard', 0, -1, 'WITHSCORES');
    console.log('Ascending:', asc); // ["Alice", "100", "Charlie", "150", "Bob", "200"]

    // Get all members (desc)
    const desc = await client.zrevrange('leaderboard', 0, -1, 'WITHSCORES');
    console.log('Descending:', desc); // ["Bob", "200", "Charlie", "150", "Alice", "100"]

    // Total members
    const total = await client.zcard('leaderboard');
    console.log('Total members:', total); // 3

    // Score of a member
    const score = await client.zscore('leaderboard', 'Charlie');
    console.log('Charlie\'s score:', score); // 150

    // Increment Charlie's score
    await client.zincrby('leaderboard', 25, 'Charlie');
    console.log('Charlie score after incr:', await client.zscore('leaderboard', 'Charlie')); // 175

    // Decrement Charlie's score
    await client.zincrby('leaderboard', -25, 'Charlie');
    console.log('Charlie score after decr:', await client.zscore('leaderboard', 'Charlie')); // 150

    // Rank of Charlie
    const rankAsc = await client.zrank('leaderboard', 'Charlie');
    const rankDesc = await client.zrevrank('leaderboard', 'Charlie');
    console.log('Charlie\'s rank (asc):', rankAsc);
    console.log('Charlie\'s rank (desc):', rankDesc);

    // Remove Alice
    await client.zrem('leaderboard', 'Alice');
    const updated = await client.zrange('leaderboard', 0, -1, 'WITHSCORES');
    console.log('After removal:', updated);
};

init();