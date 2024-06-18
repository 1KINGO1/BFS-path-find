export default class Board {
    constructor(size, tileCount) {
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.element.setAttribute('width', size.toString());
        this.element.setAttribute('height', size.toString());
        this.element.id = 'board';
        this.size = size;
        this.tileCount = tileCount;
        const wrapper = document.getElementById('board-wrapper');
        wrapper.appendChild(this.element);
    }
    getElement() {
        return this.element;
    }
    renderTile(tile) {
        const existingTile = this.element.querySelector(`#tile-${tile.location.x}-${tile.location.y}`);
        this.setTileSizeAndPosition(tile);
        if (existingTile) {
            this.element.replaceChild(tile.getElement(), existingTile);
        }
        else {
            this.element.appendChild(tile.getElement());
        }
    }
    setTileSizeAndPosition(tile) {
        const width = this.size / this.tileCount;
        const height = this.size / this.tileCount;
        tile.getElement().setAttribute('x', (tile.location.x * width) + '');
        tile.getElement().setAttribute('y', (tile.location.y * height) + '');
        tile.getElement().setAttribute('width', width + '');
        tile.getElement().setAttribute('height', height + '');
    }
}
