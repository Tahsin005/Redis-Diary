const client = require('./client');

async function init() {
    await client.del('jobs');

    // lpush, rpush
    await client.lpush('jobs', 'job1');           // [job1]
    await client.lpush('jobs', 'job0');           // [job0, job1]
    await client.rpush('jobs', 'job2');           // [job0, job1, job2]

    // lrange
    const allJobs = await client.lrange('jobs', 0, -1);
    console.log('All jobs:', allJobs);            // ["job0", "job1", "job2"]

    // llen
    const jobCount = await client.llen('jobs');
    console.log('Job count:', jobCount);          // 3

    // lpop
    const firstJob = await client.lpop('jobs');
    console.log('Popped from left:', firstJob);   // "job0"

    // rpop
    const lastJob = await client.rpop('jobs');
    console.log('Popped from right:', lastJob);   // "job2"

    // Remaining list
    const remaining = await client.lrange('jobs', 0, -1);
    console.log('Remaining jobs:', remaining);    // ["job1"]

    // blpop (blocking pop with timeout of 5 seconds)
    setTimeout(async () => {
        await client.lpush('jobs', 'delayed-job');
        console.log('Added delayed-job');
        console.log('New item added after delay: ', await client.lrange('jobs', 0, -1))
    }, 2000);

    const [listName, blockedJob] = await client.blpop('jobs', 5);
    console.log(`Blocked pop: listName = ${listName}, job = ${blockedJob}`);

    // lmove
    await client.del('queue1', 'queue2');
    await client.lpush('queue1', ['a', 'b', 'c']); // queue1 = [c, b, a]
    await client.lpush('queue2', ['x', 'y']);      // queue2 = [y, x]


    // Moves 'a' from RIGHT of queue1 to LEFT of queue2
    const movedItem = await client.lmove('queue1', 'queue2', 'RIGHT', 'LEFT');
    console.log('Moved item:', movedItem);         // "a"

    const q1 = await client.lrange('queue1', 0, -1);
    const q2 = await client.lrange('queue2', 0, -1);
    console.log('queue1:', q1);                    // ["c", "b"]
    console.log('queue2:', q2);                    // ["a", "y", "x"]
}

init();
