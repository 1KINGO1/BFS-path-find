import Board from '../ui/Board';
import Location from '../Location';
import Tile from '../Tile';
import BFSPathFinder from '../core/path-finder/BFSPathFinder';
export default class AppController {
    constructor() {
        this.tileCountX = 16;
        this.boardSize = 600;
    }
    init() {
        const board = new Board(this.boardSize, this.tileCountX);
        const [tilesX, tilesY] = this.getTilesCount(this.boardSize);
        const locations = new Array(tilesX * tilesY)
            .fill(null)
            .map((_, index) => new Location(index % tilesX, Math.floor(index / tilesX)));
        const entries = locations.map(location => [location, new Tile(`tile-${location.x}-${location.y}`, location, Math.random() > 0.2)]);
        entries.forEach(([_, tile]) => {
            board.renderTile(tile);
            this.addTileEventListener(tile);
        });
        const tileList = new Map(entries);
        const pathFinder = new BFSPathFinder(locations, tileList);
        const path = pathFinder.findPath(tileList.get(locations[0]), tileList.get(locations[locations.length - 1]));
        path.then(path => path.forEach(tile => tile.markAsPath()));
    }
    getTilesCount(size) {
        const tileSize = size / this.tileCountX;
        const tilesY = Math.floor(size / tileSize);
        return [this.tileCountX, tilesY];
    }
    addTileEventListener(tile) {
        tile.getElement().addEventListener('click', () => {
            tile.switchPassable();
        });
    }
}
