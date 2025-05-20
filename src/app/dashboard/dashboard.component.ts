import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  students: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5295/api/Student/GetStudents').subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.error('Failed to fetch students:', err);
        this.errorMessage = 'Failed to load student data.';
      }
    });
  }
}