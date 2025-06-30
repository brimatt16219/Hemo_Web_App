import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../nav-bar/nav-bar.component';

@Component({
  selector:    'app-cvrflashcards',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './cvrflashcards.component.html',
  styleUrls:   ['./cvrflashcards.component.css']
})
export class CvrflashcardsComponent implements OnInit {
  flashcards: any[]   = [];
  columns: string[]   = [];
  errorMessage = '';

  // your GetCvrFlashcards endpoint
  private apiUrl = 'http://localhost:5295/api/CvrFlashCard/GetCvrFlashcards';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl, { responseType: 'text' }).subscribe({
      next: txt => {
        try {
          const start = txt.indexOf('[');
          const end   = txt.lastIndexOf(']') + 1;
          const json  = txt.substring(start, end);
          const data  = JSON.parse(json) as any[];
          this.flashcards = data;
          if (data.length) {
            this.columns = Object.keys(data[0]);
          }
        } catch (e) {
          console.error('Invalid JSON from GetCvrFlashcards:', e, txt);
          this.errorMessage = 'Server returned invalid data.';
        }
      },
      error: err => {
        console.error('Failed to fetch flashcards:', err);
        this.errorMessage = 'Failed to load flashcards.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.flashcards.length) return;

    const headerLine = this.columns.join(',');
    const dataLines  = this.flashcards.map(row =>
      this.columns.map(col =>
        `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`
      ).join(',')
    );

    const csvContent = [headerLine, ...dataLines].join('\r\n');
    const blob       = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link       = document.createElement('a');
    link.href        = URL.createObjectURL(blob);
    link.download    = 'cvrflashcards.csv';
    link.click();
  }
}
