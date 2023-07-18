import './style.css';
import data from './model.json';

const app = document.querySelector('#app');

const getMin = function(arr) {
  return arr.reduce(function(acc, curr) {
    return acc.price.count < curr.price.count ? acc : curr;
  });
}


data.product.forEach(it => {
  // создаем элемент и вешаем слушатели
  const card = document.createElement('div');
  card.addEventListener('click', () => {
    window.open(`${window.location.href}product.html?id=${it._id}`, '_self')
  })
  
  const {price: { count } } = getMin(it.specifications); // получаем минимальную цену данного товара

  card.innerHTML = `
    <div class="card">
      <p>Товар: ${it.name}</p>
      <p>Цена: от ${count} RUB</p>
    </div>
  `; // рендерим карточку

  app.appendChild(card);
})

