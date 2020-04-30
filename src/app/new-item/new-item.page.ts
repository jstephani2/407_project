import { Component, OnInit } from '@angular/core';
import { TrackerManager } from '../../providers/tracker-manager';
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
    protected icon: string;
    protected category: string;

    //protected trackerManager: TrackerManager = new TrackerManager(this.storage);

    constructor(
        //protected storage: Storage,
        protected trackerManager: TrackerManager,
        private router: Router
    ) { }

    ngOnInit() {
    }

    addQuantitativeMeasure(): void {
        var measure = new Measure();
        this.quantitativeMeasures.push(measure);
    }

    addQualitativeMeasure(): void {
        var measure = new Measure();
        this.qualitativeMeasures.push(measure);
    }

    saveTracker(): void {
        var tracker = new Tracker();
        tracker.addMeasures(this.quantitativeMeasures);
        tracker.addMeasures(this.qualitativeMeasures);
        tracker.name = this.trackerName;
        tracker.reason = this.trackerWhy;
        tracker.icon = this.icon;
        tracker.category = this.category;
        let navigationsExtras : NavigationExtras = {
            state: {
                tracker: tracker
            }
        }
        this.trackerManager.saveTrackerToLocalStorage(tracker).then(() => {
            this.router.navigate([''], navigationsExtras);
        });
        
    }

    back() {
      this.router.navigateByUrl("");
    }

}
