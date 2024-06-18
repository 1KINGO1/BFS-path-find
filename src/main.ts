import BFSPathFinder from './core/path-finder/BFSPathFinder';
import Tile from './Tile.js';
import Location from './Location.js';

const gridWrapper = document.getElementById('wrapper') as HTMLElement;

const locations = new Array(16 * 16)
	.fill(null)
	.map((_, index) =>
		new Location(index % 16, Math.floor(index / 16))
	);


const entries: [Location, Tile][] = locations.map(location =>
	[location, new Tile(`Tile ${location.x} ${location.y}`,location, Math.random() > 0.2)]
);
entries.forEach(([_, tile]) => {
	tile.render(gridWrapper);
})


const tileList = new Map(entries);

const pathFinder = new BFSPathFinder<Tile>(locations, tileList);
const path = pathFinder.findPath(tileList.get(locations[0]) as Tile, tileList.get(locations[locations.length - 1]) as Tile);
path.then(path => path.forEach(tile => tile.markAsPath()));
