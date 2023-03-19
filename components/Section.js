export default class Section {
  constructor({items, renderer}, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }
  
  renderItem(item) {
   return this._renderer(item);
  }

  addItem() {
    this._items.forEach(item => {this._container.append(this.renderItem(item))});
  }
}

