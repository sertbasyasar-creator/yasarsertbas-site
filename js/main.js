/* Prof. Dr. Yaşar Sertbaş — main.js */

// 1) Mobil menü aç/kapa
const toggle = document.querySelector('.nav__toggle');
const menu   = document.querySelector('.nav__menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Menüdeki bir linke tıklanınca kapat
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// 2) Footer'daki yılı otomatik yaz
const yearEl = document.getElementById('yil');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 3) Dış bağlantıları yeni sekmede aç (akademik profiller vs.)
document.querySelectorAll('a[data-external]').forEach((a) => {
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});
// 4) Yayınlar Sayfası Filtreleme İşlemi
const tabButtons = document.querySelectorAll('.tab-btn');
const pubItems = document.querySelectorAll('.pub-item');

if (tabButtons.length > 0 && pubItems.length > 0) {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Tüm butonlardan aktif sınıfını kaldır
      tabButtons.forEach(b => b.classList.remove('is-active'));
      // Tıklanan butona aktif sınıfını ekle
      btn.classList.add('is-active');

      const filterValue = btn.getAttribute('data-filter');

      // Yayınları filtrele
      pubItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
// 5) Yayın Arama ve Sıralama İşlemi
const pubSearchInput = document.getElementById('pubSearch');
const pubSortSelect = document.getElementById('pubSort');
const pubListContainer = document.querySelector('.pub-list');

if (pubSearchInput && pubSortSelect && pubListContainer) {
  
  function filterAndSortPubs() {
    const query = pubSearchInput.value.toLowerCase('tr');
    const sortBy = pubSortSelect.value;
    
    // Tüm yayın kartlarını al
    let items = Array.from(pubListContainer.querySelectorAll('.pub-item'));

    // 1. Filtreleme (Arama)
    items.forEach(item => {
      const text = item.textContent.toLowerCase('tr');
      if (text.includes(query)) {
        item.style.display = '';
        item.classList.remove('hidden'); // Sekme filtresiyle çakışmaması için
      } else {
        item.style.display = 'none';
        item.classList.add('hidden');
      }
    });

    // 2. Sıralama
    // Sadece ekranda görünenleri değil, tüm listeyi sıralayıp DOM'a tekrar ekliyoruz
    items.sort((a, b) => {
      const titleA = a.querySelector('.pub-title').textContent.trim();
      const titleB = b.querySelector('.pub-title').textContent.trim();
      
      const yearA = parseInt(a.querySelector('.pub-meta span').textContent) || 0;
      const yearB = parseInt(b.querySelector('.pub-meta span').textContent) || 0;

      if (sortBy === 'year-desc') return yearB - yearA;
      if (sortBy === 'year-asc') return yearA - yearB;
      if (sortBy === 'title-asc') return titleA.localeCompare(titleB, 'tr');
      if (sortBy === 'title-desc') return titleB.localeCompare(titleA, 'tr');
      return 0; // 'added-desc' için veritabanı ID'si kullanılabilir
    });

    // Sıralanmış halini tekrar listeye ekle
    items.forEach(item => pubListContainer.appendChild(item));
  }

  // Olay dinleyicileri
  pubSearchInput.addEventListener('input', filterAndSortPubs);
  pubSortSelect.addEventListener('change', filterAndSortPubs);
}
      });
    });
  });
}