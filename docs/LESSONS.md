# Lessons: PC Power Simulator 3D

Kesalahan berulang dan pelajaran dari proyek ini. **Dibaca agen di awal setiap sesi.** Entri baru ditambahkan oleh mahasiswa atau agen setelah kesalahan ditemukan.

## How to Use

- Tambahkan entri bila ada galat yang menghabiskan lebih dari 30 menit, perilaku alat AI yang salah dan berulang, atau temuan dari review.
- Gunakan format tabel di bawah: tanggal, gejala, akar masalah, aturan baru, dan dokumen tempat aturan diterapkan.
- Ubah pelajaran menjadi aturan dengan menambahkannya ke `docs/CODE_STYLE.md`, `docs/GUARDRAILS.md`, atau `docs/EVALS.md`.
- Tulis singkat dan tanpa menyalahkan siapa pun.

## Lessons Log

| Tanggal | Kesalahan atau gejala | Akar masalah | Aturan baru | Diterapkan di |
|---|---|---|---|---|
| 2026-11-16 | Canvas 3D dan side panel tidak tampil di Vercel (tinggi 0px) | CSS height chain terputus karena `#app` dan `.app-shell` belum memiliki `height: 100%` | Selalu pastikan elemen root dan shell aplikasi SPA/Canvas memiliki ketinggian eksplisit 100% | `src/styles/layout.css` |
| 2026-11-16 | Memilih tahapan dari daftar berisiko mengubah langkah aktif | Salah menghubungkan event handler daftar tahapan dengan dispatcher state utama | Patuhi aturan K3 secara ketat: seleksi daftar hanya mengubah tampilan pratinjau info tanpa memanggil handler aksi atau memajukan indeks tahap | `src/ui/step-list.js`, `tests/step-list.test.js` |
| 2026-11-16 | Pengujian Node test runner gagal karena `localStorage` terdeteksi | Node v22+ memiliki built-in localStorage eksperimental pada globalThis | Jangan melakukan asersi `typeof localStorage === 'undefined'`, cukup uji bahwa modul logika tidak memanggil atau bergantung pada penyimpanan peramban | `tests/quiz.test.js`, `src/logic/` |

## Patterns to Watch

- **API Three.js yang berubah antar versi.** Contoh kode dari chat bisa memakai jalur impor atau nama kelas lama. Deteksi: cek versi dengan `npm ls three` dan cocokkan dengan dokumentasi resmi threejs.org.
- **Format konfigurasi ESLint yang berubah antar versi mayor.** Deteksi: `npm run lint` gagal dengan galat konfigurasi; ikuti panduan resmi untuk versi yang terpasang.
- **Pengaturan Vite atau Vercel yang kadaluarsa.** Deteksi: build di Vercel gagal atau halaman kosong; cocokkan Build Command dan Output Directory dengan dokumentasi dan dasbor.
- **Kebocoran memori atau beban render pada perangkat lemah.** Loop render yang tidak dibersihkan atau geometri yang tidak dilepas menurunkan FPS. Deteksi: pantau FPS dan memori di DevTools saat model diputar 10 detik.
- **Logika tahap yang tercampur dengan DOM atau Three.js.** Membuat logika tidak bisa diuji. Deteksi: cari impor DOM atau Three.js di `src/logic/` dan pastikan `node --test` berjalan tanpa browser.

## Reflection Prompts

1. Keputusan apa yang kamu ubah selama pengerjaan dan mengapa?
2. Bagian mana yang dikerjakan alat AI dengan baik dan mana yang salah atau harus kamu perbaiki?
3. Apa yang akan kamu lakukan berbeda dalam mengelola waktu menjelang tenggat?
4. Apa yang kamu pelajari tentang Three.js dan prosedur menyalakan serta mematikan komputer?
5. Aturan baru apa yang paling berguna dan sudah ditambahkan ke dokumen proyek?
