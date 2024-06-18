import ITile from '../interface/ITile';
import ILocation from '../interface/ILocation';
import ITileWithParent from '../interface/ITileWithParent';
import IPathFinder from '../interface/IPathFinder';

export default class BFSPathFinder<Tile extends ITile> implements IPathFinder<Tile>	{
	private readonly locations: ILocation[];
	private readonly tileList: Map<ILocation, Tile | null>;

	private readonly tickDelay: number = 50;

	constructor(locations: ILocation[], tileList: Map<ILocation, Tile | null>) {
		this.locations = locations;
		this.tileList = tileList;
	}



	public async findPath(start: Tile, end: Tile): Promise<Tile[]>{

		const startTile = {tile: start, parent: null};
		const processTilesQueue: ITileWithParent<Tile>[] = [startTile];
		const processedTiles = new Set<Tile>();

		while(processTilesQueue.length > 0) {
			const currentTile = processTilesQueue.shift() as ITileWithParent<Tile>;

			currentTile.tile.markAsSelected();

			await new Promise(resolve => setTimeout(resolve, this.tickDelay));

			currentTile.tile.unmarkAsSelected();

			if (processedTiles.has(currentTile.tile)) {
				continue;
			}

			if (!currentTile.tile.isPassable) {
				this.makeTilePassed(processedTiles, currentTile.tile);
				continue;
			}

			if (currentTile.tile === end) {
				return this.getTilePath(startTile, currentTile);
			}

			const neighbours = this.getNeighbours(currentTile.tile).filter(neighbour => !processedTiles.has(neighbour));
			processTilesQueue.push(...neighbours.map(neighbour => ({tile: neighbour, parent: currentTile})));

			this.makeTilePassed(processedTiles, currentTile.tile);
		}

		return [];
	}

	private makeTilePassed(processedTiles: Set<Tile>, tile: Tile): void {
		processedTiles.add(tile);
		tile.markAsPassed();
	}
	private getNeighbours(tile: Tile): Tile[] {
		const neighbours: Tile[] = [];

		for (let x = -1; x < 2; x++) {
			for (let y = -1; y < 2; y++) {

				if (x === y || x === -y) {
					continue;
				}

				const location: ILocation | null = tile.location.getNext(x, y, this.locations);

				if (location) {
					neighbours.push(this.tileList.get(location) as Tile);
				}

			}
		}

		return neighbours;
	}
	private getTilePath(start: ITileWithParent<Tile>, end: ITileWithParent<Tile>): Tile[] {
		const path: Tile[] = [];

		let currentTile: ITileWithParent<Tile> | null = end;

		while(currentTile !== start && currentTile !== null) {
			path.push(currentTile.tile);
			currentTile = currentTile.parent;
		}

		path.push(start.tile);

		return path.reverse();
	}
}