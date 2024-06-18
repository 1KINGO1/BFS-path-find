import ITile from './core/interface/ITile';
import Location from './Location';

export default class Tile implements ITile {
	name: string;
	location: Location;
	isPassable: boolean;

	element: HTMLElement | null = null

	constructor(name: string, location: Location, isPassable: boolean) {
		this.name = name;
		this.location = location;
		this.isPassable = isPassable;
	}

	render(wrapper: HTMLElement) {

		if (this.element) {
			this.element.remove();
		}

		const tile = document.createElement('div');
		this.element = tile;
		tile.classList.add('tile');
		if (!this.isPassable) {
			tile.classList.add('blocked');
		}

		tile.innerText = this.name;

		wrapper.appendChild(tile);
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