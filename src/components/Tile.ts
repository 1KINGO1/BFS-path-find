import ITile from './core/interface/ITile';
import Location from './Location';

export default class Tile implements ITile {
	name: string;
	location: Location;
	isPassable: boolean;

	element: SVGRectElement;

	constructor(name: string, location: Location, isPassable: boolean) {
		this.name = name;
		this.location = location;
		this.isPassable = isPassable;

		const tile = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.element = tile;
		tile.classList.add('tile');
		tile.classList.add(`tile-variant-${Math.floor(Math.random() * 4) + 1}`)

		if (!isPassable) {
			tile.classList.add('blocked');
		}
	}

	switchPassable() {
		this.isPassable = !this.isPassable;
		this.element.classList.toggle('blocked');
	}
	getElement(){
		return this.element;
	}

	markAsPath() {
		this.element?.classList.add('path');
	}
	markAsPassed() {
		this.element?.classList.add('passed');
	}
	markAsSelected() {
		this.element?.classList.add('selected');
	}
	unmarkAsSelected() {
		this.element?.classList.remove('selected');
	}
}