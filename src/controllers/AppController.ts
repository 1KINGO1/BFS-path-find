import Board from '../ui/Board.js';
import Location from '../Location.js';
import Tile from '../Tile.js';
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

		const pathFinder: IPathFinder<Tile> = new BFSPathFinder<Tile>(locations, this.tileList);
		const path = pathFinder.findPath(this.tileList.get(locations[0]) as Tile, this.tileList.get(locations[locations.length - 1]) as Tile);
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
}