import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datagraphics',
  templateUrl: './datagraphics.page.html',
  styleUrls: ['./datagraphics.page.scss'],
})
export class DatagraphicsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  return() {
    this.router.navigateByUrl("");
  }

}
