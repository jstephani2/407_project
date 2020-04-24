import { Component, OnInit } from '@angular/core';
import { TrackerManager } from '../../providers/tracker-manager';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.page.html',
    styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {
    protected trackerName: string;
    protected trackerWhy: string;
    protected quantitativeMeasures: object[];
    protected qualitativeMeasures: object[];
    protected goal: object;
    protected icon: string;

    //protected trackerManager: TrackerManager = new TrackerManager(this.storage);

    constructor(
        //protected storage: Storage,
        protected trackerManager: TrackerManager,
        private router: Router
    ) { }

    ngOnInit() {
    }

    addQuantitativeMeasure(): void {

    }

    addQualitativeMeasure(): void {

    }

    saveTracker(): void {
        var tracker = {
            name: this.trackerName,
            reason: this.trackerWhy,
            qualMeasures: this.qualitativeMeasures,
            quantMeasures: this.quantitativeMeasures,
            goal: this.goal,
            icon: this.icon
        }
        this.trackerManager.saveTrackerToLocalStorage(tracker).then(() => {
            this.router.navigate(['']);
        });
        
    }

    return() {
      this.router.navigateByUrl("");
    }

}
