# AGENTS.md — PC Power Simulator 3D

> Simulator 3D interaktif berbasis web untuk mengajarkan pemula menyalakan dan mematikan komputer desktop dengan benar.

File ini dibaca agen AI di setiap sesi. Jaga tetap singkat (maksimal 150 baris); detail ada di `docs/`.

## Project

PC Power Simulator 3D adalah aplikasi web edukasi interaktif yang menampilkan komputer desktop dalam 3D untuk mengajarkan cara menyalakan dan mematikannya dengan benar. Platform: web (situs statis). Pengguna: pelajar, mahasiswa, dan masyarakat umum yang masih pemula. Level proses: dasar. Alat AI: chat di browser (salin tempel manual); tempelkan file ini dan `docs/PROGRESS.md` di awal setiap percakapan.

## Read First

Muat dokumen saat dibutuhkan; jangan membaca semuanya jika tidak perlu, kecuali `docs/PROGRESS.md`, `docs/TASKS.md`, dan `docs/GUARDRAILS.md` di awal sesi.

- `docs/PRD.md`: kebutuhan produk, fitur F1 sampai F6, dan kriteria acceptance.
- `docs/ARCHITECTURE.md`: stack, struktur folder, model data, dan deployment.
- `docs/TASKS.md`: daftar task bernomor T-nnn dan statusnya.
- `docs/PROGRESS.md`: keadaan terakhir proyek dan langkah berikutnya.
- `docs/WORKFLOW.md`: siklus kerja, ritual sesi, dan titik pemeriksaan manusia.
- `docs/GUARDRAILS.md`: batas mutlak, hal yang butuh persetujuan, dan kebijakan perintah destruktif.
- `docs/EVALS.md`: gerbang kualitas dan eval per fitur.
- `docs/CODE_STYLE.md`: penamaan, struktur kode, dan aturan commit.
- `docs/SECURITY.md`: ancaman, aturan keamanan, dan checklist OWASP.
- `docs/TESTING.md`: strategi tes, perintah, dan daftar uji manual.
- `docs/DESIGN_SYSTEM.md`: token warna, tipografi, layout, dan komponen.
- `docs/DECISIONS.md`: keputusan arsitektur, usulan asisten, dan pertanyaan terbuka.
- `docs/REVIEW.md`: pertanyaan pemahaman untuk mahasiswa.
- `docs/LESSONS.md`: pelajaran dan kesalahan alat AI.

## Tech Stack

- Frontend: HTML5, CSS3, dan JavaScript tanpa framework UI.
- 3D: Three.js (latest stable; verifikasi dengan `npm view three version`).
- Build tool: Vite (latest stable; verifikasi dengan `npm view vite version`).
- Backend: tidak ada. Database: tidak ada (data simulasi berupa berkas JS atau JSON).
- Auth: tidak ada.
- Hosting: Vercel.
- Testing: gabungan `node --test` (otomatis) dan uji manual di browser; lint dengan ESLint.
- Stack dipilih mahasiswa: jangan mengusulkan penggantian stack; ikuti konvensi resmi teknologi ini.

## Commands

Perintah ini berasal dari `SPEC.json` (`stack.commands`) dan identik dengan `docs/TESTING.md`, `docs/EVALS.md`, dan CI.

```bash
npm ci
npm run lint
npm test
npm run build
```

- `npm ci`: instal dependensi dari lockfile (tersedia setelah T-001).
- `npm run lint`: jalankan ESLint (tersedia setelah T-001).
- `npm test`: jalankan tes otomatis dengan `node --test` (tersedia setelah T-001).
- `npm run build`: build produksi Vite ke `dist/` (tersedia setelah T-001).
- `npm run dev`: server pengembangan Vite (tersedia setelah T-001).
- Perintah typecheck tidak ada karena proyek memakai JavaScript.

## Conventions

- JavaScript modul ES; nama berkas kebab-case, variabel dan fungsi camelCase, field data persis seperti SPEC (`expectedAction`, `nextStepId`).
- Pisahkan folder: `src/data/` (data), `src/logic/` (fungsi murni, tanpa DOM dan Three.js), `src/scene/` (Three.js), `src/ui/` (DOM).
- Teks data ditampilkan dengan `textContent`; jangan memakai `innerHTML` atau `eval`.
- Progres dan skor hanya di memori sesi; jangan memakai `localStorage` atau penyimpanan lain.
- Model awal dari geometri bawaan Three.js tanpa berkas model eksternal.
- Antarmuka Bahasa Indonesia, mode gelap saja, warna dan jarak dari token di `docs/DESIGN_SYSTEM.md`.
- Commit memakai Conventional Commits dan merujuk ID task.

## Workflow Rules

Kerjakan satu task per sesi dari `docs/TASKS.md`; mulai dari cabang baru; jalankan gerbang EVALS sebelum menyatakan selesai; perbarui `docs/PROGRESS.md` di akhir sesi; catat keputusan di `docs/DECISIONS.md` dan kesalahan yang dipelajari di `docs/LESSONS.md`; berhenti dan minta review manusia sebelum merge. Prioritas: deploy dini ke Vercel, lalu F1 sampai F3; F4, F5, dan F6 menyusul. Tenggat: Senin, 16 November 2026 pukul 23.00 WIB; fitur dibekukan pukul 20.00 WIB (R2).

## Boundaries

### Always
- Baca `docs/PROGRESS.md` dan `docs/TASKS.md` dahulu.
- Jalankan lint, tes, dan build sebelum menyatakan selesai.
- Buat commit kecil dan ikuti ID fitur (F1 sampai F6) dari PRD.
- Periksa URL Vercel setelah setiap fitur `must` selesai (R1).

### Ask First
- Menambah dependensi baru atau memakai berkas model 3D eksternal.
- Mengubah struktur data atau arsitektur.
- Mengubah CI atau konfigurasi Vercel.
- Lihat `docs/GUARDRAILS.md` untuk daftar lengkap.

### Never
- Commit langsung ke `main`, force push, atau perintah destruktif tanpa konfirmasi.
- Menaruh rahasia atau token di kode atau chat.
- Melemahkan atau menonaktifkan tes dan lint agar lulus.
- Mengarang API, versi, atau hasil tes.
- Menyimpan data di `localStorage` atau mengumpulkan data pribadi.
- Mengendalikan komputer sungguhan atau memuat skrip eksternal saat runtime.

## Definition of Done

- Kriteria acceptance fitur terpenuhi dan tes baru lulus.
- Lint bersih dan build berhasil.
- Tidak ada rahasia di perubahan.
- `docs/PROGRESS.md` dan `docs/DECISIONS.md` diperbarui bila perlu.
- Mahasiswa memeriksa hasil dan dapat menjelaskan perubahannya; untuk fitur `must`, URL Vercel diperiksa.
