import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../../nav-bar/nav-bar.component';
import { environment } from '../../../environments/environment';

@Component({
  selector:    'app-drhemo-attempts',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './drhemo-attempts.component.html',
  styleUrls:   ['./drhemo-attempts.component.css']
})
export class DrhemoAttemptsComponent implements OnInit {
  attempts: any[]    = [];
  columns: string[]  = [];
  errorMessage = '';

  // matches your controller’s route for drhemo_attempts
  private apiUrl = `${environment.apiBaseUrl}/hemoUpdateAttempt/GetHemoAttempts`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // API returns a JSON‐string payload via JsonConvert.SerializeObject(...)
    this.http.get(this.apiUrl, { responseType: 'text' }).subscribe({
      next: txt => {
        try {
          // strip any human-readable prefix, keep only the JSON array
          const start = txt.indexOf('[');
          const end   = txt.lastIndexOf(']') + 1;
          const json  = txt.substring(start, end);
          const data  = JSON.parse(json) as any[];
          this.attempts = data;
          if (data.length) {
            this.columns = Object.keys(data[0]);
          }
        } catch (e) {
          console.error('Invalid JSON from GetHemoAttempts:', e, txt);
          this.errorMessage = 'Server returned invalid data.';
        }
      },
      error: err => {
        console.error('Failed to fetch Hemo attempts:', err);
        this.errorMessage = 'Failed to load attempts.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.attempts.length) return;

    const headerLine = this.columns.join(',');
    const dataLines  = this.attempts.map(row =>
      this.columns.map(col =>
        `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`
      ).join(',')
    );
    const csvContent = [headerLine, ...dataLines].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'drhemo_attempts.csv';
    link.click();
  }
}
