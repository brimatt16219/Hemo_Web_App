import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../nav-bar/nav-bar.component';

interface CvrCaseAttempt {
  caseAttemptId: number;
  cid:           number;
  sid:           string;
  grade:         number;
  timeSpent:     string;  // e.g. "00:00:12.0000000"
  answer:        string;
  login:         number;
}


@Component({
  selector:    'app-cvrcase-attempts',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './cvrcase-attempts.component.html',
  styleUrls:   ['./cvrcase-attempts.component.css']
})
export class CvrcaseAttemptsComponent implements OnInit {
  attempts: CvrCaseAttempt[] = [];
  errorMessage = '';
  
  private apiUrl = 'http://localhost:5295/api/CvrCases/GetCvrCaseAttempt';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // mirror your GetStudents call, but force text and parse the JSON-string
    this.http
      .get(this.apiUrl, { responseType: 'text' })
      .subscribe({
        next: (txt) => {
          try {
            this.attempts = JSON.parse(txt) as CvrCaseAttempt[];
            // console.log('Parsed attempts array:', this.attempts);
          } catch (e) {
            console.error('Failed to parse JSON from GetCvrCaseAttempt:', e, txt);
            this.errorMessage = 'Server returned invalid data.';
          }
        },
        error: (err) => {
          console.error('Failed to fetch CVR case attempts:', err);
          this.errorMessage = 'Failed to load CVR case attempts.';
        }
      });
  }

  downloadCSV(): void {
    if (!this.attempts.length) return;

    const headers = ['CAID','CID','SID','Grade','TimeSpent','Answer','Login'];
    const rows = this.attempts.map(a => [
      a.caseAttemptId, a.cid, a.sid,
      a.grade, a.timeSpent, a.answer, a.login
    ]);

    const csv =
      headers.join(',') + '\r\n' +
      rows.map(r => r.map(v => `"${v}"`).join(',')).join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cvrcaseattempts.csv';
    link.click();
  }
}
