# PC Power Simulator 3D

> Simulator 3D interaktif berbasis web untuk mengajarkan pemula menyalakan dan mematikan komputer desktop dengan benar.

## About

PC Power Simulator 3D adalah aplikasi web edukasi interaktif yang menampilkan komputer desktop dalam 3D. Pelajar, mahasiswa, dan masyarakat umum yang masih pemula dapat belajar langkah demi langkah cara menyalakan dan mematikan komputer dengan benar dan aman. Aplikasi ini murni simulasi di browser dan tidak mengendalikan komputer sungguhan.

- **URL Produksi Vercel:** [https://pc-power-simulatorr-3-d.vercel.app/](https://pc-power-simulatorr-3-d.vercel.app/)
- **Repositori GitHub:** [https://github.com/gigihazam4-spec/PC-POWER-SIMULATORR-3D](https://github.com/gigihazam4-spec/PC-POWER-SIMULATORR-3D)

## Features

- **F1 - Model 3D Komputer Desktop Interaktif (must):**
  - Model komputer desktop lengkap (meja, monitor, casing CPU, tombol power, LED, kabel daya, keyboard, dan mouse) dibuat dari geometri bawaan Three.js tanpa model eksternal (R3).
  - Kontrol OrbitControls untuk rotasi 3D dan zoom in/out.
  - Klik komponen untuk menyorotnya dan melihat panel informasi fungsi komponen.
- **F2 - Prosedur Simulasi Langkah demi Langkah (must):**
  - 10 langkah simulasi terstruktur mencakup 5 fase: Pemeriksaan Perangkat, Menyalakan Komputer, Proses Booting, Masuk Sistem Operasi, dan Mematikan Komputer (Shutdown).
  - Tombol kontrol Mulai Simulasi, Ulangi, indikator progres, dan kartu penanda selesai.
  - Aturan K2: Tindakan yang bukan sasaran aktif tidak memajukan langkah.
  - Aturan K4: Progres disimpan murni di memori sesi tanpa `localStorage`.
- **F3 - Petunjuk Interaktif & Daftar Tahapan (must):**
  - Petunjuk dinamis untuk setiap langkah aktif (`instruction`) dan penyorotan visual komponen sasaran (`interactionTarget`).
  - Daftar tahapan lengkap (1–10) dengan status indikator.
  - Aturan K3: Memilih tahapan dari daftar hanya menampilkan informasi/pratinjau tanpa mengubah langkah aktif atau progres simulasi.
- **F4 - Penjelasan Fungsi Setiap Tahapan (should):**
  - Penjelasan fungsi mendalam (`description`) dalam Bahasa Indonesia untuk setiap langkah.
- **F5 - Pemberitahuan Kesalahan Prosedur (should):**
  - Banner peringatan kesalahan prosedur (`warningMessage`) dan arahan perbaikan (`correction`) jika mengklik objek yang salah.
- **F6 - Kuis Evaluasi Pemahaman & Skor Akhir (could):**
  - 5 pertanyaan kuis pilihan ganda yang muncul setelah simulasi selesai.
  - Umpan balik instan jawaban benar beserta penjelasan edukatif dan persentase skor akhir.

## Tech Stack

- **Frontend:** HTML5, CSS3, dan Modern JavaScript (ES Modules) tanpa framework UI
- **3D Engine:** Three.js (v0.187.0)
- **Build Tool:** Vite (v8.3.8)
- **Deployment:** Vercel Hosting (Static Site)
- **Pengujian:** Node.js native test runner (`node --test`), 27 unit tests
- **Linting:** ESLint (v10.15.0)

## Getting Started

1. Pastikan Node.js LTS terpasang (`node --version`).
2. Clone repositori:
   ```bash
   git clone https://github.com/gigihazam4-spec/PC-POWER-SIMULATORR-3D.git
   cd PC-POWER-SIMULATORR-3D
   ```
3. Pasang dependensi:
   ```bash
   npm ci
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka tautan lokal yang ditampilkan oleh Vite di browser (contoh: `http://localhost:5173`).

## Scripts and Commands

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan local development server Vite |
| `npm run lint` | Menjalankan pemeriksaan kualitas kode dengan ESLint |
| `npm test` | Menjalankan seluruh pengujian unit otomatis (`node --test`) |
| `npm run build` | Membangun aset produksi statis ke direktori `dist/` |

## Project Structure

```text
PC-POWER-SIMULATORR-3D/
├── docs/                     # Dokumentasi lengkap proyek (PRD, Arsitektur, dll.)
├── src/
│   ├── data/                 # Data statis (komponen, 10 tahapan, kuis)
│   ├── logic/                # Logika murni murni sesi (state simulasi, kuis)
│   ├── scene/                # Three.js 3D rig, pencahayaan, raycaster, orbit
│   ├── ui/                   # Komponen DOM antarmuka murni textContent
│   ├── styles/               # CSS modular (tokens, layout, controls, warning, quiz)
│   ├── main.js               # Entry point aplikasi
│   └── style.css             # Entry stylesheet
└── tests/                    # Pengujian unit otomatis (27 tes)
```
