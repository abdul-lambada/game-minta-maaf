# 🎯 PANDUAN PERSONALISASI GAME

## ⚠️ PENTING - WAJIB EDIT SEBELUM DEPLOY!

### 1. 📅 Ganti Tanggal Jadian

Buka file `script.js` dan cari line 204:

```javascript
const relationshipStartDate = new Date('2024-01-01T00:00:00');
```

**Ganti dengan tanggal jadian kalian!**

Contoh:
- Jadian 14 Februari 2023: `new Date('2023-02-14T00:00:00')`
- Jadian 1 Januari 2024: `new Date('2024-01-01T00:00:00')`
- Jadian 25 Desember 2023: `new Date('2023-12-25T00:00:00')`

Format: `YYYY-MM-DD` (Tahun-Bulan-Tanggal)

### 2. 💝 Edit Pesan Permintaan Maaf (Opsional)

Buka file `index.html` dan cari section `message-screen` (sekitar line 66-87):

```html
<p class="message-text">
    Aku tahu aku sering mengecewakan kamu...
</p>
```

Ganti dengan kata-kata kalian sendiri yang lebih personal!

### 3. 💖 Edit Pesan Valentine (Opsional)

Di file `index.html`, cari section `valentine-screen` (sekitar line 89-116):

```html
<p class="valentine-text">
    Di hari Valentine ini, aku ingin kamu tahu...
</p>
```

Sesuaikan dengan perasaan kalian!

### 4. 🌹 Edit Daftar Janji (Opsional)

Di file `index.html`, cari section `promise-screen` (sekitar line 118-180):

```html
<h3>Mendengarkan Lebih Baik</h3>
<p>Aku berjanji akan lebih mendengarkan...</p>
```

Ganti dengan janji-janji kalian yang spesifik!

### 5. 📸 Edit Galeri Foto (Opsional)

Di file `script.js`, cari function `initPhotoGallery()` (sekitar line 258):

```javascript
const photos = [
    { emoji: '💑', label: 'Kencan Pertama', x: 150, y: 150, color: '#ff1744' },
    { emoji: '🌹', label: 'Bunga Untukmu', x: 400, y: 100, color: '#ff4081' },
    // ...
];
```

Ganti label dengan momen spesial kalian!

### 6. 🎨 Ganti Warna Tema (Opsional)

Di file `style.css`, cari `:root` (line 7-13):

```css
:root {
    --primary: #ff1744;    /* Merah - warna utama */
    --secondary: #ff4081;  /* Pink - warna sekunder */
    --accent: #f50057;     /* Accent */
    --gold: #ffd700;       /* Gold - untuk highlight */
}
```

Pilih warna favorit kalian!

## 🚀 CARA DEPLOY KE VERCEL

### Metode 1: Drag & Drop (PALING MUDAH!)

1. Buka https://vercel.com
2. Login dengan GitHub/Google
3. Klik "Add New" → "Project"
4. Drag & drop folder `game-minta-maaf`
5. Klik "Deploy"
6. Tunggu 1-2 menit
7. ✅ SELESAI! Copy link dan kirim ke pacar!

### Metode 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Masuk ke folder project
cd /opt/lampp/htdocs/game-minta-maaf

# Deploy
vercel

# Ikuti instruksi di terminal
# Pilih "yes" untuk semua pertanyaan
```

### Metode 3: GitHub + Vercel (Auto Deploy)

1. Push ke GitHub:
```bash
cd /opt/lampp/htdocs/game-minta-maaf
git init
git add .
git commit -m "Game romantis untuk pacar"
git remote add origin https://github.com/username/game-minta-maaf.git
git push -u origin main
```

2. Di Vercel:
   - Klik "Import Project"
   - Pilih repository GitHub
   - Klik "Deploy"

## 📱 CARA KIRIM KE PACAR

### Setelah Deploy:

1. **Copy Link Vercel**
   - Contoh: `https://game-minta-maaf.vercel.app`

2. **Kirim dengan Pesan Manis**
   ```
   Sayang, aku buat sesuatu spesial buat kamu 💝
   Buka link ini ya: [link vercel]
   
   Maaf ya kalau aku sering bikin kamu kesal...
   Aku cinta kamu ❤️
   ```

3. **Atau Buat QR Code**
   - Buka https://www.qr-code-generator.com/
   - Paste link Vercel
   - Download QR code
   - Kirim gambar QR code ke pacar

## 💡 TIPS AGAR LEBIH BERKESAN

1. **Timing yang Tepat**
   - Kirim saat pacar lagi santai
   - Jangan saat dia lagi sibuk/marah
   - Valentine's Day adalah waktu perfect!

2. **Tambahkan Sentuhan Personal**
   - Edit semua pesan dengan kata-kata kalian
   - Ganti emoji gallery dengan momen kalian
   - Sesuaikan promise list dengan kesalahan kalian

3. **Follow Up**
   - Setelah dia buka, tanya pendapatnya
   - Tanyakan apakah dia suka
   - Minta maaf lagi secara langsung

4. **Buktikan dengan Tindakan**
   - Game ini hanya awal
   - Yang penting adalah perubahan nyata
   - Tunjukkan kalau kalian serius berubah

## ❓ TROUBLESHOOTING

### Musik Tidak Bunyi?
- Minta pacar klik layar dulu
- Check volume HP/laptop
- Klik tombol 🔊 di pojok kanan atas

### Tanggal Counter Salah?
- Check file `script.js` line 204
- Pastikan format: `YYYY-MM-DD`
- Contoh: `2024-01-01` bukan `01-01-2024`

### Link Vercel Tidak Bisa Dibuka?
- Check koneksi internet
- Coba buka di browser lain
- Clear cache browser

### Game Lag di HP?
- Tutup aplikasi lain
- Gunakan browser Chrome/Safari
- Refresh halaman

## 📞 NEED HELP?

Jika ada masalah:
1. Baca README.md untuk dokumentasi lengkap
2. Check semua file sudah di-edit dengan benar
3. Test di browser sebelum kirim ke pacar
4. Pastikan semua fitur jalan dengan baik

## 💝 PESAN TERAKHIR

Game ini dibuat dengan AI, tapi cinta kalian itu NYATA.
Game ini hanya alat untuk menyampaikan perasaan.
Yang paling penting adalah TINDAKAN NYATA untuk berubah.

Semoga pacar kalian tersentuh dan memaafkan kalian! 💕

Good luck! 🍀

---

Made with 💖 for couples in love
