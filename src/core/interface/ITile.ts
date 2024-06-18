import ILocation from './ILocation';

export default interface ITile {
	location: ILocation;
	isPassable: boolean;

	markAsPassed(): void;
	markAsSelected(): void;
	unmarkAsSelected(): void;
}