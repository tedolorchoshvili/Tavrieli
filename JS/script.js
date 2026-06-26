window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('khiluli');
});


const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input').value.trim();
        if (email === '') {
            alert('გთხოვთ, შეიყვანეთ ელფოსტა.');
            return;
        }
        alert('გმადლობთ! წარმატებით გამოიწერეთ.');
        this.reset();
    });
}

let cart = JSON.parse(localStorage.getItem('tavrieli_cart') || '[]');

const kalatisPaneli = document.getElementById('kalatisPaneli');
const jamisRaodenobaEl = document.getElementById('jamisRaodenoba');
const kalatisFoni = document.getElementById('kalatisFoni');
const kalatisGilaki = document.getElementById('kalatisGilaki');
const dakhurvisGilaki = document.getElementById('dakhurvisGilaki');
const kalatisRaodenobaEl = document.getElementById('kalatisRaodenoba');
const kalatisSia = document.getElementById('kalatisSia');
const carieliKalata = document.getElementById('carieliKalata');


function closeCart() {
    if (!kalatisPaneli) return;
    kalatisPaneli.classList.remove('open');
    kalatisFoni.classList.remove('open');
    kalatisPaneli.setAttribute('aria-hidden', 'true');
    setTimeout(() => { kalatisFoni.hidden = true; }, 300);
}

function saveCart() {
    localStorage.setItem('tavrieli_cart', JSON.stringify(cart));
}


function increaseQty(index) {
    cart[index].qty += 1;
    renderCart();
}


function setCartDrawerHeight() {
    if (kalatisPaneli) kalatisPaneli.style.height = window.innerHeight + 'px';
}

function openCart() {
    if (!kalatisPaneli) return;
    kalatisFoni.hidden = false;
    requestAnimationFrame(() => {
        kalatisPaneli.classList.add('open');
        kalatisFoni.classList.add('open');
    });
    kalatisPaneli.setAttribute('aria-hidden', 'false');
}

function decreaseQty(index) {
    cart[index].qty -= 1;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    saveCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    if (kalatisRaodenobaEl) {
        kalatisRaodenobaEl.textContent = count;
        kalatisRaodenobaEl.style.display = count > 0 ? 'block' : 'none';
    }

    if (!kalatisSia) return;

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

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
if (kalatisFoni) kalatisFoni.addEventListener('click', closeCart);
window.addEventListener('resize', setCartDrawerHeight);
if (dakhurvisGilaki) dakhurvisGilaki.addEventListener('click', closeCart);
setCartDrawerHeight();
if (kalatisGilaki) kalatisGilaki.addEventListener('click', openCart);
renderCart();


document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});
