// Логика меню
const menuIcon = document.getElementById('menu-icon');
const menuOverlay = document.getElementById('menu-overlay');
const closeBtn = document.querySelector('#menu-overlay .close-btn');

menuIcon.addEventListener('click', () => {
    menuOverlay.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
});

// Добавление списка меню через JavaScript
const menuList = document.createElement('ul');
const menuItems = ['New In', 'Women', 'Men', 'Winter', 'Travel', 'Gifts', 'Contact'];
menuItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    menuList.appendChild(li);
});
menuOverlay.appendChild(menuList);
