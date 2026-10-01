# KAS-TKJ1: Sistem Kas & Monitoring Iuran Kelas XII TKJ 1

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://nzadev.github.io/kas-tkj1/)
[![PWA](https://img.shields.io/badge/Android-PWA%20Ready-blue)](https://nzadev.github.io/kas-tkj1/)
[![SMK Kartika X-1](https://img.shields.io/badge/Sekolah-SMK%20Kartika%20X--1-orange)](https://nzadev.github.io/kas-tkj1/)

> **Proyek Besar Praktik Kejuruan Web App & Utility System**  
> **Kelas:** XII TKJ 1  
> **Guru Pengampu:** Allan Parindera, S.Kom.  
> **TA:** 2026/2027  

🌐 **Akses Website Live (Bisa dibuka di Laptop & HP Android 24 Jam):**  
👉 **[https://nzadev.github.io/kas-tkj1/](https://nzadev.github.io/kas-tkj1/)**

---

## 👥 Kelompok 4 (Format 6 Siswa: 2P, 4L)

| No | Nama Anggota | Peran Kerja (Zero Free-Rider) |
| :---: | :--- | :--- |
| 1 | **NABIL ZAENAL ASSYQIN** 💻 | **Ketua & Laptop Anchor** (Lead Programmer & Data Architect) |
| 2 | **Kaila Kanzha** | Frontend & UI Layout Specialist |
| 3 | **Keisya Tania Sibarani** | Frontend & UI Layout Specialist |
| 4 | **Muhamad Irpan** | Data Curator & Content Lead |
| 5 | **Raihan Mufadzal Zaki** | QA Tester & Main Presenter |
| 6 | **Dzakii Pratama Haritahta** | QA Tester & Live Presenter |

---

## 🚀 Fitur Utama & Kepatuhan Standar Ujian

1. **Fungsionalitas & Data Persistence (Bobot 40%)**:
   * Menyimpan seluruh arus kas masuk, pengeluaran, dan status iuran **27 siswa riil XII TKJ 1** di memori lokal browser (`localStorage`).
   * **Teruji F5 / Refresh**: Data tidak pernah hilang saat halaman browser di-refresh.
   * Kalkulasi otomatis: Total Pemasukan, Total Pengeluaran, Saldo Kas Aktif, dan Persentase Kepatuhan Siswa.

2. **Desain Bersih & Ramah Proyektor (Anti-AI Slop - Bobot 20%)**:
   * **Zero Backdrop-Filter**: Tidak menggunakan efek blur/glassmorphism yang memudarkan teks.
   * **High Contrast UI**: Kontras hitam-putih solid dengan border tegas, terbaca sangat tajam di layar proyektor kelas.
   * **Responsive Adaptive Layout**: Grid luas di proyektor laptop, otomatis berubah menjadi kartu vertikal + bottom navigation bar di HP Android.

3. **PWA (Progressive Web App) & Android-Ready**:
   * Dilengkapi `manifest.json` dan Service Worker `sw.js`.
   * Dapat di-install langsung di HP Android melalui Google Chrome (**"Add to Home Screen"**).
   * Tampil *full-screen* tanpa address bar layaknya aplikasi Android native dari Play Store.

4. **Siap Uji Petik Kode Guru (Bobot 30%)**:
   * Kode murni HTML5, CSS3, dan JavaScript Native tanpa framework/library eksternal.
   * Struktur kode modular dan mudah dipahami seluruh anggota kelompok saat ditunjuk acak oleh guru pengampu.

---

## 📁 Struktur Berkas

```text
├── index.html       # Antarmuka web utama semantik & modal interaktif
├── style.css        # Desain kontras tinggi anti-slop & responsif mobile/desktop
├── app.js           # Mesin kalkulasi saldo, data 27 siswa, dan localStorage
├── manifest.json    # Konfigurasi PWA Android
├── sw.js            # Service worker untuk akses offline di HP Android
├── icon.svg         # Ikon resmi aplikasi berlabel XII TKJ 1
├── deploy.sh        # Script otomatisasi push GitHub Pages
└── README.md        # Dokumentasi resmi proyek
```
