# Tasks: PC Power Simulator 3D

## Conventions

- **ID**: `T-001`, `T-002`, ... berurutan, unik.
- **Status**: `todo`, `doing`, `review`, `done`, `blocked`.
- **Ukuran**: `S` (< 1 jam), `M` (1 sampai 3 jam), `L` (setengah hari). Task lebih besar dari `L` harus dipecah.
- Satu task = satu branch = satu PR. Hanya satu task berstatus `doing` per orang.
- Setiap task merujuk fitur (F1, F2, ...) atau "setup"/"dokumen", dan memiliki kriteria selesai yang dapat dicek.

Agen (alat AI di chat) hanya mengambil task berstatus `todo` yang semua ketergantungannya sudah `done`, mengubah status ke `doing` saat mulai dan ke `review` saat PR dibuka. Mahasiswa mengubah ke `done` setelah merge. Karena tenggat dekat, task fitur `should` dan `could` (T-012 sampai T-015) hanya diambil setelah T-011 selesai.

## Milestones

| Milestone | Tujuan | Fitur | Perkiraan minggu |
|---|---|---|---|
| 1. Fondasi dan setup | Kerangka Vite, scene minimal, deploy dini ke Vercel, dan fitur `must` F1 sampai F3 sehingga ada URL yang dapat dikumpulkan | setup, F1, F2, F3, R1, R3 (T-001 sampai T-011) | Minggu 1; usulan: selesai sebelum Senin 16 November 2026 siang |
| 2. Penyempurnaan dan rilis | F4, F5, dan F6 bila waktu memungkinkan; pembekuan fitur; pemeriksaan akhir dan dokumen | F4, F5, F6, R2 (T-012 sampai T-017) | Minggu 1; pembekuan Senin 16 November 2026 pukul 20.00 WIB, tenggat pukul 23.00 WIB |

Tenggat aktual lebih pendek dari satu minggu penuh; perkiraan di atas adalah usulan asisten yang disetujui mahasiswa dan mengikuti prioritas deploy dini lalu F1 sampai F3.

## Task List

| ID | Judul | Fitur | Ukuran | Status | Branch | Bergantung pada | Kriteria selesai |
|---|---|---|---|---|---|---|---|
| T-001 | Setup proyek: Vite vanilla, ESLint, package-lock.json, tes contoh | setup | M | review | feat/T-001-setup | - | `npm ci`, `npm run lint`, `npm test`, dan `npm run build` lulus lokal; `ci.yml` ada dan hasil CI di GitHub dibaca serta diperbaiki bila merah (bukan syarat merge); versi paket dicatat di PROGRESS (langkah di bawah tabel) |
| T-002 | Token CSS dan layout responsif kerangka (canvas dan panel) | F1 | S | done | feat/T-002-layout | T-001 | Token dari DESIGN_SYSTEM dipakai; tampil tanpa gulir horizontal pada 1280, 768, dan 375 px (DevTools); lint bersih |
| T-003 | Scene Three.js minimal: satu objek, loop render, penyesuaian ukuran | F1 | S | done | feat/T-003-scene-minimal | T-001 | Objek tampil di canvas pada `npm run dev` tanpa galat di konsol dan ukuran mengikuti jendela; `npm run build` berhasil |
| T-004 | Deploy dini ke Vercel dan periksa URL | F1, R1 | S | done | chore/T-004-deploy-dini | T-002, T-003 | Repositori terhubung ke Vercel (Build Command `npm run build`, Output Directory `dist`; cek dasbor); URL produksi terbuka dan scene minimal muncul; URL dicatat di PROGRESS |
| T-005 | Model komputer dari geometri bawaan dengan rotasi dan zoom | F1, R3 | M | todo | feat/T-005-model-komputer | T-003 | Model (casing, monitor, keyboard, mouse) dari geometri bawaan Three.js dapat diputar, diperbesar, dan diperkecil; tidak ada berkas model 3D eksternal |
| T-006 | Data komponen PC dan klik komponen dengan sorotan serta panel info | F1 | M | todo | feat/T-006-klik-komponen | T-005 | Klik komponen menyorotnya dan menampilkan name serta function dari `PCComponent`; tes memastikan semua `PCComponent` punya field wajib |
| T-007 | Data prosedur dan tahapan simulasi awal beserta tes validasi data | F2, F3 | M | todo | feat/T-007-data-tahapan | T-001 | Lima fase tertulis di data (isi diverifikasi mahasiswa dengan sumber tepercaya); tes memeriksa order berurutan, nextStepId valid, tahap terakhir null, interactionTarget ada; `npm test` lulus |
| T-008 | Logika state simulasi (K2, K4) beserta tes node --test | F2 | M | todo | feat/T-008-logika-simulasi | T-007 | Modul `src/logic/` tanpa DOM dan Three.js; tes: urutan penuh sampai shutdown, tindakan bukan expectedAction tidak memajukan tahap, tidak memakai penyimpanan browser; `npm test` lulus |
| T-009 | UI mulai, lanjut, ulang, indikator progres, dan penanda selesai | F2 | M | todo | feat/T-009-ui-simulasi | T-002, T-008 | Simulasi dapat dijalankan dari tombol mulai sampai penanda selesai dan tombol ulang; memuat ulang halaman kembali ke tahap awal |
| T-010 | Petunjuk interaktif, penandaan interactionTarget, dan daftar tahapan (K3) | F3 | M | todo | feat/T-010-petunjuk | T-006, T-009 | Petunjuk berganti sesuai tahap aktif dan komponen sasaran ditandai; memilih tahapan dari daftar tidak mengubah tahap aktif atau progres |
| T-011 | Deploy ulang, verifikasi URL, ukur FPS dan gzip setelah F1 sampai F3 | F1, F2, F3, R1 | S | todo | chore/T-011-deploy-must | T-010 | URL Vercel terbuka normal dan simulasi berjalan; FPS dicatat terhadap sasaran 30; ukuran gzip `dist/` dicatat dan tidak lebih dari 5 MB; hasil ada di PROGRESS |
| T-012 | Penjelasan fungsi setiap tahapan | F4 | S | todo | feat/T-012-penjelasan | T-010 | Memilih tahapan menampilkan description tahapan itu dalam Bahasa Indonesia tanpa mengubah tahap aktif |
| T-013 | Peringatan kesalahan prosedur dengan arahan perbaikan | F5 | M | todo | feat/T-013-peringatan | T-008, T-010 | Tindakan salah menampilkan banner dari warningMessage dan correction tahap aktif; tahap tetap sama sampai tindakan benar |
| T-014 | Data dan logika kuis beserta tes | F6 | S | todo | feat/T-014-logika-kuis | T-008 | `QuizQuestion` terisi; tes memastikan skor dihitung benar dan tidak ada penyimpanan di peramban; `npm test` lulus |
| T-015 | UI kuis dan skor akhir | F6 | M | todo | feat/T-015-ui-kuis | T-009, T-014 | Kuis tampil satu per satu setelah simulasi selesai; skor akhir, jawaban benar, dan penjelasan tampil; skor hilang setelah muat ulang |
| T-016 | Pembekuan fitur dan pemeriksaan akhir URL Vercel | R2 | S | todo | chore/T-016-pembekuan | T-011 | Mulai Senin 16 November 2026 pukul 20.00 WIB hanya perbaikan bug; `npm run lint`, `npm test`, `npm run build` lulus; uji manual 1280, 768, 375 px; URL terbuka normal |
| T-017 | Perapihan dokumentasi akhir: README, PROGRESS, LESSONS, REVIEW | dokumen | S | todo | docs/T-017-dokumen-akhir | T-016 | README memuat URL Vercel dan cara menjalankan; LESSONS memuat minimal satu pelajaran; REVIEW terisi |

### Langkah T-001 (setup)

1. Periksa Node.js dengan `node --version` (gunakan LTS aktif; cek nodejs.org) dan catat versinya di `docs/PROGRESS.md`.
2. Buat kerangka dengan perintah resmi `npm create vite@latest` memakai templat `vanilla` (cek perintah dan opsinya di dokumentasi Vite). Bila folder proyek tidak kosong, buat di folder sementara lalu salin berkas hasilnya.
3. Hapus kode contoh bawaan templat.
4. Verifikasi nama paket (`npm view three`, `npm view eslint`) lalu pasang: `npm install three` dan `npm install --save-dev eslint`; konfigurasikan ESLint mengikuti panduan resmi ESLint dan buat skrip `lint`.
5. Buat folder `src/data`, `src/logic`, `src/scene`, `src/ui`, `src/styles`, dan `tests`.
6. Atur skrip `test` di `package.json` menjadi `node --test` dan buat `tests/sample.test.js` yang lulus (pastikan berkas ini ditemukan oleh `node --test`; verifikasi pola penemuan di dokumentasi Node.js).
7. Pastikan `.gitignore` memuat `.env`, `node_modules`, dan `dist`; commit `package-lock.json`.
8. Jalankan `npm ci`, `npm run lint`, `npm test`, dan `npm run build`; semuanya harus lulus. Catat versi `three`, `vite`, dan `eslint` yang terpasang di PROGRESS.
9. Periksa bahwa `.github/workflows/ci.yml` ada; CI dibaca sebagai peringatan dini dan bukan syarat merge pada level Dasar.

## Backlog

- F1 (lanjutan): menambah detail visual model 3D setelah F1 sampai F3 berjalan di URL Vercel (R3).
- Ide belum dijadwalkan: alternatif keyboard untuk aksi pada objek 3D; perilaku saat WebGL tidak tersedia; header keamanan lewat konfigurasi Vercel. Ketiganya menunggu keputusan di `docs/DECISIONS.md` (Open Questions).
