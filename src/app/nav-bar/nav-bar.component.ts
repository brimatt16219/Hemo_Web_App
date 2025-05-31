import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true
})
export class NavBarComponent {
  username: string = 'User';

  constructor(private router: Router, private globalService: GlobalService) {
    this.username = this.globalService.getUsername(); // dynamically set
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
