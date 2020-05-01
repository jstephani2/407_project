
import { Injectable } from '@angular/core';

@Injectable()

export class Tracker {

	public measures: any[] = [];

	public name: string = "";

	public reason: string = "";

	public icon: string = "";

	public category: string = "";

	public id: number = -1;

	constructor() {

	}

	buildFromObject(object: any) {
		this.measures = object.measures;
		this.name = object.name;
		this.reason = object.reason;
		this.icon = object.icon;
		this.category = object.category;
		this.id = object.id;
	}

	addMeasures(measures: any[]): void {
		for (var ind in measures) {
			this.measures.push(measures[ind]);
		}
	}

	getMeasures(): any[] {
		return this.measures;
	}
}