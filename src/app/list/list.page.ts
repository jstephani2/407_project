import { Component } from '@angular/core';
import { TrackerManager } from 'src/providers/tracker-manager';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage {
    trackers: object[] = [];

    constructor(
        protected trackerManager: TrackerManager
    ) {  }

    ionViewWillEnter(): void {
        this.trackerManager.getTrackersFromLocalStorage().then((trackers) => {
            this.trackers = trackers;
        });
    }
}
