import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavBarComponent, EditStudentComponent], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  students: any[] = [];
  errorMessage: string = '';
  showEditModal = false;
  selectedStudent: any = null;

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.http.get<any[]>(`${environment.apiBaseUrl}/Student/GetStudents`).subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.error('Failed to fetch students:', err);
        this.errorMessage = 'Failed to load student data.';
      }
    });
  }

  openEditPopup(student: any) {
    this.selectedStudent = student;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedStudent = null;
  }

  saveEditedStudent(updated: any) {
    this.http.put(`${environment.apiBaseUrl}/Student/UpdateStudent`, updated).subscribe({
      next: () => {
        alert('Student updated');
        this.closeEditModal();
        this.getStudents();
      },
      error: (err) => {
        alert('Update failed');
        console.error(err);
      }
    });
  }

  downloadCSV(): void {
    const headers = ['SID', 'Password', 'Class Section', 'App Settings', 'Logged In'];
    const rows = this.students.map(student =>
      [student.Sid, student.Password, student.ClassSection, student.AppSettings, student.LoggedIn]
    );

    let csvContent = headers.join(',') + '\n' +
                    rows.map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  confirmDelete(student: any) {
    const confirmed = window.confirm(`Are you sure you want to delete student ${student.Sid}?`);
    if (confirmed) {
      this.http.delete(`${environment.apiBaseUrl}/Student/DeleteStudent?SID=${student.Sid}`).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.Sid !== student.Sid);
          alert('Student deleted successfully');
          this.getStudents();
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Student deleted successfully');
          this.getStudents();
        }
      });
    }
  }

  
}
