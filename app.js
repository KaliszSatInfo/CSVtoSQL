let uploadedFile = null;

document.getElementById('csvFileInput').addEventListener('change', function(e) {
  uploadedFile = e.target.files[0];
  document.getElementById('fileName').textContent = uploadedFile ? uploadedFile.name : 'None';
  document.getElementById('status').textContent = uploadedFile && uploadedFile.name.endsWith('.csv') ? '' : 'Please select a valid CSV file.';
});

document.getElementById('csvForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (!uploadedFile) return alert("Please upload a CSV file.");
  
  const tableName = document.getElementById('tableName').value;

  const reader = new FileReader();
  reader.onload = function(event) {
    const csvContent = event.target.result;
    const separator = getSeparator(csvContent);
    const sql = convertCSVToSQL(csvContent, tableName, separator);
    document.getElementById('sqlOutput').value = sql;
    document.getElementById('status').textContent = 'SQL generated successfully!';
  };
  reader.readAsText(uploadedFile);
});

function getSeparator(csvContent) {
  const separators = [',', ';', '\t', '|'];
  return separators.find(sep => csvContent.split(sep).length > 1) || ',';
}

function convertCSVToSQL(csvContent, tableName, separator) {
  const rows = csvContent.split('\n').map(row => row.split(separator).map(cell => cell.trim()));
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const values = row.map(val => `'${val.replace(/'/g, "''")}'`).join(', ');
    return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values});`;
  }).join('\n');
}

document.getElementById('copyButton').addEventListener('click', function() {
  const sqlOutput = document.getElementById('sqlOutput');
  sqlOutput.select();
  document.execCommand('copy');
});