export default class Tile {
    constructor(name, location, isPassable) {
        this.name = name;
        this.location = location;
        this.isPassable = isPassable;
        const tile = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.element = tile;
        tile.classList.add('tile');
        tile.classList.add(`tile-variant-${Math.floor(Math.random() * 4) + 1}`);
        if (!isPassable) {
            tile.classList.add('blocked');
        }
    }
    switchPassable() {
        this.isPassable = !this.isPassable;
        this.element.classList.toggle('blocked');
    }
    getElement() {
        return this.element;
    }
    markAsPath() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add('path');
    }
    markAsPassed() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add('passed');
    }
    markAsSelected() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add('selected');
    }
    unmarkAsSelected() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    }
}
