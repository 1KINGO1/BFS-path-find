import ILocation from './core/interface/ILocation';

export default class Location implements ILocation{
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getNext(xDirection: number, yDirection: number, locationList: Location[]): Location | null {
		const nextLocation = locationList.find(location => location.x === this.x + xDirection && location.y === this.y + yDirection);
		return nextLocation || null;
	}

}