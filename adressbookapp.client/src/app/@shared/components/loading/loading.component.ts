import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state(
        'in',
        style({
          opacity: 1
        })
      ),
      state(
        'out',
        style({
          opacity: 0
        })
      ),
      transition('in => out', animate('600ms ease-in')),
      transition('out => in', animate('600ms ease-out'))
    ])
  ]
})
export class LoadingComponent implements OnInit {
  trigger = true;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.trigger = !this.trigger;
    }, 1200);
  }
}
