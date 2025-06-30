import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../nav-bar/nav-bar.component';

@Component({
  selector:    'app-drhemo-answers',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './drhemo-answers.component.html',
  styleUrls:   ['./drhemo-answers.component.css']
})
export class DrhemoAnswersComponent implements OnInit {
  answers: any[]    = [];
  columns: string[] = [];
  errorMessage = '';

  // your GET api/hemoSubmitAttempt/GetHemoAnswers
  private apiUrl = 'http://localhost:5295/api/hemoSubmitAttempt/GetHemoAnswers';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: data => {
        this.answers = data;
        if (data.length) {
          this.columns = Object.keys(data[0]);
        }
      },
      error: err => {
        console.error('Failed to fetch Hemo answers:', err);
        this.errorMessage = 'Failed to load answers.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.answers.length) return;

    const headerLine = this.columns.join(',');
    const dataLines  = this.answers.map(row =>
      this.columns
        .map(col => `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    );

    const csv = [headerLine, ...dataLines].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'drhemo_answers.csv';
    link.click();
  }
}
