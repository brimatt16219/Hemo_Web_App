import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CvrcaseAttemptsComponent } from './cvrcase-attempts/cvrcase-attempts.component';
import { CvrcasesComponent } from './cvrcases/cvrcases.component';
import { CvrflashcardAttemptsComponent } from './cvrflashcard-attempts/cvrflashcard-attempts.component';
import { CvrflashcardsComponent } from './cvrflashcards/cvrflashcards.component';
import { CvrquizAttemptsComponent } from './cvrquiz-attempts/cvrquiz-attempts.component';
import { CvrquizesComponent } from './cvrquizes/cvrquizes.component';
import { DrhemoAnswersComponent } from './drhemo-answers/drhemo-answers.component';
import { DrhemoAttemptsComponent } from './drhemo-attempts/drhemo-attempts.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'add-student', component: AddStudentComponent },
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'cvrcase-attempts', component: CvrcaseAttemptsComponent},
    { path: 'cvrcases', component: CvrcasesComponent},
    { path: 'cvrflashcard-attempts', component: CvrflashcardAttemptsComponent},
    { path: 'cvrflashcards', component: CvrflashcardsComponent},
    { path: 'cvrquizattempts', component: CvrquizAttemptsComponent},
    { path: 'cvrquizes', component: CvrquizesComponent},
    { path: 'drhemo-answers', component: DrhemoAnswersComponent},
    { path: "drhemo-attempts", component: DrhemoAttemptsComponent}
];