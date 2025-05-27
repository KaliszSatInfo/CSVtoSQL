import { Component, inject } from '@angular/core';
import { CsvService } from '../csv.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  private csvService = inject(CsvService);
  tableName = '';

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.csvService.readFile(file, this.tableName.trim());
    }
  }

  onTableNameChange(newTableName: string) {
    this.csvService.updateTableName(newTableName);
  }
}