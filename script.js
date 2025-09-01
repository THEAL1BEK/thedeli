let currentFilters = { gender: 'all', category: null, color: null };

// === элементы ===
const menuIcon = document.getElementById('menu-icon');
const menuOverlay = document.getElementById('menu-overlay');
const menuClose = document.getElementById('menu-close');

const shopNowBtn = document.getElementById('shop-now-btn');
const banner = document.getElementById('banner');
const catalog = document.getElementById('catalog');

const filterBtn = document.getElementById('filter-btn');
const filterOverlay = document.getElementById('filter-overlay');
const filterCloseBtn = document.getElementById('filter-close');

const sortBtn = document.getElementById('sort-btn');
const sortOptions = document.getElementById('sort-options');

const contactItem = document.getElementById('contact');
const contactOverlay = document.getElementById('contact-overlay');
const contactCloseBtn = document.getElementById('contact-close');
const waMeChat = document.getElementById('wa-me-chat');

const catalogGrid = document.getElementById('catalog-grid');

const productOverlay = document.getElementById('product-overlay');
const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const imageContainer = document.getElementById('image-container');

const backBtn = document.getElementById('back-btn');
const orderBtn = document.getElementById('order-btn');

const filterGender = document.getElementById('filter-gender');
const genderSuboptions = document.getElementById('gender-suboptions');
const filterColor = document.getElementById('filter-color');
const colorSuboptions = document.getElementById('color-suboptions');

// === функции отображения каталога и товара ===
function renderCatalog() {
    catalogGrid.innerHTML = '';
    products.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'catalog-item';
        item.dataset.gender = product.gender;
        item.dataset.winter = product.winter;
        item.dataset.new = product.newIn;
        item.dataset.index = index;
        item.dataset.color = product.color;
        item.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" onerror="this.style.display='none'">
            <div class="item-text">${product.name}<br>₸ ${product.price}</div>
        `;
        item.addEventListener('click', () => showProductDetails(index));
        catalogGrid.appendChild(item);
    });
    applyFilters();
}

function showProductDetails(index) {
    const product = products[index];
    if (!product) return;
    productTitle.textContent = product.name;
    productPrice.textContent = `₸ ${product.price}`;
    imageContainer.innerHTML = '';
    product.images.forEach(src => {
        const img = document.createElement('img');
        img.className = 'product-image';
        img.src = src;
        img.alt = product.name;
        img.onerror = () => img.style.display = 'none';
        imageContainer.appendChild(img);
    });
    productOverlay.style.display = 'flex';
    catalog.style.display = 'none';
    productOverlay.scrollTop = 0;
}

// === применение фильтров ===
function applyFilters() {
    const items = document.querySelectorAll('.catalog-item');
    items.forEach(item => {
        const product = products[item.dataset.index];
        let show = true;
        if (currentFilters.gender !== 'all' && product.gender !== currentFilters.gender) show = false;
        if (currentFilters.color && product.color !== currentFilters.color) show = false;
        if (currentFilters.category && item.dataset[currentFilters.category] !== 'true') show = false;
        item.style.display = show ? 'block' : 'none';
    });
}

// === навигация / фильтрация ===
function handleMenuNavigation(filterType) {
    currentFilters.color = null; // Сбрасываем цвет при выборе из меню
    if (filterType === 'all') {
        currentFilters.gender = 'all';
        currentFilters.category = null;
    } else if (filterType === 'women' || filterType === 'men' || filterType === 'unisex') {
        currentFilters.gender = filterType;
        currentFilters.category = null;
    } else if (filterType === 'new' || filterType === 'winter') {
        currentFilters.category = filterType;
        currentFilters.gender = 'all';
    }
    renderCatalog();
    productOverlay.style.display = 'none';
    banner.style.display = 'none';
    catalog.style.display = 'block';
    menuOverlay.style.display = 'none';
}

// === обработчики ===
menuIcon.addEventListener('click', () => { menuOverlay.style.display = 'flex'; });
menuClose.addEventListener('click', () => { menuOverlay.style.display = 'none'; });

document.getElementById('home').addEventListener('click', () => {
    productOverlay.style.display = 'none';
    catalog.style.display = 'none';
    banner.style.display = 'block';
    menuOverlay.style.display = 'none';
});
document.getElementById('new-in').addEventListener('click', () => handleMenuNavigation('new'));
document.getElementById('women').addEventListener('click', () => handleMenuNavigation('women'));
document.getElementById('men').addEventListener('click', () => handleMenuNavigation('men'));
document.getElementById('winter').addEventListener('click', () => handleMenuNavigation('winter'));

shopNowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    banner.style.display = 'none';
    catalog.style.display = 'block';
    renderCatalog();
});

filterBtn.addEventListener('click', () => {
    filterOverlay.style.display = 'block';
    genderSuboptions.style.display = 'none';
    colorSuboptions.style.display = 'none';
});
filterCloseBtn.addEventListener('click', () => {
    filterOverlay.style.display = 'none';
    genderSuboptions.style.display = 'none';
    colorSuboptions.style.display = 'none';
});

document.getElementById('filter-all').addEventListener('click', () => {
    currentFilters.gender = 'all';
    currentFilters.color = null;
    renderCatalog();
    filterOverlay.style.display = 'none';
    genderSuboptions.style.display = 'none';
    colorSuboptions.style.display = 'none';
});
document.getElementById('filter-women').addEventListener('click', () => {
    currentFilters.gender = 'women';
    currentFilters.color = null;
    renderCatalog();
    filterOverlay.style.display = 'none';
    genderSuboptions.style.display = 'none';
    colorSuboptions.style.display = 'none';
});
document.getElementById('filter-men').addEventListener('click', () => {
    currentFilters.gender = 'men';
    currentFilters.color = null;
    renderCatalog();
    filterOverlay.style.display = 'none';
    genderSuboptions.style.display = 'none';
    colorSuboptions.style.display = 'none';
});
document.getElementById('filter-unisex').addEventListener('click', () => {
    currentFilters.gender = 'unisex';
    currentFilters.color = null;
    renderCatalog();
    filterOverlay.style.display = 'none';
    genderSuboptions.style.display = 'none';
    colorSuboptions.style.display = 'none';
});

filterGender.addEventListener('click', () => {
    genderSuboptions.style.display = (genderSuboptions.style.display === 'block') ? 'none' : 'block';
    colorSuboptions.style.display = 'none';
});

filterColor.addEventListener('click', () => {
    colorSuboptions.style.display = (colorSuboptions.style.display === 'block') ? 'none' : 'block';
    genderSuboptions.style.display = 'none';
});

document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedColor = option.querySelector('.color-circle').getAttribute('data-color');
        currentFilters.color = selectedColor;
        applyFilters();
        colorSuboptions.style.display = 'none';
        filterOverlay.style.display = 'none';
    });
});

// сортировка
function showAllItems() { document.querySelectorAll('.catalog-item').forEach(i => i.style.display = 'block'); }
document.getElementById('sort-relevance').addEventListener('click', () => { showAllItems(); sortOptions.style.display = 'none'; });
document.getElementById('sort-high-to-low').addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.catalog-item'));
    items.sort((a, b) => parseInt(b.querySelector('.item-text').textContent.split('₸')[1]) - parseInt(a.querySelector('.item-text').textContent.split('₸')[1]));
    items.forEach(i => catalogGrid.appendChild(i));
    sortOptions.style.display = 'none';
});
document.getElementById('sort-low-to-high').addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.catalog-item'));
    items.sort((a, b) => parseInt(a.querySelector('.item-text').textContent.split('₸')[1]) - parseInt(b.querySelector('.item-text').textContent.split('₸')[1]));
    items.forEach(i => catalogGrid.appendChild(i));
    sortOptions.style.display = 'none';
});

sortBtn.addEventListener('click', (e) => { e.stopPropagation(); sortOptions.style.display = (sortOptions.style.display === 'block') ? 'none' : 'block'; });
document.addEventListener('click', (e) => { if (!sortBtn.contains(e.target) && !sortOptions.contains(e.target)) sortOptions.style.display = 'none'; });

// контакт
contactItem.addEventListener('click', () => { contactOverlay.style.display = 'flex'; menuOverlay.style.display = 'none'; });
contactCloseBtn.addEventListener('click', () => { contactOverlay.style.display = 'none'; });
waMeChat.addEventListener('click', () => { window.location.href = 'https://wa.me/77470383524'; });

// кнопки товара
backBtn.addEventListener('click', () => { productOverlay.style.display = 'none'; catalog.style.display = 'block'; });
orderBtn.addEventListener('click', () => { window.location.href = 'https://wa.me/77470383524'; });

window.addEventListener('error', (ev) => { /* console.error(ev.message) */ });

// Инициализация
renderCatalog();
