# Testing: PC Power Simulator 3D

## Strategy

Strategi pengujian adalah gabungan yang dipilih mahasiswa: pengujian otomatis dengan `node --test` untuk logika yang tidak bergantung pada browser (urutan tahap, validasi tindakan, kuis, dan keutuhan data) serta pengujian manual di browser untuk tampilan 3D, interaksi, peringatan, dan responsivitas. Piramida yang dipakai: banyak tes unit pada modul `src/logic/` dan `src/data/`, tanpa tes E2E otomatis, dan daftar periksa manual untuk lapisan tampilan. Pada level Dasar dengan satu orang dan tenggat Senin, 16 November 2026 pukul 23.00 WIB, pendekatan ini cukup karena risiko terbesar ada pada logika urutan dan pada tampilan yang memang harus dilihat langsung. Logika dipisahkan dari Three.js dan DOM justru agar bagian terpenting dapat diuji otomatis dengan cepat.

## Test Types

| Jenis | Alat | Lokasi berkas | Kapan dijalankan | Perintah |
|---|---|---|---|---|
| Unit logika dan data | Node.js test runner (`node --test`) | `tests/*.test.js` | Setiap perubahan pada `src/logic/` atau `src/data/`, dan sebelum deploy | `npm test` |
| Lint | ESLint | seluruh `src/` dan `tests/` | Sebelum menyalin hasil dari chat ke proyek, dan sebelum deploy | `npm run lint` |
| Build produksi | Vite | folder `dist/` | Sebelum deploy dan saat memeriksa ukuran bundel | `npm run build` |
| Manual di browser | Browser dan DevTools | Daftar periksa di bagian Manual Test Checklist | Setiap fitur selesai dan sebelum tenggat | dijalankan manual |
| Pemeriksaan URL produksi | Browser | URL Vercel | Setiap fitur `must` selesai (R1) dan sebelum pengumpulan | dijalankan manual |

## What Must Be Tested

Fitur `must` (wajib diuji):

- **F1 (Model 3D interaktif):** rotasi, zoom, dan klik komponen merespons (manual); setiap `PCComponent` punya `name`, `function`, dan `interactionTarget` yang tidak kosong (otomatis); tampilan pada lebar 1280, 768, dan 375 px tanpa gulir horizontal (manual); sasaran 30 FPS dan ukuran gzip tidak lebih dari 5 MB (manual, dicatat di PROGRESS).
- **F2 (Simulasi):** urutan lengkap dari pemeriksaan perangkat sampai shutdown dapat diselesaikan; tindakan yang bukan `expectedAction` tidak memajukan tahap (K2); tahap terakhir menghasilkan status selesai; memuat ulang mengembalikan ke tahap awal dan tidak ada penyimpanan di peramban (K4). Semuanya otomatis kecuali tampilan penanda selesai (manual).
- **F3 (Petunjuk):** setiap tahap punya `instruction`; `interactionTarget` yang dirujuk tahap ada pada data komponen; memilih tahapan dari daftar tidak mengubah tahap aktif (K3). Otomatis untuk data dan logika, manual untuk penandaan di model 3D.

Fitur `should` dan `could`:

- **F4 (Penjelasan):** setiap tahap punya `description`; memilih tahapan hanya mengganti penjelasan (otomatis untuk data, manual untuk tampilan).
- **F5 (Peringatan):** tindakan salah menghasilkan `warningMessage` dan `correction` tahap aktif dan tahap tidak berubah (otomatis untuk logika, manual untuk tampilan banner).
- **F6 (Kuis):** perhitungan skor benar, penjelasan tampil setelah dijawab, skor tidak tersimpan (otomatis untuk logika, manual untuk tampilan).

Uji keamanan dan galat yang wajib: otorisasi per peran tidak berlaku (satu peran); masukan tidak dikenal (nama tindakan atau id tahapan yang tidak ada) ditolak tanpa galat tak tertangani (otomatis); data tahap tidak valid membuat simulasi gagal aman (otomatis); teks data ditampilkan tanpa `innerHTML` (periksa lewat lint dan tinjauan kode).

## Commands

Perintah utama (dari `stack.commands`, identik dengan AGENTS.md, EVALS.md, dan CI):

| Tujuan | Perintah |
|---|---|
| Instal | `npm ci` |
| Lint | `npm run lint` |
| Semua tes | `npm test` |
| Build | `npm run build` |

Perintah tambahan:

- Server pengembangan: `npm run dev`.
- Satu berkas tes: `node --test tests/<nama-berkas>.test.js` (Node.js built-in test runner; verifikasi pola penemuan berkas pada versi Node yang terpasang lewat dokumentasi resmi Node.js).
- Mode watch: `node --test --watch` (verifikasi dukungan pada versi Node yang terpasang dengan `node --help`).
- Pemeriksaan tipe: tidak ada, karena perintah `typecheck` dikosongkan.
- Tes E2E: tidak ada.
- Skrip `test` di `package.json` yang menjalankan `node --test` dan satu berkas tes contoh dibuat oleh task setup T-001; `npm test` tidak boleh gagal karena tidak ada berkas tes.

## Coverage and Quality Bar

Target cakupan realistis: logika di `src/logic/` diuji pada semua cabang keputusan penting (tindakan benar, tindakan salah, tahap terakhir, memulai ulang, dan penghitungan skor), sedangkan kode tampilan cukup diuji manual. Tidak ada angka persentase yang dipaksakan. Tes tidak boleh dihapus atau dilemahkan agar lulus. Setiap bug yang diperbaiki mendapat tes baru yang gagal sebelum perbaikan dan lulus sesudahnya.

## Test Data

Data uji sepenuhnya fiktif dan berasal dari berkas data simulasi di `src/data/` atau data kecil buatan di dalam berkas tes. Tidak ada data pribadi asli (`data.personal_data` = none), tidak ada basis data yang perlu direset, dan tidak ada layanan eksternal yang perlu sandbox. Tes tidak boleh bergantung pada jaringan.

## Manual Test Checklist

- [ ] Halaman dibuka di minimal dua browser yang tersedia (mis. Chrome dan Firefox) tanpa galat di konsol.
- [ ] Model 3D tampil dan dapat diputar dengan mouse dan dengan sentuhan.
- [ ] Zoom memperbesar dan memperkecil model dalam batas yang wajar.
- [ ] Mengeklik komponen menyorot komponen itu dan menampilkan nama serta fungsinya.
- [ ] Tombol mulai menjalankan tahap pertama dan petunjuk tampil.
- [ ] Simulasi dapat diselesaikan dari pemeriksaan perangkat sampai shutdown yang benar.
- [ ] Tindakan di luar urutan tidak memajukan tahap.
- [ ] Peringatan tampil dengan penjelasan dan arahan perbaikan (bila F5 sudah dibuat).
- [ ] Memilih tahapan dari daftar hanya mengganti petunjuk atau penjelasan, bukan progres.
- [ ] Memuat ulang halaman mengembalikan simulasi ke tahap awal.
- [ ] Tampilan pada lebar 1280, 768, dan 375 px tanpa gulir horizontal (DevTools mode perangkat).
- [ ] Seluruh fungsi utama dapat dijangkau dengan keyboard dan fokus terlihat.
- [ ] Sasaran 30 FPS tercapai pada perangkat uji berspesifikasi rendah dan hasilnya dicatat.
- [ ] Ukuran bundel gzip tidak melebihi 5 MB dan ukuran aktual dicatat di `docs/PROGRESS.md`.
- [ ] URL Vercel terbuka normal dan scene 3D muncul (R1).

## Definition of Done

Satu task selesai bila:

- [ ] Kriteria acceptance fitur terkait terpenuhi (lihat PRD dan EVALS).
- [ ] Tes baru ditulis untuk logika yang berubah dan semua tes lulus (`npm test`).
- [ ] Lint bersih (`npm run lint`) dan tidak ada pemeriksaan tipe yang diperlukan.
- [ ] Build berhasil (`npm run build`).
- [ ] Tidak ada rahasia di perubahan.
- [ ] `docs/PROGRESS.md` diperbarui dan `docs/DECISIONS.md` bila ada keputusan baru.
- [ ] Mahasiswa memeriksa hasil dan dapat menjelaskan perubahannya (level Dasar: review setiap task).
- [ ] Untuk task fitur `must`: URL Vercel diperiksa ulang (R1).
