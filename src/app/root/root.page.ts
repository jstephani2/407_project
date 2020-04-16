import { Component } from '@angular/core';
import { TrackerManager } from 'src/providers/tracker-manager';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class RootPage {

    constructor(
        protected trackerManager: TrackerManager
    ) {
        trackerManager.getTrackersFromLocalStorage().then((trackers) => {
            //this.trackers = trackers;
        });
    }
}
