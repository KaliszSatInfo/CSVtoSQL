var fs = require('fs');
var csvParser = require('csv-parser');

/*
-----------------------------------------------------------------
const readData = fs.readFileSync('txt.txt', 'utf-8');
console.log(readData);

const writeData = fs.appendFileSync('txt.txt','\nBorgir');
-----------------------------------------------------------------
*/
/*
-----------------------------------------------------------------
const inputFile = 'input.csv';
const results = [];

fs.createReadStream(inputFile)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);

    const output = fs.createWriteStream(inputFile, { flags: 'a' });

    results.forEach(row => {
        const rowData = Object.values(row).join(',');
        output.write('\n'+rowData);
    });
});
-----------------------------------------------------------------
*/

const inputFile = 'input.csv';
const outputFile = 'output.sql';
const tableName = 'brothers';

const results = [];

fs.createReadStream(inputFile)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    
    const headers = Object.keys(results[0]);
    const statements = results.map(row => {
        const values = headers.map(h => `'${(row[h] || '').replace(/'/g, "''")}'`);
        return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values.join(', ')});`;
    });

    const stats = fs.statSync(outputFile);
    alreadyEntry = stats.size > 0;

    if (alreadyEntry) {
        fs.appendFileSync(outputFile, '\n' + statements.join('\n'), 'utf-8');
    } else {
        fs.writeFileSync(outputFile, statements.join('\n'), 'utf-8');
    }
});