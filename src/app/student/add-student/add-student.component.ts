// add-student.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NavBarComponent],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.studentForm = this.fb.group({
      SID: ['', Validators.required],
      pass: ['', Validators.required],
      classSection: ['', Validators.required],
      appSettings: ['default'],
      loggedIn: [0]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const params = this.studentForm.value;

      this.http.post(`${environment.apiBaseUrl}/login/AddStudent`, null, { params, responseType: 'text' }).subscribe({
        next: (res: any) => {
          this.message = res;
          alert('Student added successfully');
          this.router.navigate(['/dashboard'], { state: { refresh: true } });
        },
        error: (err) => {
          console.error('Add student failed:', err);
          this.message = err.error.Message || "Server error occured";
        }
      });
    }
  }

  selectedFileName: string = '';

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.parseCSVAndUpload(text);
    };
    reader.readAsText(file);
  }

  parseCSVAndUpload(csvData: string): void {
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    lines.shift(); // Skip CSV header row

    lines.forEach(line => {
      const [SID, pass, classSection, appSettings, loggedIn] = line.split(',');

      const newStudent = {
        SID: SID.trim(),
        pass: pass.trim(),
        classSection: classSection.trim(),
        appSettings: appSettings.trim(),
        loggedIn: parseInt(loggedIn.trim()) || 0
      };

      this.http.post(`${environment.apiBaseUrl}/login/AddStudent`, null, {
        params: newStudent,
        responseType: 'text'
      }).subscribe({
        next: () => {
          this.message = 'CSV students uploaded successfully.';
          alert('CSV added successfully');
          this.router.navigate(['/dashboard'], { state: { refresh: true } });
        },
        error: (err) => {
          console.error('Failed to add student from CSV:', err);
          this.message = 'Failed to add some students. Check console for details.';
        }
      });
    });
  }

}
