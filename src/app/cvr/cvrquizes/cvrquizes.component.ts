import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../../nav-bar/nav-bar.component';
import { environment } from '../../../environments/environment';

@Component({
  selector:    'app-cvrquizes',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './cvrquizes.component.html',
  styleUrls:   ['./cvrquizes.component.css']
})
export class CvrquizesComponent implements OnInit {
  quizzes: any[]   = [];
  columns: string[] = [];
  errorMessage = '';

  // GET api/CvrQuiz/GetAllQuizes
  private apiUrl = `${environment.apiBaseUrl}/CvrQuiz/GetAllQuizes`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: data => {
        this.quizzes = data;
        if (data.length) {
          this.columns = Object.keys(data[0]);
        }
      },
      error: err => {
        console.error('Failed to fetch quizzes:', err);
        this.errorMessage = 'Failed to load quizzes.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.quizzes.length) return;

    const headerLine = this.columns.join(',');
    const dataLines  = this.quizzes.map(row =>
      this.columns
        .map(col => `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    );

    const csvContent = [headerLine, ...dataLines].join('\r\n');
    const blob       = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link       = document.createElement('a');
    link.href        = URL.createObjectURL(blob);
    link.download    = 'cvrquizes.csv';
    link.click();
  }
}
