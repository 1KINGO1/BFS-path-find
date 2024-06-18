import Board from '../ui/Board.js';
import Location from '../Location.js';
import Tile from '../Tile.js';
import BFSPathFinder from '../core/path-finder/BFSPathFinder.js';
export default class AppController {
    constructor() {
        this.tilesX = 16;
        this.boardSize = 600;
        this.board = new Board(this.boardSize, this.tilesX);
        const [locations, tileList] = this.createTileList();
        this.tileList = tileList;
        this.renderTiles();
        const pathFinder = new BFSPathFinder(locations, this.tileList);
        const path = pathFinder.findPath(this.tileList.get(locations[0]), this.tileList.get(locations[locations.length - 1]));
        path.then(path => path.forEach(tile => tile.markAsPath()));
    }
    createTileList() {
        const locations = new Array(this.tilesX * this.tilesX)
            .fill(null)
            .map((_, index) => new Location(index % this.tilesX, Math.floor(index / this.tilesX)));
        const entries = locations.map(location => [location, new Tile(`tile-${location.x}-${location.y}`, location, Math.random() > 0.2)]);
        return [locations, new Map(entries)];
    }
    renderTiles() {
        this.tileList.forEach(tile => {
            this.board.renderTile(tile);
        });
    }
}
