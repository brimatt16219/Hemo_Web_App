import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Use SQL login endpoint instead of SID/pass from students table
      const params = {
        username: username,
        password: password
      };

      this.http.post<any>('http://localhost:5295/api/login/SqlLogin', null, { params }).subscribe({
        next: (res) => {
          if (res?.message?.toLowerCase().includes('login successful')) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = res.message || 'Login failed.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Server error occurred.';
          console.error(err);
        }
      });
    }
  }
}
