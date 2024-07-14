import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-third-task',
  templateUrl: './third-task.component.html',
  styleUrl: './third-task.component.scss',
})
export class ThirdTaskComponent implements OnInit {
  user: User = {
    picture: '',
    name: '',
    email: '',
  };

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.user$) {
      this.auth.user$.subscribe((data) => {
        this.user = data as User;
      });
    }
  }

  handleLogout() {
    const currentRoute = this.router.url;
    this.auth.logout({
      logoutParams: { returnTo: 'http://localhost:4200/third-task/blog-posts' },
    });
    sessionStorage.setItem('redirectAfterLogout', currentRoute);
  }
}
