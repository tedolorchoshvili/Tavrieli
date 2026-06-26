const filterButtons = document.querySelectorAll('.filter-btn');
const fasisMnishvneloba = document.getElementById('fasisMnishvneloba');
const fasisDiapazoni = document.getElementById('fasisDiapazoni');
const productCards = document.querySelectorAll('#productGrid .produqtisBarati');

let activeCategory = 'all';


function applyFilters() {
    const maxPrice = Number(fasisDiapazoni.value);

    productCards.forEach(card => {
        const matchCat = activeCategory === 'all' || card.dataset.category === activeCategory;
        const matchPrice = Number(card.dataset.price) <= maxPrice;
        card.style.display = (matchCat && matchPrice) ? '' : 'none';
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        applyFilters();
    });
});

fasisDiapazoni.addEventListener('input', () => {
    fasisMnishvneloba.textContent = '₾' + fasisDiapazoni.value;
    applyFilters();
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

let cart = JSON.parse(localStorage.getItem('tavrieli_cart') || '[]');

const dakhurvisGilaki = document.getElementById('dakhurvisGilaki');
const kalatisSia = document.getElementById('kalatisSia');
const kalatisGilaki = document.getElementById('kalatisGilaki');
const carieliKalata = document.getElementById('carieliKalata');
const kalatisFoni = document.getElementById('kalatisFoni');
const kalatisPaneli = document.getElementById('kalatisPaneli');
const jamisRaodenobaEl = document.getElementById('jamisRaodenoba');
const kalatisRaodenobaEl = document.getElementById('kalatisRaodenoba');


function setCartDrawerHeight() {
    kalatisPaneli.style.height = window.innerHeight + 'px';
}

function flashButton(name) {
    document.querySelectorAll('.damatebisGilaki').forEach(btn => {
        if (btn.dataset.name === name) {
            btn.textContent = '✓ დამატებულია';
            btn.classList.add('added');
            setTimeout(() => {
                btn.textContent = 'კალათაში დამატება';
                btn.classList.remove('added');
            }, 1500);
        }
    });
}


function closeCart() {
    kalatisPaneli.classList.remove('open');
    kalatisFoni.classList.remove('open');
    kalatisPaneli.setAttribute('aria-hidden', 'true');
    setTimeout(() => { kalatisFoni.hidden = true; }, 300);
}

function decreaseQty(index) {
    cart[index].qty -= 1;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}

function saveCart() {
    localStorage.setItem('tavrieli_cart', JSON.stringify(cart));
}


function increaseQty(index) {
    cart[index].qty += 1;
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function openCart() {
    kalatisFoni.hidden = false;
    requestAnimationFrame(() => {
        kalatisPaneli.classList.add('open');
        kalatisFoni.classList.add('open');
    });
    kalatisPaneli.setAttribute('aria-hidden', 'false');
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    renderCart();
    flashButton(name);
}


function renderCart() {
    saveCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    kalatisRaodenobaEl.textContent = count;
    kalatisRaodenobaEl.style.display = count > 0 ? 'block' : 'none';

    kalatisSia.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'kalatisNivti';
        li.innerHTML =
            '<div class="nivtisInpormacia">' +
                '<p class="nivtisSakheli">' + item.name + '</p>' +
                '<p class="nivtisFasi">₾' + item.price + '</p>' +
                '<div class="raodenobisMartva">' +
                    '<button class="raodenobisGilaki shemciremisGilaki" aria-label="შემცირება">-</button>' +
                    '<span class="raodenoba">' + item.qty + '</span>' +
                    '<button class="raodenobisGilaki gazrdisGilaki" aria-label="გაზრდა">+</button>' +
                '</div>' +
            '</div>' +
            '<button class="amocilebisGilaki" aria-label="ამოშლა">X</button>';

        li.querySelector('.shemciremisGilaki').addEventListener('click', () => decreaseQty(index));
        li.querySelector('.gazrdisGilaki').addEventListener('click', () => increaseQty(index));
        li.querySelector('.amocilebisGilaki').addEventListener('click', () => removeFromCart(index));
        kalatisSia.appendChild(li);
    });

    carieliKalata.hidden = cart.length > 0;
    jamisRaodenobaEl.textContent = '₾' + total;
}

window.addEventListener('resize', setCartDrawerHeight);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
kalatisFoni.addEventListener('click', closeCart);
setCartDrawerHeight();
dakhurvisGilaki.addEventListener('click', closeCart);
kalatisGilaki.addEventListener('click', openCart);

renderCart();
