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
}
