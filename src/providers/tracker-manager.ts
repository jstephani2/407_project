import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Tracker } from './tracker';

@Injectable()

export class TrackerManager {
    protected LOCAL_STORAGE_KEY: string = "trackers";

    protected trackers: Tracker[] = [];

    protected highest_id: number = 0;

    constructor(
        protected storage: Storage
    ) { }

    // Return array of trackers
    getTrackers(): Tracker[] {
        return this.trackers;
    }

    // Add new tracker
    addTracker(tracker: Tracker) {
        if (tracker.id == -1) {
            this.highest_id++;
            tracker.id = this.highest_id;
        }
        this.trackers.push(tracker);
    }

    // Delete given tracker
    deleteTracker(tracker: Tracker) {
        this.trackers = this.trackers.filter((value) => value.id != tracker.id);
    }

    // Update given tracker
    updateTracker(tracker: Tracker) {
        this.deleteTracker(tracker);
        this.addTracker(tracker);
    }

    // Get trackers from storage
    updateTrackersFromLocalStorage(): Promise<any> {
        return this.storage.get(this.LOCAL_STORAGE_KEY).then((trackers) => {
            for (var ind in trackers) {
                var curr = new Tracker();
                curr.buildFromObject(trackers[ind]);
                this.trackers.push(curr);
                if (curr.id > this.highest_id) {
                    this.highest_id = curr.id;
                }
            }
            return this.trackers;
        });
    }

    // Save tracker array to storage
    saveTrackersToLocalStorage(): Promise<any> {
        return this.storage.set(this.LOCAL_STORAGE_KEY, this.trackers);
    }
}