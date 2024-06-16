var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class PathFinder {
    constructor(locations, tileList) {
        this.tickDelay = 50;
        this.locations = locations;
        this.tileList = tileList;
    }
    findPath(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTile = { tile: start, parent: null };
            const processTilesQueue = [startTile];
            const processedTiles = new Set();
            while (processTilesQueue.length > 0) {
                const currentTile = processTilesQueue.shift();
                currentTile.tile.markAsSelected();
                yield new Promise(resolve => setTimeout(resolve, this.tickDelay));
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
                processTilesQueue.push(...neighbours.map(neighbour => ({ tile: neighbour, parent: currentTile })));
                this.makeTilePassed(processedTiles, currentTile.tile);
            }
            return [];
        });
    }
    makeTilePassed(processedTiles, tile) {
        processedTiles.add(tile);
        tile.markAsPassed();
    }
    getNeighbours(tile) {
        const neighbours = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (x === y || x === -y) {
                    continue;
                }
                const location = tile.location.getNext(x, y, this.locations);
                if (location) {
                    neighbours.push(this.tileList.get(location));
                }
            }
        }
        return neighbours;
    }
    getTilePath(start, end) {
        const path = [];
        let currentTile = end;
        while (currentTile !== start && currentTile !== null) {
            path.push(currentTile.tile);
            currentTile = currentTile.parent;
        }
        path.push(start.tile);
        return path.reverse();
    }
}
