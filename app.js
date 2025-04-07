var fs = require('fs');
var readline = require('readline');
var csvParser = require('csv-parser');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) =>
    new Promise((resolve) => rl.question(query, resolve));
  
  (async () => {
      const inputFile = await askQuestion('Input file: ');
      const outputFile = await askQuestion('Output file: ');
      const tableName = await askQuestion('Table name: ');
      const separator = await askQuestion('Separator (e.g. "," or ";"): ');
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

    const alreadyEntry = fs.existsSync(outputFile) && fs.statSync(outputFile).size > 0;


    if (alreadyEntry) {
        fs.appendFileSync(outputFile, '\n' + statements.join('\n'), 'utf-8');
    } else {
        fs.writeFileSync(outputFile, statements.join('\n'), 'utf-8');
    }
    });
})();