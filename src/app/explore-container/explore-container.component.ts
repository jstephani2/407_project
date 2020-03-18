import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  clickCounter : number = 0;

  constructor() { }

  ngOnInit() {}

  onClick() {
    console.log('works');
    this.clickCounter++;
  }

}
