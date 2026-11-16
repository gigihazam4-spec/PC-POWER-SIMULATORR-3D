# Code Style: PC Power Simulator 3D

## Language and Tooling

Bahasa pemrograman adalah JavaScript (modul ES) yang berjalan di browser dan dibangun oleh Vite; typecheck tidak dipakai karena proyek tidak memakai TypeScript. Versi Node.js, Three.js, Vite, dan ESLint belum ditetapkan: tulis latest stable dan verifikasi dengan `node --version`, `npm view three version`, `npm view vite version`, dan `npm view eslint version`, lalu catat hasilnya di `docs/PROGRESS.md` pada T-001. Linter yang dipakai adalah ESLint (usulan asisten yang disetujui mahasiswa), dijalankan dengan `npm run lint`. Konfigurasi dibuat mengikuti panduan resmi ESLint pada T-001. Pemformat terpisah (Prettier atau Biome) tidak dipakai; bila ingin menambahkannya, catat sebagai keputusan baru di `docs/DECISIONS.md`. Gunakan `import` dan `export` (bukan `require`), `const` secara default, dan jangan menyalakan fitur JavaScript yang belum didukung browser sasaran.

## Naming

| Objek | Konvensi | Contoh |
|---|---|---|
| Berkas dan folder | kebab-case huruf kecil | `simulation-state.js`, `pc-model.js`, `src/logic/` |
| Variabel | camelCase | `activeStepId`, `selectedComponent` |
| Fungsi | camelCase berawalan kata kerja | `applyAction()`, `renderInstructionPanel()` |
| Kelas | PascalCase | `ComputerModel` |
| Konstanta | UPPER_SNAKE_CASE | `MAX_PIXEL_RATIO`, `SHUTDOWN_PHASE` |
| Field data | camelCase sesuai SPEC dan harus identik | `expectedAction`, `nextStepId`, `interactionTarget`, `warningMessage` |
| Entitas data | PascalCase pada komentar dan dokumen | `SimulationStep`, `PCComponent`, `QuizQuestion` |
| Kelas CSS | kebab-case | `panel-instruction`, `banner-warning` |
| Variabel CSS | awalan `--` dan nama token dari DESIGN_SYSTEM | `--color-bg`, `--space-4` |
| Variabel lingkungan | UPPER_SNAKE_CASE; yang dibaca klien berawalan `VITE_` | `VITE_APP_TITLE` (contoh; saat ini tidak dipakai) |
| Tabel dan kolom basis data | Tidak berlaku | Tidak ada database |
| Topik MQTT | Tidak berlaku | Bukan proyek IoT |

## Structure and Patterns

Tanggung jawab dipisah per folder: `src/data/` hanya berisi data (tanpa fungsi), `src/logic/` berisi fungsi murni tanpa DOM dan tanpa Three.js (dapat diuji `node --test`), `src/scene/` berisi kode Three.js, dan `src/ui/` berisi kode DOM. Arah ketergantungan: `ui` dan `scene` boleh mengimpor `logic`; `logic` hanya boleh mengimpor `data`; `logic` tidak boleh mengimpor `ui`, `scene`, atau Three.js. Saran ukuran: fungsi sekitar 40 baris atau kurang dan berkas sekitar 300 baris atau kurang; bila lebih, pecah. Pola yang dipakai: fungsi murni yang menerima state lalu mengembalikan state baru. Pola yang dihindari: state global yang diubah langsung dari banyak tempat dan logika tahap yang tertanam di penangan klik.

Contoh benar untuk F2 (logika murni, mudah diuji):

```js
// src/logic/simulation-state.js
export function applyAction(state, action, steps) {
  const step = steps.find((s) => s.id === state.activeStepId);
  if (!step || action !== step.expectedAction) {
    return { ...state, lastResult: { ok: false, stepId: step ? step.id : null } };
  }
  return { ...state, activeStepId: step.nextStepId, lastResult: { ok: true, stepId: step.id } };
}
```

Contoh salah: logika tahap tercampur dengan DOM dan scene sehingga tidak bisa diuji dan melanggar aturan tentang `innerHTML`:

```js
// salah: logika, DOM, dan Three.js bercampur di satu penangan klik
mesh.userData.onClick = () => {
  if (clicked === currentStep.expectedAction) currentStep = nextStep;
  document.querySelector('#instruction').innerHTML = currentStep.warningMessage;
};
```

## Error Handling

- Jangan menelan galat diam-diam; blok `catch` kosong dilarang.
- Bedakan galat yang dapat dipulihkan (tindakan salah pada simulasi: tahap tetap, peringatan tampil bila F5 ada) dari galat fatal (model gagal dibuat atau data tidak valid: tampilkan pesan umum dalam Bahasa Indonesia dan hentikan simulasi dengan aman).
- Pesan untuk pengguna ramah dan menjelaskan langkah berikutnya; detail teknis hanya untuk pengembang lewat `console.error` pada mode pengembangan.
- Jangan menampilkan jejak tumpukan atau nama berkas internal kepada pengguna.
- Perangkat spesifikasi rendah: bila animasi atau render melambat, kurangi beban render (mis. batasi pixel ratio) alih-alih menampilkan galat.

## Comments and Documentation

Komentar menjelaskan "mengapa", bukan "apa". Fungsi publik di `src/logic/` diberi komentar singkat tentang masukan, keluaran, dan aturan yang dijaga (mis. K2). Jangan meninggalkan kode yang dikomentari. Perbarui `docs/PROGRESS.md` setiap task selesai dan `docs/DECISIONS.md` bila ada keputusan baru, di commit yang sama dengan kodenya.

## Commit Messages

Format Conventional Commits: `tipe(ruang-lingkup): ringkasan imperatif`.

| Tipe | Contoh untuk proyek ini |
|---|---|
| feat | `feat(scene): tampilkan model komputer dari geometri bawaan (T-005)` |
| fix | `fix(logic): tolak tindakan di luar expectedAction (T-008)` |
| docs | `docs(progress): catat ukuran gzip hasil build (T-011)` |
| test | `test(logic): uji urutan tahap sampai shutdown (T-008)` |
| refactor | `refactor(ui): pisahkan panel petunjuk dari scene (T-010)` |
| chore | `chore(deps): perbarui eslint (T-001)` |
| ci | `ci: jalankan npm test pada pull request (T-001)` |

Satu commit satu perubahan logis; ringkasan maksimal 72 karakter; rujuk ID task (mis. T-003) di badan commit atau PR.

## Dependencies

- Tambah dependensi hanya bila dibutuhkan nyata, dipelihara aktif, dan lisensinya kompatibel.
- Verifikasi nama paket benar-benar ada dan milik penerbit yang dimaksud sebelum instal (`npm view <paket>`); waspadai salah eja dan nama karangan.
- Commit `package-lock.json`; pakai `npm ci` di CI dan di lingkungan bersih.
- Tiga dependensi awal yang direncanakan: `three`, `vite`, dan `eslint`; dependensi lain harus punya alasan dan dicatat di `docs/DECISIONS.md` bila besar.
- Jangan menambah dua pustaka untuk fungsi yang sama dan jangan menambah framework UI tanpa ADR baru.
- Ukuran bundel dipantau karena batas 5 MB gzip; pertimbangkan ukuran sebelum menambah dependensi.

## Forbidden Patterns

1. Rahasia, token, atau kata sandi di dalam kode atau repositori.
2. `innerHTML`, `outerHTML`, atau `eval` untuk menampilkan teks data atau pesan.
3. Memakai `localStorage`, `sessionStorage`, IndexedDB, atau cookie untuk progres atau skor (K4).
4. Mengimpor DOM, Three.js, atau modul `ui` dan `scene` dari `src/logic/`.
5. Menonaktifkan lint atau tes agar lulus (`eslint-disable` tanpa alasan tertulis, `test.skip` tanpa tugas lanjutan).
6. Mengubah tes agar lulus tanpa memperbaiki penyebabnya.
7. Kode tak terpakai, impor yang tidak dipakai, dan kode yang dikomentari.
8. Dua dependensi untuk fungsi yang sama.
9. Pesan galat yang membocorkan detail internal.
10. Memuat skrip atau font dari CDN eksternal saat runtime; semuanya dibundel Vite.
11. Memakai berkas model 3D eksternal untuk versi awal (R3) tanpa keputusan baru di DECISIONS.
12. Teks petunjuk, penjelasan, peringatan, atau kuis yang ditulis langsung di kode logika alih-alih di `src/data/`.

## AI-Generated Code Rules

- Mahasiswa wajib bisa menjelaskan setiap perubahan yang disalin dari chat; bila belum paham, minta penjelasan sebelum menyalin.
- Minta perubahan kecil dan fokus pada satu task (satu T-nnn) per percakapan.
- Jalankan `npm run lint` dan `npm test` sebelum menerima perubahan, dan `npm run build` sebelum deploy.
- Periksa bahwa API, fungsi, dan paket yang disarankan benar-benar ada, terutama untuk Three.js (cek dokumentasi resmi threejs.org untuk jalur impor pada versi yang terpasang).
- Jangan menerima kode yang tidak dipahami atau yang menambah dependensi tanpa alasan.
- Catat kesalahan berulang alat AI di `docs/LESSONS.md`.
