import { Injectable } from "@angular/core";

@Injectable()

// Object to track measurement data
export class Measure {
	public title: string = "";

	public type: string = "";

	public data: any = { } // {unix_seconds: entry}

	public options: string[] = [ ]

	public units: string = "";

	public curr_entry: string = ""

	constructor() { }

	addData(option: string, time: number): void {
		this.data[time] = option;
	}

}