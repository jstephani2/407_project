import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()

export class TrackerManager {
    protected LOCAL_STORAGE_KEY: string = "trackers";

    constructor(
        protected storage: Storage
    ) { }

    getTrackersFromLocalStorage(): Promise<any> {
        return this.storage.get(this.LOCAL_STORAGE_KEY);
    }

    saveTrackerToLocalStorage(tracker: any): Promise<any> {
        return this.getTrackersFromLocalStorage()
            .then((trackers) => {
                if (!trackers) {
                    trackers = [];
                }

                trackers.push(tracker);
                return this.storage.set(this.LOCAL_STORAGE_KEY, trackers);
            });
    }
}