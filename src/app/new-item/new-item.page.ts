import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Measure } from 'src/providers/measure';
import { Tracker } from 'src/providers/tracker';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.page.html',
    styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {
    protected trackerName: string;
    protected trackerWhy: string;
    protected quantitativeMeasures: Measure[] = [];
    protected qualitativeMeasures: Measure[] = [];
    protected measures: Measure[] = [];
    protected goal: object;
    protected icon: string = "";
    protected category: string;

    constructor(
        private router: Router
    ) {  }

    ngOnInit() {
    }

    // Add quantitative measure to tracker
    addQuantitativeMeasure(): void {
        var measure = new Measure();
        measure.type = "quantitative";
        this.quantitativeMeasures.push(measure);
    }

    // Add Qualitative measure to tracker
    addQualitativeMeasure(): void {
        var measure = new Measure();
        measure.type = "qualitative";
        this.qualitativeMeasures.push(measure);
    }

    // Save tracker and return to home page
    saveTracker(): void {
        var tracker = new Tracker();
        tracker.addMeasures(this.quantitativeMeasures);
        tracker.addMeasures(this.qualitativeMeasures);
        tracker.name = this.trackerName;
        tracker.reason = this.trackerWhy;
        tracker.icon = this.icon;
        tracker.category = this.category;

        let navigationExtras : NavigationExtras = {
            state: {
                tracker: tracker,
                task: "create"
            }
          }
          this.router.navigateByUrl("", navigationExtras);
    }

    back() {
      this.router.navigateByUrl("");
    }

}
