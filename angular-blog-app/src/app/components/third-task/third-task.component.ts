import {Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-third-task',
  templateUrl: './third-task.component.html',
  styleUrl: './third-task.component.scss'
})
export class ThirdTaskComponent implements OnInit{
  user: any;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    if(this.auth.user$) {
      this.auth.user$.subscribe(data => {
        this.user = data;
      })
    }
  }
}
