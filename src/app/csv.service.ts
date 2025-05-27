import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  csvData$ = new BehaviorSubject<string[][]>([]);
  sqlOutput$ = new BehaviorSubject<string>('');
  private latestData: string[][] = [];

  readFile(file: File, tableName: string) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const rows = text
        .split('\n')
        .map(row => row.split(',').map(cell => cell.trim()));
      this.latestData = rows;
      this.csvData$.next(rows);
      this.generateSQL(rows, tableName);
    };
    reader.readAsText(file);
  }

  generateSQL(data: string[][], tableName: string) {
    if (data.length < 2) return;
    const [headers, ...rows] = data;

    const sql = rows
      .map(row => {
        const values = row.map(val => `'${val.replace(/'/g, "''")}'`).join(', ');
        return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values});`;
      })
      .join('\n');

    this.sqlOutput$.next(sql);
  }

  updateTableName(tableName: string) {
    if (this.latestData.length > 1 && tableName.trim()) {
      this.generateSQL(this.latestData, tableName.trim());
    }
  }
}
