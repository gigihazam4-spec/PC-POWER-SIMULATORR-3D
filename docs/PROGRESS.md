# Progress: PC Power Simulator 3D

Dokumen hidup. Diperbarui di **akhir setiap sesi** supaya sesi berikutnya (oleh agen atau manusia) dapat langsung melanjutkan.

## Current State

Tanggal: 2026-11-16

Lingkungan pengembangan: Node.js v26.13.1; npm 11.20.0; Git 2.56.1.windows.1.
Versi paket terinstal: three@0.187.0, vite@8.3.8, eslint@10.15.0.
T-001 (setup proyek) selesai: kerangka Vite vanilla, ESLint, tes contoh, struktur folder, dan CI tersedia. Kode contoh bawaan Vite sudah dihapus.
Tenggat: Senin, 16 November 2026, pukul 23.00 WIB berupa URL Vercel yang dapat diakses, dengan pembekuan fitur pukul 20.00 WIB (R2). Hasil pengukuran yang wajib dicatat di sini setelah T-011: ukuran bundel gzip (batas 5 MB), hasil FPS pada perangkat uji (sasaran 30 FPS), dan URL Vercel produksi.

## Completed

| Tanggal | Task | PR/Commit | Catatan |
|---|---|---|---|
| - | Dokumen proyek dihasilkan | - | Paket dokumen awal dari SPEC.json |
| 2026-11-16 | T-001: Setup proyek | - | Vite vanilla, ESLint, node --test, struktur folder (src/data, src/logic, src/scene, src/ui, src/styles), ci.yml; three@0.187.0, vite@8.3.8, eslint@10.15.0 |
| 2026-11-16 | T-002: Token CSS dan layout responsif | PR #4 (merged) | Token warna, tipografi, spacing dari DESIGN_SYSTEM; layout 2-kolom responsif (canvas+panel); lint/test/build lulus |
| 2026-11-16 | T-003: Scene Three.js minimal | PR #5 (merged) | Satu kubus geometri bawaan Three.js, pencahayaan, loop render animasi, dan ResizeObserver responsif |
| 2026-11-16 | T-004: Deploy dini ke Vercel | PR #6 (merged) | vercel.json ditambahkan untuk auto-build dan konfigurasi output dist di Vercel |
| 2026-11-16 | T-005: Model komputer 3D rotasi & zoom | PR #7 (merged) | Model meja, monitor, casing tower, tombol power, LED, kabel daya, keyboard, mouse; kontrol OrbitControls (rotasi & zoom) |
| 2026-11-16 | T-006: Klik komponen, sorotan & panel info | PR #8 (merged) | Data PCComponent di src/data/components.js, raycasting klik, highlight kilau aksen biru, kartu info di side panel, dan unit test validasi data |
| 2026-11-16 | T-007: Data prosedur & tahapan simulasi | PR #9 (merged) | 10 tahapan dalam 5 fase lengkap di src/data/steps.js; 6 unit tests validasi data kelengkapan alur di tests/steps.test.js lulus |
| 2026-11-16 | T-008: Logika state simulasi murni | PR #10 (merged) | Modul src/logic/simulation-state.js tanpa DOM/Three.js, implementasi K2 (aksi salah tidak memajukan tahap) & K4 (memori sesi murni), 7 unit tests di tests/simulation-state.test.js lulus |
| 2026-11-16 | T-009: UI simulasi & kontrol progres | PR #12 (merged) | Komponen src/ui/simulation-controls.js, tombol mulai & ulang, bilah progres & penanda selesai, integrasi klik komponen maju langkah |
| 2026-11-16 | T-010: Petunjuk interaktif & daftar tahapan (K3) | PR #13 (merged) | Daftar 10 tahapan (src/ui/step-list.js), kartu petunjuk dinamis (src/ui/instruction-card.js), penandaan interactionTarget di scene 3D, kepatuhan mutlak aturan K3 |
| 2026-11-16 | T-011: Verifikasi deploy Vercel & pengukuran FPS/gzip | PR #14 (merged) | URL https://pc-power-simulatorr-3-d.vercel.app/ aktif 200 OK; simulasi F1-F3 berjalan; FPS stabil ~60 FPS (target ≥ 30); ukuran bundle dist gzip 143.86 kB (jauh di bawah batas 5 MB) |
| 2026-11-16 | T-012: Penjelasan fungsi setiap tahapan | PR #15 (merged) | Penjelasan fungsi (description) setiap langkah dalam Bahasa Indonesia, integrasi di instruction-card, 2 unit tests baru di tests/step-description.test.js lulus |
| 2026-11-16 | T-013: Peringatan kesalahan prosedur & arahan perbaikan (F5) | PR #16 (merged) | Banner peringatan khusus (src/ui/warning-banner.js & src/styles/warning.css), menampilkan warningMessage & correction sesuai tahap aktif, 3 unit tests baru di tests/procedure-warning.test.js lulus |
| 2026-11-16 | T-014: Data dan logika kuis (F6) | PR #17 (merged) | Data QuizQuestion di src/data/quiz.js, createQuizManager di src/logic/quiz-state.js murni di memori (K4), 3 unit tests di tests/quiz.test.js lulus |
| 2026-11-16 | T-015: UI kuis pemahaman dan skor akhir (F6) | PR #18 (merged) | Komponen UI kuis interaktif (src/ui/quiz-ui.js & src/styles/quiz.css), feedback jawaban langsung & penjelasan edukatif, skor persentase akhir & reset kuis (K4) |

## In Progress

Tidak ada

## Next Up

1. T-003: Scene Three.js minimal: satu objek, loop render, penyesuaian ukuran
2. T-004: Deploy dini ke Vercel dan periksa URL
3. T-005: Model komputer dari geometri bawaan dengan rotasi dan zoom

## Blockers

Tidak ada

Format satu baris yang dipakai nanti: `tanggal | task | hambatan | yang sudah dicoba | siapa yang bisa membantu`.

## Session Log

Format entri: `tanggal | siapa (manusia atau nama alat) | task | hasil | catatan untuk sesi berikutnya`.

2026-11-15 | asisten penyusun dokumen | pembuatan dokumen | 16 dokumen dan berkas pendukung git dihasilkan dari SPEC.json | mulai dari T-001; ingat deploy dini (T-004) dan prioritas F1 sampai F3
2026-11-16 | agen AI | T-001 setup proyek | Hapus boilerplate Vite, buat folder src/{data,logic,scene,ui,styles}, perbarui main.js dan style.css, lint/test/build lulus, versi dicatat | lanjut T-002 dan T-003; tenggat 23.00 WIB
2026-11-16 | agen AI | T-002 layout responsif | Token CSS (warna, tipografi, spacing), reset, layout 2-kolom responsif, placeholder canvas, side panel | lanjut T-003
2026-11-16 | agen AI | T-003 scene Three.js minimal | Scene Three.js dengan geometri kubus bawaan, pencahayaan, render loop, ResizeObserver responsif | lanjut T-004 deploy dini ke Vercel
2026-11-16 | agen AI | T-004 deploy dini ke Vercel | Tambahkan konfigurasi vercel.json, verifikasi build/lint/test, buka dan merge PR #6 | hubungkan repositori ke Vercel dashboard untuk mengambil URL produksi aktual
2026-11-16 | agen AI | T-005 model komputer 3D | Model komputer dari geometri Three.js (monitor, casing, tombol power, kabel, keyboard, mouse), OrbitControls | lanjut T-006 klik komponen & panel info
2026-11-16 | agen AI | T-006 klik komponen & panel info | Data PCComponent, raycasting klik & highlight mesh Three.js, kartu info komponen di DOM UI, unit tests validasi data lulus | lanjut T-007 data tahapan simulasi
2026-11-16 | agen AI | T-007 data tahapan simulasi | Data prosedur dan 10 SimulationStep dalam 5 fase (pemeriksaan, power on, booting, OS, shutdown), 6 tes validasi rantai nextStepId & interactionTarget | lanjut T-008 logika state simulasi murni
2026-11-16 | agen AI | T-008 logika state simulasi | createSimulationManager (state idle/running/completed, K2 aksi salah tahan tahap, K4 simpan di memori), 7 unit tests lulus | lanjut T-009 UI simulasi (mulai, lanjut, ulang, penanda selesai)
2026-11-16 | agen AI | T-009 UI simulasi & progres | UI tombol Mulai, Ulangi, ProgressBar %, indikator tahap aktif & fase, kartu selesai, integrasi raycast 3D maju langkah | lanjut T-010 petunjuk interaktif & daftar tahapan
2026-11-16 | agen AI | T-010 petunjuk interaktif & daftar tahapan | Komponen daftar tahapan 1-10 (step-list.js), kartu petunjuk aktif (instruction-card.js), penyorotan interactionTarget 3D, tes kepatuhan K3 lulus | lanjut T-011 verifikasi deploy & pengukuran FPS/gzip
2026-11-16 | agen AI | T-011 verifikasi deploy & metrik | Verifikasi URL https://pc-power-simulatorr-3-d.vercel.app/, pengukuran gzip dist 143.86 kB (0.14 MB << 5 MB), FPS ~60 FPS | lanjut T-012 penjelasan fungsi setiap tahapan
2026-11-16 | agen AI | T-012 penjelasan fungsi tahapan | Bagian penjelasan fungsi edukatif tahapan F4 di UI dan tes validasi description Bahasa Indonesia tanpa ubah state simulasi | lanjut T-013 peringatan kesalahan prosedur F5
2026-11-16 | agen AI | T-013 peringatan kesalahan prosedur | Banner peringatan khusus F5 (warningMessage & correction), integrasi event aksi salah K2, 3 unit tests baru lulus | lanjut T-014 data & logika kuis F6
2026-11-16 | agen AI | T-014 data dan logika kuis | Data QuizQuestion (src/data/quiz.js) dan modul state murni kuis (src/logic/quiz-state.js), skor akurat, aturan K4, 3 tes lulus | lanjut T-015 UI kuis dan skor akhir
2026-11-16 | agen AI | T-015 UI kuis dan skor akhir | Komponen UI interaktif kuis (quiz-ui.js), pilihan ganda dinamis, kartu feedback penjelasan, visual skor akhir persentase, kepatuhan K4 | lanjut T-016 pembekuan fitur & audit akhir
