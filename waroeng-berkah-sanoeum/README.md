# 🏪 Waroeng Berkah Sanoeum - Toko Online

Aplikasi toko online lengkap berbasis web yang dibangun dengan HTML, CSS, JavaScript, dan Python Flask.

## ✨ Fitur Utama

### Frontend
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Katalog produk dengan 12 item sample
- ✅ Pencarian dan filter produk berdasarkan kategori
- ✅ Keranjang belanja dengan penyimpanan di localStorage
- ✅ Modal detail produk
- ✅ Sistem checkout dengan 3 opsi pembayaran
- ✅ Navbar sticky dengan hamburger menu
- ✅ Animasi smooth dan transisi menarik
- ✅ Toast notification untuk feedback user
- ✅ Section tentang dan kontak

### Backend
- ✅ REST API dengan Flask
- ✅ CORS support
- ✅ Manajemen produk
- ✅ Sistem pesanan
- ✅ Form kontak
- ✅ Error handling yang baik
- ✅ JSON file storage untuk data

## 📁 Struktur Proyek

```
waroeng-berkah-sanoeum/
├── index.html                 # Halaman utama
├── css/
│   ├── style.css             # Styling utama
│   └── responsive.css        # Responsive design
├── js/
│   ├── main.js               # Logika utama & produk
│   └── cart.js               # Manajemen keranjang
├── backend/
│   ├── app.py                # Backend Flask
│   └── requirements.txt       # Dependencies Python
├── data/                      # Data storage
│   ├── products.json
│   ├── orders.json
│   └── contacts.json
├── .env.example              # Contoh environment variables
└── README.md                 # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. Frontend (HTML, CSS, JavaScript)

**Langsung buka di browser:**
- Cukup buka file `index.html` di browser modern
- Semua fitur frontend sudah berfungsi penuh

**Fitur yang bisa digunakan:**
- Cari produk menggunakan search bar
- Filter produk berdasarkan kategori
- Klik "Lihat Detail" untuk melihat detail produk lengkap
- Klik "+ Keranjang" untuk menambah produk ke keranjang
- Klik icon keranjang untuk membuka sidebar keranjang
- Lakukan checkout dengan pilihan WhatsApp, Email, atau Hubungi Langsung

### 2. Backend (Python Flask)

**Install Dependencies:**
```bash
pip install -r backend/requirements.txt
```

**Jalankan Flask:**
```bash
python backend/app.py
```

**Akses API:**
```
http://localhost:5000/api/health
```

**Endpoints yang tersedia:**

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/products` | Ambil semua produk |
| POST | `/api/products` | Tambah produk baru |
| GET | `/api/orders` | Ambil semua pesanan |
| POST | `/api/orders` | Buat pesanan baru |
| POST | `/api/contact` | Submit form kontak |
| GET | `/api/health` | Health check |

## 🎨 Kategori Produk

1. **Makanan** 🍔
   - Kopi Premium
   - Snack Crispy
   - Madu Asli

2. **Minuman** 🥤
   - Teh Herbal
   - Jus Segar
   - Sirup Buah

3. **Kerajinan** 🎨
   - Tas Tangan
   - Batik Kain
   - Dompet Kulit

4. **Elektronik** 📱
   - LED Lamp
   - Power Bank
   - Headphone

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env` di root directory:

```
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///waroeng.db
```

Atau copy dari `.env.example` dan sesuaikan.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px dan lebih besar
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Extra Small**: Kurang dari 480px

## 🎯 Optimasi & Best Practices

✅ **Performance**
- LocalStorage untuk caching cart
- Lazy loading images
- Minified CSS dan JS ready for production

✅ **UX/UI**
- Smooth animations dan transitions
- Loading states
- Error handling
- Toast notifications

✅ **Accessibility**
- Semantic HTML
- ARIA labels siap ditambah
- Keyboard navigation support

✅ **SEO Ready**
- Meta tags lengkap
- Semantic markup
- Schema markup siap ditambah

## 🔐 Keamanan

- Environment variables untuk sensitive data
- CORS protection di backend
- Input validation di frontend dan backend
- Error handling yang aman

## 📋 Customization

### Mengubah Data Produk

Edit di `js/main.js` array `products`:

```javascript
const products = [
    {
        id: 1,
        name: 'Nama Produk',
        category: 'kategori',
        price: 50000,
        image: '😀',
        description: 'Deskripsi produk',
        stock: 50,
        rating: 4.5,
        reviews: 100
    }
];
```

### Mengubah Warna

Edit CSS variables di `css/style.css`:

```css
:root {
    --primary-color: #10b981;      /* Warna utama */
    --secondary-color: #0ea5e9;    /* Warna sekunder */
    --dark-color: #1f2937;         /* Warna gelap */
    --light-color: #f3f4f6;        /* Warna terang */
}
```

### Mengubah Kontak

Update di:
- `index.html` - Section kontak
- `js/cart.js` - Fungsi `checkoutVia()`
- Backend `app.py`

## 🚀 Deploy

### Deploy Frontend

1. **GitHub Pages**
   - Push ke GitHub repository
   - Enable GitHub Pages di settings

2. **Netlify**
   - Connect GitHub repository
   - Deploy otomatis setiap push

3. **Vercel**
   - Import project
   - Deploy otomatis

### Deploy Backend

1. **Heroku**
   - Create Procfile
   - Deploy ke Heroku

2. **Railway/Render**
   - Connect repository
   - Deploy otomatis

3. **DigitalOcean/VPS**
   - Setup Python environment
   - Jalankan dengan Gunicorn

## 📝 Lisensi

Free to use dan modify sesuai kebutuhan.

## 👥 Support

Untuk pertanyaan atau bantuan, silakan hubungi:
- 📞 +62 812 3456 7890
- 📧 info@waroengberkah.com
- 💬 WhatsApp: +62 812 3456 7890

## 🎉 Terima Kasih

Terima kasih telah menggunakan Waroeng Berkah Sanoeum!

---

**Dibuat dengan ❤️ untuk kemudahan berbelanja online**