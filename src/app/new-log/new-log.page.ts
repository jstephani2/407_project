import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Measure } from 'src/providers/measure';
import moment from 'moment';
import { Tracker } from 'src/providers/tracker';

@Component({
  selector: 'app-new-log',
  templateUrl: './new-log.page.html',
  styleUrls: ['./new-log.page.scss'],
})
export class NewLogPage implements OnInit {

  tracker: Tracker;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tracker = new Tracker();
        this.tracker.buildFromObject(this.router.getCurrentNavigation().extras.state.tracker);
      }
    })
  }

  ngOnInit() {
  }

  // Handle clicking an option
  handleOptionClick(measure: Measure, option: string) {
    measure.data[moment().unix()] = option;
  }

  // Delete this tracker and return to home page
  deleteTracker() {
    let navigationExtras : NavigationExtras = {
      state: {
          tracker: this.tracker,
          task: "delete"
      }
    }
    this.router.navigateByUrl("", navigationExtras);
  }

  // Save tracker and return to home page
  handleSaveClick() {
    for (var ind in this.tracker.measures) {
      var measure = this.tracker.measures[ind]
      if (measure.curr_entry != "") {
        measure.data[moment().unix()] = measure.curr_entry;
        measure.curr_entry = "";
      }
    }
    let navigationExtras : NavigationExtras = {
      state: {
          tracker: this.tracker,
          task: "update"
      }
    }
    this.router.navigateByUrl("", navigationExtras);
  }
}
