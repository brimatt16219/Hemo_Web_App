import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CvrcaseAttemptsComponent } from './cvrcase-attempts/cvrcase-attempts.component';
import { CvrcasesComponent } from './cvrcases/cvrcases.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'add-student', component: AddStudentComponent },
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'cvrcase-attempts', component: CvrcaseAttemptsComponent},
    { path: 'cvrcases', component: CvrcasesComponent}
];