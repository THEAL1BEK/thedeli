// Логика каталога
const catalog = document.getElementById('catalog');

// Создание сетки каталога
const catalogGrid = document.createElement('div');
catalogGrid.className = 'catalog-grid';

const products = [
    { src: 'product1.jpg', text: 'Название товара 1<br>Цена: $99' },
    { src: 'product2.jpg', text: 'Название товара 2<br>Цена: $129' },
    { src: 'product3.jpg', text: 'Название товара 3<br>Цена: $89' },
    { src: 'product4.jpg', text: 'Название товара 4<br>Цена: $149' },
    { src: 'product5.jpg', text: 'Название товара 5<br>Цена: $109' },
    { src: 'product6.jpg', text: 'Название товара 6<br>Цена: $119' }
];

products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'catalog-item';
    item.innerHTML = `<img src="${product.src}" alt="Product"><div class="item-text">${product.text}</div>`;
    catalogGrid.appendChild(item);
});

// Создание панели фильтров и сортировки
const filterSort = document.createElement('div');
filterSort.className = 'filter-sort';
filterSort.innerHTML = '<span>Filter</span><span>Sort by</span>';

catalog.appendChild(filterSort);
catalog.appendChild(catalogGrid);
