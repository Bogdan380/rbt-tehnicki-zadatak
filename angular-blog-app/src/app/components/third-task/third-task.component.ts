import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { User } from '../../models/User';

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

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit() {
    if (this.auth.user$) {
      this.auth.user$.subscribe((data) => {
        this.user = data as User;
      });
    }
  }
}
