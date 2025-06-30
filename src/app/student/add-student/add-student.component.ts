// add-student.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

      this.http.post('http://localhost:5295/api/login/AddStudent', null, { params, responseType: 'text' }).subscribe({
        next: (res: any) => {
          this.message = res;
        },
        error: (err) => {
          console.error('Add student failed:', err);
          this.message = err.error.Message || "Server error occured";
        }
      });
    }
  }
}
