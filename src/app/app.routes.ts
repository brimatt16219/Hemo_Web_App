import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CvrcaseAttemptsComponent } from './cvr/cvrcase-attempts/cvrcase-attempts.component';
import { CvrcasesComponent } from './cvr/cvrcases/cvrcases.component';
import { CvrflashcardAttemptsComponent } from './cvr/cvrflashcard-attempts/cvrflashcard-attempts.component';
import { CvrflashcardsComponent } from './cvr/cvrflashcards/cvrflashcards.component';
import { CvrquizAttemptsComponent } from './cvr/cvrquiz-attempts/cvrquiz-attempts.component';
import { CvrquizesComponent } from './cvr/cvrquizes/cvrquizes.component';
import { DrhemoAnswersComponent } from './drhemo/drhemo-answers/drhemo-answers.component';
import { DrhemoAttemptsComponent } from './drhemo/drhemo-attempts/drhemo-attempts.component';
import { DrhemoPuzzlestepsComponent } from './drhemo/drhemo-puzzlesteps/drhemo-puzzlesteps.component';

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
    { path: 'drhemo-attempts', component: DrhemoAttemptsComponent},
    { path: 'drhemo-puzzlesteps', component: DrhemoPuzzlestepsComponent}
];