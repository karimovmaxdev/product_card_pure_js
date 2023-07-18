export default function createHTML(context, selectColor) {
    const app = document.querySelector('#app');
    const card = document.createElement('div');
    card.classList.add('p_card');

    // выводим имя продукта, цену, габариты, размеры и баланс
    const propertiesDiv = document.createElement('div');

    const name = document.createElement('p');
    const price = document.createElement('p');
    const balance = document.createElement('p');
    const sale = document.createElement('p');
    const dimensions = document.createElement('p');

    name.classList.add('name');
    price.classList.add('price');
    balance.classList.add('balance');
    sale.classList.add('sale');
    dimensions.classList.add('dimensions');

    name.textContent = `Название: ${context.name}`;
    price.textContent = `Цена: ${context.price}`;
    balance.textContent = `Кол-во: ${context.balance}`;
    sale.textContent = `Скидка: ${context.sale}`;
    dimensions.textContent = `Габариты: длина - ${context.dimensions.length}, ширина - ${context.dimensions.width}, высота - ${context.dimensions.height}, масса - ${context.dimensions.weight}`;
    
    propertiesDiv.appendChild(name);
    propertiesDiv.appendChild(price);
    propertiesDiv.appendChild(balance);
    propertiesDiv.appendChild(sale);
    propertiesDiv.appendChild(dimensions);

    card.appendChild(propertiesDiv)

    //создаем кнопки для выбора цвета
    const colorDiv = document.createElement('div');
    colorDiv.textContent = 'Выбор цвета: ';
    context.colors.forEach(item => {
      const button = document.createElement('button');
      button.textContent = item;
      button.addEventListener('click', selectColor)
      if(item === context.color) button.classList.add('activeBtn');
      colorDiv.appendChild(button)
    });
    card.appendChild(colorDiv);

    // создаем кнопки для выбора размера
    const sizeDiv = document.createElement('div');
    sizeDiv.textContent = 'Выбор размера: ';
    context.specifications.forEach(item => {
      if(!item.status) return;
      if(!item.balance.find(it => it.name === '2-Готовая продукция').count) {
        return;
      }
      const button = document.createElement('button');
      button.textContent = item.name;
      button.addEventListener('click', context.changeSize)
      button.classList.add('sizeBtn');
      if(item.name === context.size) button.classList.add('activeBtn');
      sizeDiv.appendChild(button)
    });
    card.appendChild(sizeDiv);

    // создаем кнопки баланса
    const balanceDiv = document.createElement('div');
    const incrementBtn = document.createElement('button');
    const decrementBtn = document.createElement('button')
    incrementBtn.addEventListener('click', context.increment);
    decrementBtn.addEventListener('click', context.decrement);
    incrementBtn.textContent = '+';
    decrementBtn.textContent = '-';
    balanceDiv.appendChild(decrementBtn);
    balanceDiv.appendChild(incrementBtn);
    card.appendChild(balanceDiv);

    // создаем итоговую цену
    const totalPriceDiv = document.createElement('div');
    const totalPrice = document.createElement('p');
    totalPrice.classList.add('totalPrice');
    totalPrice.textContent = `Итого: ${context.totalPrice}`;

    totalPriceDiv.appendChild(totalPrice);
    card.appendChild(totalPriceDiv)

    // рендерим получившиеся элементы
    app.innerHTML = '';
    app.appendChild(card);
}