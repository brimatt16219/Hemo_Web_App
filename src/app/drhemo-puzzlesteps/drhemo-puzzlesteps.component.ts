import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../nav-bar/nav-bar.component';

@Component({
  selector:    'app-drhemo-puzzlesteps',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './drhemo-puzzlesteps.component.html',
  styleUrls:   ['./drhemo-puzzlesteps.component.css']
})
export class DrhemoPuzzlestepsComponent implements OnInit {
  steps: any[]     = [];
  columns: string[] = [];
  errorMessage = '';

  // matches your controller: GET api/hemoUpdatePuzzleStep/GetHemoPuzzleStep
  private apiUrl = 'http://localhost:5295/api/hemoUpdatePuzzleStep/GetHemoPuzzleStep';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // API returns a JSON-string via JsonConvert.SerializeObject(...)
    this.http.get(this.apiUrl, { responseType: 'text' }).subscribe({
      next: txt => {
        try {
          // strip off any prefix, keep only the JSON array
          const start = txt.indexOf('[');
          const end   = txt.lastIndexOf(']') + 1;
          const json  = txt.substring(start, end);
          const data  = JSON.parse(json) as any[];
          this.steps = data;
          if (data.length) {
            this.columns = Object.keys(data[0]);
          }
        } catch (e) {
          console.error('Invalid JSON from GetHemoPuzzleStep:', e, txt);
          this.errorMessage = 'Server returned invalid data.';
        }
      },
      error: err => {
        console.error('Failed to fetch puzzle steps:', err);
        this.errorMessage = 'Failed to load puzzle steps.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.steps.length) return;

    const headerLine = this.columns.join(',');
    const dataLines  = this.steps.map(row =>
      this.columns
        .map(col => `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = [headerLine, ...dataLines].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'drhemo_puzzlesteps.csv';
    link.click();
  }
}
