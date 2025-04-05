var fs = require('fs');
var readline = require('readline');
var csvParser = require('csv-parser');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input file: ', (inputFile) => {
rl.question('Output file: ', (outputFile) => {
rl.question('Table name: ', (tableName) => {
rl.question('Separator (e.g. "," or ";"): ', (separator) => {
rl.close();


const results = [];

fs.createReadStream(inputFile)
  .pipe(csvParser({ separator }))
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
});});});});});