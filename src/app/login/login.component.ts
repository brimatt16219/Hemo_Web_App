import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import Router

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
    private router: Router // ✅ Inject Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const params = {
        SID: username,
        pass: password
      };

      this.http.get<any>('http://localhost:5295/api/login/login', { params }).subscribe({
        next: (res) => {
          if (res?.Sid) {
            alert('Login successful!');
            this.router.navigate(['/dashboard']); // ✅ Redirect to dashboard
          } else {
            this.errorMessage = res.ErrorMessage || 'Login failed.';
            console.log(this.errorMessage)
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
