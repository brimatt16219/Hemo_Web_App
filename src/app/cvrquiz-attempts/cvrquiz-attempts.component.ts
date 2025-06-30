import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../nav-bar/nav-bar.component';

@Component({
  selector:    'app-cvrquiz-attempts',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './cvrquiz-attempts.component.html',
  styleUrls:   ['./cvrquiz-attempts.component.css']
})
export class CvrquizAttemptsComponent implements OnInit {
  attempts: any[]   = [];
  columns: string[] = [];
  errorMessage = '';

  // your API action
  private apiUrl = 'http://localhost:5295/api/CvrQuiz/GetAllQuizAttempts';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: data => {
        this.attempts = data;
        if (data.length) {
          this.columns = Object.keys(data[0]);
        }
      },
      error: err => {
        console.error('Failed to fetch quiz attempts:', err);
        this.errorMessage = err.error.errorMessage;
      }
    });
  }

  downloadCSV(): void {
    if (!this.attempts.length) return;

    const headerLine = this.columns.join(',');
    const dataLines = this.attempts.map(row =>
      this.columns
        .map(col => `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    );

    const csv = [headerLine, ...dataLines].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quiz-attempts.csv';
    link.click();
  }
}
