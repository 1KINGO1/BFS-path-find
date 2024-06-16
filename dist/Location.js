export default class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getNext(xDirection, yDirection, locationList) {
        const nextLocation = locationList.find(location => location.x === this.x + xDirection && location.y === this.y + yDirection);
        return nextLocation || null;
    }
}
