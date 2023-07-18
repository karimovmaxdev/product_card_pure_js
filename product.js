import DATA_MODEL from './model.json';
import createHTML from './render';
import './style.css';

const queryId = new URLSearchParams(window.location.search).get('id');
const currentProduct = DATA_MODEL.product.find(it => it._id === queryId);

class Product { 
  constructor(product, color, size) {
    this._id = product._id;
    this.data = product
    this.name = product.name;
    this.colors = this.colorsNomralize(Object.values(product.color));
    this.color = color || this.colors[0];
    this.specifications = product.specifications;
    this.size = size || product.specifications[0].name;
    this.balance = 0;
    this.setDimensions();
  }

  // меняем размер
  changeSize = (e) => {
    const size = e.target.textContent;
    this.size = size;
    this.balance = 0;
    this.setDimensions();
    this.updateHTML()

  }

  // увеличение баланса
  increment = () => {
    if(this.balance >= this.maxBalance && !DATA_MODEL.podzakaz) return;
    this.balance += 1;
    this.updateHTML()
  }

  // уменьшение баланса
  decrement = () => {
    if(this.balance == 0) return;
    this.balance -= 1;
    this.updateHTML()

  }

  // выставляем размеры (dimensions)
  setDimensions = () => {
    const specDims = Object.values(this.currentSpec.dimensions);
    const modelDims = Object.values(DATA_MODEL.dimensions);

    if(specDims.every(it => it != null)) {
      this.dimensions = this.currentSpec.dimensions
      return
    }
    if(modelDims.every(it => it != null)) {
      this.dimensions = DATA_MODEL.dimensions;
      return
    }
  }

  // нормализуем цвета на случай если цвета повторяются
  colorsNomralize = (arr, idx = 0) => {
    if(idx === 0) arr.sort();
    
    if(idx === arr.length) {
      return arr;
    };

    if(arr.filter(it => it === arr[idx]).length > 1) {
      arr[idx] = `${arr[idx]} ${idx+1}`
    }

    idx += 1;
    return this.colorsNomralize(arr, idx);
  }

  //  максимальный баланс
  get maxBalance() {
    return this.currentSpec.balance.find(it => it.name === '2-Готовая продукция').count;
  }

  // узнаем текущую спецификацию
  get currentSpec() {
    return this.specifications.find(it => it.name === this.size);
  }
  // скидка
  get sale() {
    return this.currentSpec.sale * this.balance || this.currentSpec.sale;
  }
  // цена за штуку
  get price() {
    return this.currentSpec.price.count;
  }
  // общая цена
  get totalPrice() {
    if(this.balance > 0) return this.price * this.balance - this.sale;
    return this.price * this.balance;
  }

  // перерисовываем обновленные значения в html тегах
  updateHTML = () => {
    const allButtons = document.querySelectorAll('.sizeBtn');
    allButtons.forEach(item => {
      item.textContent === this.size ? item.classList.add('activeBtn') : item.classList.remove('activeBtn');
    });
    document.querySelector('.balance').textContent = `Кол-во: ${this.balance}`;
    document.querySelector('.price').textContent = `Цена: ${this.price}`;
    document.querySelector('.totalPrice').textContent = `Итого: ${this.totalPrice}`;
    document.querySelector('.sale').textContent = `Скидка: ${this.sale}`;
    document.querySelector('.dimensions').textContent = `Габариты: длина - ${this.dimensions.length}, ширина - ${this.dimensions.width}, высота - ${this.dimensions.height}, масса - ${this.dimensions.weight}`;
  }

  render = () => {
    createHTML(this, selectColor);
  }

}

// слушатель выбора цвета по клику
// при выборе цвета - создаем новый класс и рендерим карточку
const selectColor = function(e) {
  const color = e.target.textContent;
  model = new Product(currentProduct, color, model.size);
  model.render()
}
  
let model = new Product(currentProduct);
model.render()