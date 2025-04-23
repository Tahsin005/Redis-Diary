const client = require('./client');

async function init() {
    // set a string value
    await client.set('msg:6', 'Hey from node.js');

    // get string value
    const result1 = await client.get('user:3');
    const result2 = await client.get('msg:6');

    console.log('Result1 --> ', result1);
    console.log('Result2 --> ', result2);

    // appending to an existing string
    await client.append('msg:6', ' - and Redis!');
    const result3 = await client.get('msg:6');
    console.log('Appended Result --> ', result3);

    // multiple keys
    await client.mset('user:1', 'John Doe', 'user:2', 'Jane Doe');
    const result4 = await client.mget('user:1', 'user:2');
    console.log('Multi Get Result --> ', result4);

    // numbers
    await client.set('counter', 0);
    await client.incr('counter');
    await client.incr('counter');

    const result5 = await client.get('counter');
    console.log('Counter Result --> ', result5);

    await client.decr('counter');
    const result6 = await client.get('counter');
    console.log('Decremented Counter Result --> ', result6);

    await client.incrby('counter', 5);
    const result7 = await client.get('counter');
    console.log('Incremented by 5 Counter Result --> ', result7);

    // get part of a string
    await client.set('example', 'Redis is fast');
    const result8 = await client.getrange('example', 0, 4);
    console.log('Partial string --> ', result8);

    // overwrite a string
    await client.setrange('example', 9, 'awesome');
    const result9 = await client.get('example');
    console.log('Overwritten string --> ', result9);

    // string length
    const result10 = await client.strlen('example');
    console.log('String length --> ', result10);

    // delete keys
    await client.del('msg:6');

    const result11 = await client.get('msg:6');
    console.log('Deleted msg:6 --> ', result11);
}

init();