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

## In Progress

Tidak ada

## Next Up

1. T-002: Token CSS dan layout responsif kerangka (canvas dan panel)
2. T-003: Scene Three.js minimal: satu objek, loop render, penyesuaian ukuran
3. T-004: Deploy dini ke Vercel dan periksa URL

## Blockers

Tidak ada

Format satu baris yang dipakai nanti: `tanggal | task | hambatan | yang sudah dicoba | siapa yang bisa membantu`.

## Session Log

Format entri: `tanggal | siapa (manusia atau nama alat) | task | hasil | catatan untuk sesi berikutnya`.

2026-11-15 | asisten penyusun dokumen | pembuatan dokumen | 16 dokumen dan berkas pendukung git dihasilkan dari SPEC.json | mulai dari T-001; ingat deploy dini (T-004) dan prioritas F1 sampai F3
2026-11-16 | agen AI | T-001 setup proyek | Hapus boilerplate Vite, buat folder src/{data,logic,scene,ui,styles}, perbarui main.js dan style.css, lint/test/build lulus, versi dicatat | lanjut T-002 dan T-003; tenggat 23.00 WIB
