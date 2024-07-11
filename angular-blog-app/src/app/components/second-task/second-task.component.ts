import { Component } from '@angular/core';

@Component({
  selector: 'app-second-task',
  templateUrl: './second-task.component.html',
  styleUrl: './second-task.component.scss',
})
export class SecondTaskComponent {
  scrollTo(el: HTMLElement) {
    el.scrollIntoView();
  }
}
