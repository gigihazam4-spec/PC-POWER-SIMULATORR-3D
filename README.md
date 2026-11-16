# PC Power Simulator 3D

> Simulator 3D interaktif berbasis web untuk mengajarkan pemula menyalakan dan mematikan komputer desktop dengan benar.

## About

PC Power Simulator 3D adalah aplikasi web edukasi interaktif yang menampilkan komputer desktop dalam 3D. Pelajar, mahasiswa, dan masyarakat umum yang masih pemula dapat belajar langkah demi langkah cara menyalakan dan mematikan komputer dengan benar dan aman. Aplikasi ini murni simulasi di browser dan tidak mengendalikan komputer sungguhan.

## Features

- F1 - Model 3D komputer desktop interaktif (must): direncanakan
- F2 - Simulasi langkah demi langkah (must): direncanakan
- F3 - Petunjuk interaktif di setiap langkah (must): direncanakan
- F4 - Penjelasan fungsi setiap tahapan (should): direncanakan
- F5 - Pemberitahuan kesalahan prosedur (should): direncanakan
- F6 - Kuis singkat (could): direncanakan

## Tech Stack

- Frontend: HTML5, CSS3, dan JavaScript tanpa framework UI
- 3D: Three.js
- Build tool: Vite
- Hosting: Vercel
- Backend, database, dan autentikasi: tidak ada
- Testing: `node --test` dan uji manual di browser; lint dengan ESLint

Versi paket ditulis latest stable dan diverifikasi saat setup (lihat `docs/DECISIONS.md`).

## Getting Started

Perintah berikut sama dengan `AGENTS.md` dan baru tersedia setelah T-001 selesai.

1. Pasang Node.js LTS aktif (cek `node --version` dan nodejs.org).
2. Clone repositori ini dan masuk ke foldernya.
3. Instal dependensi: `npm ci` (tersedia setelah T-001).
4. Salin `.env.example` menjadi `.env` bila ada variabel yang tercantum; saat ini tidak ada variabel yang dibutuhkan.
5. Jalankan mode pengembangan: `npm run dev` (tersedia setelah T-001).
6. Buka alamat lokal yang ditampilkan Vite di terminal untuk melihat hasilnya.

## Scripts and Commands

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan Vite |
| `npm run lint` | Memeriksa kode dengan ESLint |
| `npm test` | Menjalankan tes otomatis dengan `node --test` |
| `npm run build` | Membuat build produksi di folder `dist/` |

## Project Structure

```text
.
├── AGENTS.md      # panduan agen AI
├── README.md      # pengantar proyek
├── SPEC.json      # spesifikasi dari wawancara
├── docs/          # dokumen proyek
├── src/           # kode aplikasi: data, logic, scene, ui, styles
├── tests/         # tes untuk node --test
├── public/        # aset statis
└── .github/       # CI dan templat PR
```

## Documentation

| Dokumen | Fungsi |
|---|---|
| [AGENTS.md](AGENTS.md) | Panduan singkat untuk agen AI |
| [docs/PRD.md](docs/PRD.md) | Kebutuhan produk dan kriteria acceptance |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, struktur, model data, dan deployment |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Warna, tipografi, layout, dan komponen |
| [docs/SECURITY.md](docs/SECURITY.md) | Ancaman, aturan keamanan, dan OWASP |
| [docs/CODE_STYLE.md](docs/CODE_STYLE.md) | Gaya kode dan aturan commit |
| [docs/TESTING.md](docs/TESTING.md) | Strategi dan perintah tes |
| [docs/EVALS.md](docs/EVALS.md) | Gerbang kualitas dan eval fitur |
| [docs/WORKFLOW.md](docs/WORKFLOW.md) | Siklus kerja dan titik pemeriksaan |
| [docs/GUARDRAILS.md](docs/GUARDRAILS.md) | Batas yang tidak boleh dilanggar |
| [docs/TASKS.md](docs/TASKS.md) | Daftar task bernomor |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Keadaan terakhir proyek |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Keputusan arsitektur dan usulan asisten |
| [docs/REVIEW.md](docs/REVIEW.md) | Daftar periksa review |
| [docs/LESSONS.md](docs/LESSONS.md) | Pelajaran dan kesalahan berulang |

## Contributing

Ikuti `docs/WORKFLOW.md`: satu cabang per task, pull request kecil, dan review manusia. Pada level Dasar, CI dijalankan sebagai peringatan dini dan bukan syarat merge. Pesan commit mengikuti `docs/CODE_STYLE.md`. Alat AI mengikuti `AGENTS.md`.

## AI Usage Disclosure

Proyek ini disusun dengan bantuan alat AI berupa chat di browser. Dokumen awal dihasilkan dari `SPEC.json`, dan semua perubahan ditinjau serta harus dipahami oleh penulis sebelum digabung.

## Status

Tahap perencanaan; dokumen proyek siap dan implementasi belum dimulai. Lihat `docs/PROGRESS.md`.
