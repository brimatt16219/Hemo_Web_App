import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  @Input() student: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      Sid: [this.student?.Sid, Validators.required],
      Password: [this.student?.Password, Validators.required],
      ClassSection: [this.student?.ClassSection, Validators.required],
      AppSettings: [this.student?.AppSettings || ''],
      LoggedIn: [this.student?.LoggedIn || 0]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.save.emit(this.studentForm.value);
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
