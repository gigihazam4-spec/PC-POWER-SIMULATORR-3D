# Workflow: PC Power Simulator 3D

## Cycle

Setiap task mengikuti siklus yang sama:

`Plan -> Branch -> Implement -> Test -> Review -> Commit -> Pull Request -> Merge -> Update Docs`

- **Plan:** pilih tepat satu task berstatus `todo` dari `docs/TASKS.md` (mis. T-005), baca kriteria selesai dan fitur terkait di `docs/PRD.md`. Karena alat AI adalah chat di browser yang tidak membaca folder proyek, mahasiswa menempelkan `AGENTS.md`, `docs/PROGRESS.md`, dan baris task itu di awal percakapan.
- **Branch:** buat cabang dari `main`, misalnya `feat/T-005-model-komputer`.
- **Implement:** minta perubahan kecil untuk satu task di chat, lalu salin hasilnya ke proyek.
- **Test:** jalankan gerbang di `docs/EVALS.md`: `npm run lint`, `npm test`, dan `npm run build`.
- **Review:** mahasiswa wajib memeriksa setiap perubahan dan dapat menjelaskannya (level Dasar: pemeriksaan manusia di setiap task); isi tiga pertanyaan di `docs/REVIEW.md` bila perubahan penting.
- **Commit:** pesan mengikuti `docs/CODE_STYLE.md`, mis. `feat(scene): tampilkan model komputer dari geometri bawaan (T-005)`.
- **Pull Request:** buka PR dari cabang task ke `main` memakai `.github/pull_request_template.md`.
- **Merge:** gabungkan setelah review manusia; hapus cabang.
- **Update Docs:** perbarui status task, `docs/PROGRESS.md`, dan `docs/DECISIONS.md` atau `docs/LESSONS.md` bila perlu. Untuk task fitur `must`, deploy ulang lalu periksa URL Vercel (R1).

## Session Start Ritual

1. Buka percakapan baru di chat dan tempelkan isi `AGENTS.md`.
2. Tempelkan `docs/PROGRESS.md` agar keadaan terakhir diketahui.
3. Tempelkan `docs/LESSONS.md` bila sudah berisi catatan.
4. Pilih tepat satu task berstatus `todo` dari `docs/TASKS.md`, tempelkan barisnya, lalu ubah statusnya menjadi `doing`.
5. Pastikan berada di cabang task (bukan `main`) dan `git status` bersih.
6. Tempelkan hanya bagian dokumen lain yang dibutuhkan task itu (mis. bagian fitur di PRD), bukan semuanya.

## Session End Ritual

1. Jalankan gerbang di `docs/EVALS.md` (`npm run lint`, `npm test`, `npm run build`).
2. Commit kecil dengan pesan sesuai `docs/CODE_STYLE.md`.
3. Perbarui status task di `docs/TASKS.md` menjadi `review` atau `done`.
4. Tulis ringkasan di `docs/PROGRESS.md`: yang selesai, yang berikutnya, hambatan.
5. Catat keputusan baru di `docs/DECISIONS.md` dan kesalahan alat AI di `docs/LESSONS.md`.
6. Push cabang dan buka PR.
7. Berhenti dan lakukan review manusia sebelum merge.

## Branching Strategy

`main` selalu stabil dan dilindungi dari force push; tidak ada commit langsung ke `main`. Fitur di cabang `feat/T-nnn-nama`, perbaikan di `fix/T-nnn-nama`, dan dokumen di `docs/nama`. Satu cabang satu task, dan cabang dihapus setelah merge. Sebelum membuka PR, gabungkan `main` ke cabang (merge, bukan rebase, agar lebih sederhana bagi pemula). Karena tim hanya satu orang, PR dibuka dari cabang sendiri dan diperiksa mahasiswa sendiri; bila memungkinkan, minta teman atau dosen meninjau perubahan besar.

## Commit and Pull Request Rules

Aturan commit mengikuti `docs/CODE_STYLE.md` (Conventional Commits, ringkasan maksimal 72 karakter, rujuk ID task). Isi PR wajib: ringkasan, ID task, ID fitur (F1 sampai F6), cara menguji, hasil gerbang EVALS, dan tangkapan layar tampilan 3D bila relevan. Ukuran PR kecil dengan satu tujuan. Syarat merge pada level Dasar: satu pemeriksaan manusia (mahasiswa memastikan bisa menjelaskan perubahan). CI bukan syarat merge, tetapi hasilnya tetap dibaca dan kegagalannya diperbaiki. Rujuk `.github/pull_request_template.md`.

## Human-in-the-Loop Checkpoints

| Titik kontrol | Siapa | Yang diperiksa |
|---|---|---|
| Sebelum menyalin hasil dari chat ke proyek | Mahasiswa | Perubahan kecil, sesuai task, dipahami, tidak menambah dependensi diam-diam |
| Sebelum merge (setiap task) | Mahasiswa | Gerbang EVALS lulus, kriteria acceptance terpenuhi, tidak ada rahasia di perubahan |
| Sebelum menambah dependensi besar | Mahasiswa (dan dosen bila perlu) | Nama paket benar, alasan, ukuran bundel (batas 5 MB gzip), dicatat di DECISIONS |
| Sebelum mengubah struktur data atau arsitektur | Mahasiswa | Perubahan pada `SimulationStep`, `PCComponent`, atau pemisahan `logic`/`scene`/`ui`; ADR baru |
| Sebelum perintah destruktif | Mahasiswa | Dampak perintah dan cadangan cabang (lihat GUARDRAILS) |
| Sebelum memakai layanan berbayar | Mahasiswa | Tidak dipakai; hanya paket gratis |
| Sebelum data nyata dipakai | Mahasiswa | Tidak berlaku karena tidak ada data pribadi |
| Sebelum pembekuan fitur (R2) | Mahasiswa | Daftar fitur yang masuk dan yang ditunda disepakati |
| Sebelum pengumpulan | Mahasiswa | URL Vercel terbuka normal dan simulasi berjalan |

## Handling Blockers

Bila macet: coba maksimal tiga pendekatan berbeda, catat apa yang sudah dicoba di `docs/PROGRESS.md`, tandai task `blocked`, lalu minta bantuan (dosen, teman, atau dokumentasi resmi Three.js, Vite, dan Vercel). Alat AI dilarang melewati blocker dengan mematikan tes, menurunkan keamanan, atau mengarang API. Karena tenggat dekat, bila blocker menimpa fitur `should` atau `could`, tunda dan utamakan F1 sampai F3 serta URL yang berfungsi.

## Level Notes

- **Dasar (AKTIF):** satu pengembang, alur sederhana, pemeriksaan manusia di setiap task, pengujian minimum otomatis ditambah manual; CI bukan syarat merge.
- **Menengah:** tugas terstruktur, CI wajib, review rutin per PR (tidak dipakai).
- **Loop:** agen berputar dengan batas dan kondisi berhenti ketat, merujuk `docs/LOOP.md` (tidak dipakai).
