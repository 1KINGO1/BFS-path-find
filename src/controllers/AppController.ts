import Board from '../ui/Board';
import Location from '../Location';
import Tile from '../Tile';
import BFSPathFinder from '../core/path-finder/BFSPathFinder';
import IPathFinder from '../core/interface/IPathFinder';

export default class AppController {

	private readonly tileCountX: number = 16;
	private readonly boardSize: number = 600;

	init() {
		const board = new Board(this.boardSize, this.tileCountX);

		const [tilesX, tilesY] = this.getTilesCount(this.boardSize);

		const locations = new Array(tilesX * tilesY)
			.fill(null)
			.map((_, index) =>
				new Location(index % tilesX, Math.floor(index / tilesX))
			);

		const entries: [Location, Tile][] = locations.map(location =>
			[location, new Tile(`tile-${location.x}-${location.y}`, location, Math.random() > 0.2)]
		);
		entries.forEach(([_, tile]) => {
			board.renderTile(tile);
			this.addTileEventListener(tile);
		})

		const tileList = new Map(entries);

		const pathFinder: IPathFinder<Tile> = new BFSPathFinder<Tile>(locations, tileList);
		const path = pathFinder.findPath(tileList.get(locations[0]) as Tile, tileList.get(locations[locations.length - 1]) as Tile);
		path.then(path => path.forEach(tile => tile.markAsPath()));
	}
	private getTilesCount(size: number): [number, number] {
		const tileSize = size / this.tileCountX;
		const tilesY = Math.floor(size / tileSize);
		return [this.tileCountX, tilesY];
	}
	private addTileEventListener(tile: Tile){
		tile.getElement().addEventListener('click', () => {
			tile.switchPassable()
		});
	}
}