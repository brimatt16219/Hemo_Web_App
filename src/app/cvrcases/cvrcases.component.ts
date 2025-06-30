import { Component, OnInit } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent }            from '../nav-bar/nav-bar.component';

interface CvrCase {
  Cid:         number;
  Section:     number;
  Description: string;
  Rhythm:      string;
  Answer:      string;
  ResponseA:   string;
  ResponseB:   string;
  ResponseC:   string;
}

@Component({
  selector:    'app-cvrcases',
  standalone:  true,
  imports:     [ CommonModule, HttpClientModule, NavBarComponent ],
  templateUrl: './cvrcases.component.html',
  styleUrls:   ['./cvrcases.component.css']
})
export class CvrcasesComponent implements OnInit {
  cases: CvrCase[]    = [];
  errorMessage = '';

  // matches [Route("GetCvrCases")]
  private apiUrl = 'http://localhost:5295/api/CvrCases/GetCvrCases';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl, { responseType: 'text' }).subscribe({
      next: txt => {
        try {
          // strip off the "All Cases:  " prefix
          const start = txt.indexOf('[');
          const end   = txt.lastIndexOf(']') + 1;
          const json  = txt.substring(start, end);
          this.cases = JSON.parse(json) as CvrCase[];
        } catch (e) {
          console.error('Invalid JSON from GetCvrCases:', e, txt);
          this.errorMessage = 'Server returned invalid data.';
        }
      },
      error: err => {
        console.error('Failed to fetch CVR cases:', err);
        this.errorMessage = 'Failed to load CVR cases.';
      }
    });
  }

  downloadCSV(): void {
    if (!this.cases.length) return;

    const headers = [
      'CID','Section','Description',
      'Rhythm','Answer','ResponseA','ResponseB','ResponseC'
    ];
    const rows = this.cases.map(c => [
      c.Cid, c.Section, c.Description,
      c.Rhythm, c.Answer, c.ResponseA, c.ResponseB, c.ResponseC
    ]);

    const csv =
      headers.join(',') + '\r\n' +
      rows.map(r => r.map(v => `"${v}"`).join(',')).join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cvrcases.csv';
    link.click();
  }
}
