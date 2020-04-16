import { Component } from '@angular/core';
import { TrackerManager } from 'src/providers/tracker-manager';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage {
    trackers: object[] = [];

    constructor(
        protected trackerManager: TrackerManager,
        protected router: Router
    ) {  }

    ionViewWillEnter(): void {
        this.trackerManager.getTrackersFromLocalStorage().then((trackers) => {
            this.trackers = trackers;
        });
    }

    openLogPage(tracker) {
        let navigationExtras: NavigationExtras = {
            state: {
                tracker: tracker
            }
        }
        this.router.navigate(['newLog'], navigationExtras);
    }
}
