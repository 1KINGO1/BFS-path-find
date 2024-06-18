import Tile from './Tile';

export default class Board {
	private readonly element: SVGSVGElement;
	private readonly size: number;
	private readonly tileCount: number;

	constructor(size: number, tileCount: number) {
		this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.element.setAttribute('width', size.toString());
		this.element.setAttribute('height', size.toString());
		this.element.id = 'board';

		this.size = size;
		this.tileCount = tileCount;

		const wrapper = document.getElementById('board-wrapper') as HTMLElement;
		wrapper.appendChild(this.element);
	}

	getElement() {
		return this.element;
	}

	renderTile(tile: Tile) {
		const existingTile = this.element.querySelector(`#tile-${tile.location.x}-${tile.location.y}`);

		this.setTileSizeAndPosition(tile);

		if (existingTile) {
			this.element.replaceChild(tile.getElement(), existingTile);
		} else {
			this.element.appendChild(tile.getElement());
		}
	}

	clearTiles() {
		this.element.innerHTML = '';
	}

	setTileSizeAndPosition(tile: Tile) {
		const width = this.size / this.tileCount;
		const height = this.size / this.tileCount;

		tile.getElement().setAttribute('x', (tile.location.x * width) + '');
		tile.getElement().setAttribute('y', (tile.location.y * height) + '');
		tile.getElement().setAttribute('width', width + '');
		tile.getElement().setAttribute('height', height + '');
	}
}