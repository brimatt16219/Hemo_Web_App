import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../../nav-bar/nav-bar.component';

@Component({
  selector:    'app-cvrflashcard-attempts',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './cvrflashcard-attempts.component.html',
  styleUrls:   ['./cvrflashcard-attempts.component.css']
})
export class CvrflashcardAttemptsComponent implements OnInit {
  attempts: any[]    = [];
  columns: string[]  = [];
  errorMessage = '';

  // adjust if your controller is CvrCasesController vs CvrFlashcardsController
  private apiUrl = 'http://localhost:5295/api/CvrFlashCard/GetCVRFlashcardAttempt';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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
          console.error('Invalid JSON from GetCvrFlashcards:', e, txt);
          this.errorMessage = 'Server returned invalid data.';
        }
      },
      error: err => {
        console.error('Failed to fetch CVR flashcard attempts:', err);
        this.errorMessage = 'Failed to load CVR flashcard attempts.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.attempts.length) return;

    const headerLine = this.columns.join(',');
    const dataLines  = this.attempts.map(row =>
      this.columns
        .map(col => `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    );

    const csvContent = [headerLine, ...dataLines].join('\r\n');
    const blob       = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link       = document.createElement('a');
    link.href        = URL.createObjectURL(blob);
    link.download    = 'cvrflashcardattempts.csv';
    link.click();
  }
}
