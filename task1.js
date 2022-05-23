process.stdin.on('data', (data) => {
    process.stdout.write(`${reverse(data.toString())}\n`);
});

export function reverse(str) {
    return str.split('').reverse().join('');
}