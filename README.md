# 💝 Game Permintaan Maaf & Valentine Spesial

Game interaktif romantis untuk meminta maaf dan merayakan Valentine's Day dengan pasangan tersayang.

## ✨ Fitur Utama

### 🎮 1. Game Interaktif: Tangkap Hatiku
- Klik hati merah (❤️) untuk mendapat poin
- Hindari hati hitam (🖤) yang mengurangi poin
- Target: 20 hati dalam 30 detik
- Sound effects untuk setiap aksi

### 💌 2. Pesan Permintaan Maaf
- Ucapan maaf yang tulus dan menyentuh hati
- Desain glassmorphism yang mewah
- Animasi smooth dan elegan

### 💖 3. Pesan Valentine
- Ucapan Valentine yang romantis
- Typography yang indah
- Gradient colors yang memukau

### ⏱️ 4. Love Counter
- Hitung hari, jam, menit, dan detik bersama
- Real-time counter yang terus berjalan
- **PENTING**: Edit tanggal di `script.js` line 204

### 🌹 5. Promise List
- 5 janji untuk menjadi lebih baik
- Animasi slide-in yang smooth
- Hover effects interaktif

### 📸 6. Photo Gallery (D3.js)
- Galeri kenangan dengan animasi D3.js
- 5 momen spesial dengan emoji
- Hover dan click animations
- Connecting lines yang animated

### 🎯 7. Memory Game
- 6 pasang kartu emoji
- Hitung langkah dan pasangan cocok
- Sound effects untuk match/mismatch
- Tombol final muncul setelah menang

### 🎵 8. Background Music & Sound Effects
- 3 background music berbeda per screen
- Sound effects untuk setiap interaksi
- Toggle button untuk on/off musik
- Auto-play dengan user interaction

## 🎨 Desain Premium

- **Glassmorphism**: Efek kaca blur yang modern
- **Gradient Colors**: Kombinasi merah, pink, dan gold
- **Animations**: Smooth transitions dan micro-interactions
- **Typography**: Playfair Display & Poppins fonts
- **Responsive**: Optimal di desktop dan mobile

## 🚀 Cara Menggunakan

### 1. Personalisasi

Edit file `script.js` pada line 204:
```javascript
const relationshipStartDate = new Date('2024-01-01T00:00:00');
```
Ganti dengan tanggal jadian kalian (Format: YYYY-MM-DD)

### 2. Jalankan Lokal

Buka `index.html` di browser atau gunakan local server:
```bash
# Jika menggunakan Python
python -m http.server 8000

# Jika menggunakan PHP
php -S localhost:8000

# Jika menggunakan Node.js
npx serve
```

### 3. Deploy ke Vercel

#### Cara 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /opt/lampp/htdocs/game-minta-maaf
vercel
```

#### Cara 2: Vercel Web (Drag & Drop)
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Drag & drop folder `game-minta-maaf`
4. Deploy otomatis!

#### Cara 3: GitHub + Vercel
1. Push ke GitHub repository
2. Import di Vercel
3. Auto-deploy setiap push

## 📁 Struktur File

```
game-minta-maaf/
├── index.html          # Struktur HTML
├── style.css           # Styling dengan glassmorphism
├── script.js           # Logic game & interaksi
└── README.md           # Dokumentasi
```

## 🎯 Alur Game

1. **Intro Screen** → Klik "Buka Pesanku"
2. **Heart Catching Game** → Main game 30 detik
3. **Apology Message** → Baca pesan maaf
4. **Valentine Message** → Ucapan Valentine
5. **Love Counter** → Lihat hitungan hari bersama
6. **Promise List** → Baca 5 janji
7. **Photo Gallery** → Galeri kenangan (D3.js)
8. **Memory Game** → Main memory game
9. **Final Screen** → I Love You ❤️

## 🎵 Audio Credits

Musik dan sound effects dari [Pixabay](https://pixabay.com/music/)
- Background Music: Romantic & Upbeat tracks
- Sound Effects: Click, Heart, Wrong sounds

## 🛠️ Teknologi

- **HTML5**: Struktur semantik
- **CSS3**: Glassmorphism, animations, gradients
- **JavaScript ES6**: Modern syntax
- **D3.js v7**: Photo gallery animations
- **Canvas API**: Heart catching game
- **Web Audio API**: Background music & SFX

## 💡 Tips

1. **Musik**: Klik tombol 🔊 di pojok kanan atas untuk kontrol musik
2. **Mobile**: Game fully responsive untuk semua device
3. **Browser**: Gunakan Chrome/Firefox/Safari modern
4. **Personalisasi**: Edit promise list sesuai janji kalian
5. **Gallery**: Ganti emoji dengan foto asli jika mau

## 📝 Customization

### Ganti Warna
Edit `style.css` line 7-13:
```css
:root {
    --primary: #ff1744;    /* Merah utama */
    --secondary: #ff4081;  /* Pink */
    --accent: #f50057;     /* Accent */
    --gold: #ffd700;       /* Gold */
}
```

### Ganti Pesan
Edit `index.html` pada section message dan valentine

### Ganti Promise List
Edit `index.html` pada section promise-screen

### Ganti Gallery Items
Edit `script.js` pada function `initPhotoGallery()` line 258

## 🐛 Troubleshooting

**Musik tidak bunyi?**
- Klik layar terlebih dahulu (browser policy)
- Pastikan volume device tidak mute
- Klik tombol 🔊 untuk unmute

**Game lag?**
- Tutup tab browser lain
- Gunakan browser modern
- Clear cache browser

**Responsive issue?**
- Refresh halaman
- Check viewport meta tag
- Test di device lain

## 💝 Pesan untuk Pasangan

Game ini dibuat dengan sepenuh hati untuk menunjukkan betapa berharganya kamu bagiku. 
Maaf atas semua kesalahan yang pernah aku lakukan. 
Aku berjanji akan terus berusaha menjadi lebih baik untukmu.

Happy Valentine's Day, Sayang! ❤️

---

Made with 💖 by AI Assistant
© 2024 - All rights reserved
