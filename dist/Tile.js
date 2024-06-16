export default class Tile {
    constructor(name, location, isPassable) {
        this.element = null;
        this.name = name;
        this.location = location;
        this.isPassable = isPassable;
    }
    render(wrapper) {
        if (this.element) {
            this.element.remove();
        }
        const tile = document.createElement('div');
        this.element = tile;
        tile.classList.add('tile');
        if (!this.isPassable) {
            tile.classList.add('blocked');
        }
        tile.innerText = this.name;
        wrapper.appendChild(tile);
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
