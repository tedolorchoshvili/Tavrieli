const mainNav = document.getElementById('mainNav');
const burgerisGilaki = document.getElementById('burgerisGilaki');

if (burgerisGilaki && mainNav) {

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
        });
    });
    
    burgerisGilaki.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}
