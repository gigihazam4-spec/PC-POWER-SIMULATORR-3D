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
| Awal (belum terjadi di proyek ini) | Alat AI menyarankan nama paket atau jalur impor Three.js yang tidak ada atau sudah berubah | Pengetahuan model bisa usang atau keliru | Verifikasi nama paket dengan `npm view <paket>` dan jalur impor di dokumentasi resmi sebelum menyalin | `docs/CODE_STYLE.md` (Dependencies), `docs/GUARDRAILS.md` |
| Awal (belum terjadi di proyek ini) | Tes diubah atau dilewati agar `npm test` lulus | Tekanan menyelesaikan cepat menjelang tenggat | Tes tidak boleh dilemahkan; perbaiki penyebabnya | `docs/EVALS.md` (Regression Policy), `docs/GUARDRAILS.md` |
| Awal (belum terjadi di proyek ini) | Beberapa task dikerjakan sekaligus dalam satu jawaban chat | Permintaan terlalu besar | Satu task (T-nnn) per percakapan | `docs/WORKFLOW.md`, `docs/GUARDRAILS.md` |
| Awal (belum terjadi di proyek ini) | Teks data ditulis dengan `innerHTML` atau progres disimpan di `localStorage` | Kebiasaan umum di contoh kode | Pakai `textContent`; progres hanya di memori sesi | `docs/CODE_STYLE.md` (Forbidden Patterns), `docs/SECURITY.md` |
| Awal (belum terjadi di proyek ini) | Model 3D eksternal atau dependensi berat ditambahkan sehingga bundel dan beban render membengkak | Ingin tampilan lebih detail terlalu cepat | Model awal dari geometri bawaan (R3); dependensi besar perlu persetujuan | `docs/GUARDRAILS.md` (Ask Before), `docs/EVALS.md` (Ukuran bundel) |

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
