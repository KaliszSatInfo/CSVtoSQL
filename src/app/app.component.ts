import { Component } from '@angular/core';
import { UploadComponent } from "./upload/upload.component";
import { OutputComponent } from "./output/output.component";

@Component({
  selector: 'app-root',
  imports: [UploadComponent, OutputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CSVtoSQL';
}
