import { Component, inject } from '@angular/core';
import { CsvService } from '../csv.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './output.component.html',
})
export class OutputComponent {
  csvService = inject(CsvService);
  sql$ = this.csvService.sqlOutput$;

  copySQL() {
    this.sql$.subscribe(sql => {
      navigator.clipboard.writeText(sql);
      alert('SQL copied to clipboard!');
    }).unsubscribe();
  }
}