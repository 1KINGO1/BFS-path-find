"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PathFinder_1 = __importDefault(require("./core/PathFinder"));
class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getNext(xDirection, yDirection, locationList) {
        const nextLocation = locationList.find(location => location.x === this.x + xDirection && location.y === this.y + yDirection);
        return nextLocation || null;
    }
}
class Tile {
    constructor(location, isPassable) {
        this.location = location;
        this.isPassable = isPassable;
    }
}
const locations = new Array(8 * 8).map((_, index) => new Location(index % 8, Math.floor(index / 8)));
const tileList = new Map(locations.map(location => [location, new Tile(location, true)]));
const pathFinder = new PathFinder_1.default(locations, tileList);
console.log(pathFinder.findPath(tileList.get(locations[0]), tileList.get(locations[63])));
