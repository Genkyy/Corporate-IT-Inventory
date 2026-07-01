# Panduan Desain Gencamp (Design System)

Dokumen ini merangkum seluruh keputusan desain, palet warna, tipografi, dan pola komponen (komponen UI) yang digunakan dalam website Gencamp. Panduan ini berfungsi sebagai referensi (Single Source of Truth) untuk pengembangan fitur atau halaman selanjutnya agar konsistensi visual tetap terjaga.

---

## 1. Filosofi & Tema Utama
- **Tema:** Starlight Camp
- **Kesan:** Modern, Bersih (Clean), Premium, namun tetap membumi (Nature-inspired) dan menyenangkan (Playful).
- **Pendekatan:** Menggunakan ruang kosong (white space) yang lega, tipografi besar yang berani, sudut-sudut membulat (rounded), dan animasi mikro (micro-interactions) yang halus.

---

## 2. Palet Warna (Color Palette)

Sistem warna diatur secara terpusat di `globals.css` menggunakan CSS Variables untuk integrasi dengan Tailwind CSS v4.

| Nama Warna | Kode HEX | Penggunaan |
| :--- | :--- | :--- |
| **Background** | `#FFFDF8` (Cream/Off-White) | Latar belakang utama aplikasi, memberikan kesan hangat dan natural. |
| **Foreground** | `#1a1a1a` (Near Black) | Teks utama, memastikan kontras tinggi dan mudah dibaca. |
| **Primary** | `#1D3D2F` (Dark Green) | Elemen utama, tombol primer, heading penting. Mewakili alam dan hutan. |
| **Secondary** | `#E6EBE0` (Light Sage) | Aksen sekunder, latar belakang bagian (section) yang ringan. |
| **Accent / CTA** | `#FF5C00` (Vibrant Orange) | Tombol Call-to-Action (CTA) paling penting. Sangat menarik perhatian. |
| **Muted** | `#f0ede6` / `#6b6b6b` | Teks pendukung/sub-heading, border, atau elemen yang tidak terlalu menonjol. |
| **Card** | `#ffffff` (White) | Latar belakang komponen Card. |
| **Sticker / Badge**| `#FFD23F` (Yellow), `#A3C95A` (Lime)| Warna-warna cerah untuk label, badge diskon, atau stiker status. |

---

## 3. Tipografi (Typography)

Menggunakan font keluarga Sans-serif yang modern dan ramah.
- **Font Utama:** `"Gabarito"`, sans-serif (Tersedia via Google Fonts / lokal).

### Hierarki Teks (Tersedia di `globals.css`)
- **Heading Display (`.heading-display`)**
  - Ukuran: Sangat besar (hingga 80px di desktop).
  - Gaya: Bold, jarak antar huruf rapat (`tracking-tight`), jarak antar baris padat (`leading-[1.05]`).
- **Heading 1, 2, 3 (`.heading-1`, `.heading-2`, dst.)**
  - Gaya serupa, ukuran berjenjang turun (mulai 60px ke bawah).
- **Subheading (`.subheading`)**
  - Warna: Muted foreground (`text-muted-foreground`).
  - Gaya: Jarak antar baris lebih rileks (`leading-relaxed`), biasanya dengan batasan lebar (`max-w-2xl`).
- **Label / Tagline (`.label-caps`)**
  - Ukuran: Sangat kecil (`text-xs` / 10px-11px).
  - Gaya: Uppercase (huruf besar semua), Bold, dan jarak antar huruf sangat lebar (`tracking-widest` atau `tracking-[0.2em]`).

---

## 4. Pola Komponen (UI Patterns)

### A. Tombol (Buttons)
Semua tombol utama menggunakan sudut membulat penuh (`rounded-full`) untuk kesan modern dan organik.
- **`.btn-cta`**: Background Orange, teks putih, bayangan besar (`shadow-lg`), efek zoom-in kecil saat di-hover.
- **`.btn-primary`**: Background Hijau Gelap, teks putih.
- **`.btn-secondary`**: Background Sage, teks Hijau Gelap, memiliki border.
- **`.btn-outline`**: Transparan dengan border, berubah menjadi warna Sage saat di-hover.

### B. Kartu (Cards)
Pola standar untuk menampilkan produk, fitur, atau testimoni:
- **Background:** Putih (`bg-card`).
- **Border:** Tipis dan transparan (`border border-border/70`).
- **Radius:** Membulat cukup besar (`rounded-2xl` atau `rounded-[2rem]` untuk produk).
- **Hover State:** Kartu sedikit naik ke atas (`hover:-translate-y-1`) dan bayangan membesar (`hover:shadow-xl`). Transisi selalu mulus (`transition-all duration-300`).

### C. Gambar (Images)
- **Radius:** Sangat membulat (`rounded-3xl`) atau bentuk unik seperti kubah/arch (`.img-arch`).
- **Efek Hover:** Hampir semua gambar pendukung/produk memiliki efek perbesaran perlahan (zoom in) saat card di-hover: `group-hover:scale-105 transition-transform duration-700` (atau 1000).

### D. Stiker & Badge (Stickers)
Salah satu ciri khas desain ini adalah elemen yang "dimiringkan" untuk memberi kesan stiker tempel analog.
- Class: `.sticker-yellow`, `.sticker-green`, dll.
- Gaya: Padding kecil, font uppercase, tracking lebar, dan CSS transform rotasi (`transform: rotate(-3deg);`).

### E. Efek Kaca (Glassmorphism)
Digunakan secara hemat untuk elemen yang mengambang di atas gambar (seperti badge angka/statistik).
- Class: `.glass` (`bg-card/70 backdrop-blur-xl border border-border/50`).

---

## 5. Tata Letak & Spasi (Layout & Spacing)

- **Jarak Antar Bagian (Section Padding):** Menggunakan utilitas `.section-padding` (`py-20 md:py-28 px-6 md:px-12 lg:px-20`). Ini menjamin setiap bagian memiliki ruang bernafas yang sama dan sangat lega.
- **Container:** Konten utama selalu dibungkus dalam div yang dipusatkan dengan lebar maksimum (misal: `max-w-5xl` atau `max-w-7xl` dan `mx-auto`).

---

## 6. Animasi & Interaksi

1. **Framer Motion (Saat Scroll):**
   - Pola standar: Elemen muncul dari bawah (Fade Up).
   - Pengaturan: `opacity: 0, y: 20` ke `opacity: 1, y: 0` dengan `transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }`.
2. **CSS Keyframes (Animasi Berulang):**
   - `.animate-marquee`: Untuk teks berjalan tanpa henti.
   - `.animate-float` / `.animate-float-delayed`: Untuk elemen gambar atau dekorasi yang mengambang perlahan (naik-turun 10px-15px).

---
*Gunakan panduan ini sebagai patokan saat membuat komponen atau halaman baru agar visual identity Gencamp tetap utuh.*
