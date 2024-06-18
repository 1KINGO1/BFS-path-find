export default interface ILocation {
	x: number;
	y: number;

	getNext(xDirection: number, yDirection: number, locationList: ILocation[]): ILocation | null;
}