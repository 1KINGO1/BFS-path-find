"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PathFinder {
    constructor(locations, tileList) {
        this.locations = locations;
        this.tileList = tileList;
    }
    findPath(start, end) {
        const startTile = { tile: start, parent: null };
        const processTilesQueue = [startTile];
        const processedTiles = new Set();
        while (processTilesQueue.length > 0) {
            const currentTile = processTilesQueue.shift();
            if (currentTile.tile === end) {
                return this.getTilePath(startTile, currentTile);
            }
            if (processedTiles.has(currentTile.tile)) {
                continue;
            }
            if (!currentTile.tile.isPassable) {
                processedTiles.add(currentTile.tile);
                continue;
            }
            const neighbours = this.getNeighbours(currentTile.tile);
            processTilesQueue.push(...neighbours.map(neighbour => ({ tile: neighbour, parent: currentTile })));
            processedTiles.add(currentTile.tile);
        }
        return null;
    }
    getNeighbours(tile) {
        const neighbours = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (x !== y && x !== -y) {
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
        return path.reverse();
    }
}
exports.default = PathFinder;
