import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavBarComponent],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any[] = [];  // ✅ Declare leaderboard
  errorMessage: string = ''; // ✅ Declare errorMessage

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5295/api/HemoGetTopScores/GetTopScores').subscribe({
      next: (res) => {
        this.leaderboard = res;
      },
      error: (err) => {
        console.error('Failed to fetch leaderboard:', err);
        this.errorMessage = 'Failed to load leaderboard data.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.leaderboard.length) return;

    const headers = ['Team Name', 'Time Spent (s)', 'SID 1', 'SID 2', 'SID 3', 'SID 4', 'SID 5'];
    const rows = this.leaderboard.map(team => [
      team.TeamName,
      team.TimeSpent,
      team.Sid1,
      team.Sid2,
      team.Sid3,
      team.Sid4,
      team.Sid5,
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(val => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leaderboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
