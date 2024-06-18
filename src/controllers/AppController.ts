import Board from '../components/Board.js';
import Location from '../components/Location.js';
import Tile from '../components/Tile.js';
import BFSPathFinder from '../core/path-finder/BFSPathFinder.js';
import IPathFinder from '../core/interface/IPathFinder';

export default class AppController {

	private readonly tilesX: number = 16;
	private readonly boardSize: number = 600;

	private readonly tileList: Map<Location, Tile>;
	private readonly board: Board;

	constructor() {
		this.board = new Board(this.boardSize, this.tilesX);

		const [locations, tileList] = this.createTileList();
		this.tileList = tileList;
		this.renderTiles();

		this.addChangeTilePassabilityListener();

		const pathFinder: IPathFinder<Tile> = new BFSPathFinder<Tile>(locations, this.tileList);
		const path = pathFinder.findPath(
			this.tileList.get(locations[0]) as Tile,
			this.tileList.get(locations[locations.length - 1]) as Tile
		);
		path.then(path => path.forEach(tile => tile.markAsPath()));
	}

	private createTileList(): [Location[], Map<Location, Tile>]  {
		const locations = new Array(this.tilesX * this.tilesX)
			.fill(null)
			.map((_, index) =>
				new Location(index % this.tilesX, Math.floor(index / this.tilesX))
			);

		const entries: [Location, Tile][] = locations.map(location =>
			[location, new Tile(`tile-${location.x}-${location.y}`, location, Math.random() > 0.2)]
		);

		return [locations, new Map(entries)];
	}
	private renderTiles() {
		this.tileList.forEach(tile => {
			this.board.renderTile(tile);
		});
	}

	private addChangeTilePassabilityListener() {
		let isMouseDown = false;
		let startTileIsPassable: boolean | null = null;
		let changedTiles: Tile[] = [];

		const boardMouseDownListener = (event: MouseEvent) => {
			if (isMouseDown) return;

			isMouseDown = true;
			startTileIsPassable = null;
			changedTiles = [];

			boardMouseHoverListener(event);
			this.board.getElement().addEventListener('mousemove', boardMouseHoverListener);
			window.addEventListener('mouseup', windowMouseUpListener);
		};
		const boardMouseHoverListener = (event: MouseEvent) => {
			if (!isMouseDown) {
				return;
			}

			const tile = this.getTileByEvent(event);

			if (tile && !changedTiles.includes(tile)) {

				if (startTileIsPassable === null) {
					startTileIsPassable = !tile.isPassable;
				}

				changedTiles.push(tile);

				if (startTileIsPassable !== null && startTileIsPassable !== tile.isPassable) {
					tile.togglePassable();
				}
			}
		}
		const windowMouseUpListener = () => {
			isMouseDown = false;
			changedTiles = [];

			this.board.getElement().removeEventListener('mousemove', boardMouseHoverListener);
			window.removeEventListener('mouseup', windowMouseUpListener);
		}

		this.board.getElement().addEventListener('mousedown', boardMouseDownListener);
	}

	private getTileByEvent(event: MouseEvent): Tile | null {
		const x = event.offsetX;
		const y = event.offsetY;
		const width = this.boardSize / this.tilesX;
		const height = this.boardSize / this.tilesX;
		const tileX = Math.floor(x / width);
		const tileY = Math.floor(y / height);

		const tileLocation = Array.from(this.tileList.keys()).find(location => location.isEqual(new Location(tileX, tileY))) || null;
		return tileLocation ? this.tileList.get(tileLocation) || null : null;
	}
}