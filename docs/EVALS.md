# Evals: PC Power Simulator 3D

Evals adalah kriteria lulus yang **dapat dicek mesin**. Agen dan manusia memakai dokumen ini untuk memutuskan apakah suatu pekerjaan selesai.

## Purpose

Evals dipakai agar "selesai" berarti hasil yang dapat diperiksa, bukan perasaan. Pada level Dasar, gerbang dijalankan secara manual dan lokal oleh mahasiswa sebelum menyalin hasil ke proyek dan sebelum deploy; CI menjalankan perintah yang sama sebagai peringatan dini tetapi bukan syarat merge.

## Quality Gates

Semua gerbang di tabel harus lulus sebelum merge ke `main`.

| Gerbang | Perintah | Kriteria lulus | Dijalankan di |
|---|---|---|---|
| Lint | `npm run lint` | Tanpa galat | Lokal dan CI |
| Tes | `npm test` | Semua tes lulus | Lokal dan CI |
| Build | `npm run build` | Build berhasil | Lokal dan CI |

Gerbang tambahan:

| Gerbang | Perintah atau cara | Kriteria lulus | Dijalankan di |
|---|---|---|---|
| Pemindaian dependensi | `npm audit` | Tidak ada kerentanan tingkat tinggi atau kritis yang belum ditangani; sisanya dicatat | Lokal sebelum deploy |
| Secret scanning | Fitur secret scanning GitHub | Tidak ada peringatan terbuka | GitHub |
| Ukuran bundel | Jumlah ukuran gzip berkas di `dist/` setelah `npm run build` | Tidak lebih dari 5 MB dan ukuran aktual dicatat di `docs/PROGRESS.md` | Lokal setelah build |
| Pemeriksaan URL | Buka URL Vercel di browser | Halaman tampil tanpa galat dan scene 3D muncul | Setelah deploy |
| Tes E2E | Tidak ada | Tidak berlaku | Tidak berlaku |
| Pemeriksaan tipe | Tidak ada (perintah `typecheck` kosong) | Tidak berlaku | Tidak berlaku |

## Feature Acceptance Evals

| ID | Eval | Cara dijalankan | Kriteria lulus |
|---|---|---|---|
| F1 | Interaksi model 3D | Manual: buka halaman, putar, perbesar, perkecil, dan klik komponen | Jika pengguna memutar, memperbesar, memperkecil, atau mengeklik komponen komputer, model 3D merespons interaksi tersebut. |
| F1 | Informasi komponen | Otomatis: `npm test` memeriksa bahwa setiap `PCComponent` punya `name`, `function`, dan `interactionTarget` tidak kosong; manual: klik tombol power atau monitor pada model | Jika pengguna mengeklik sebuah komponen (mis. tombol power atau monitor), komponen itu tersorot dan nama serta fungsinya dari data PCComponent tampil di panel info. |
| F1 | Responsif | Manual: DevTools mode perangkat pada 1280, 768, dan 375 px | Jika halaman dibuka pada lebar layar 1280, 768, dan 375 px, canvas 3D dan kontrol utama tetap terlihat dan dapat dipakai tanpa gulir horizontal. |
| F1 | Kinerja dan ukuran | Manual: ukur FPS 10 detik di perangkat uji; jumlahkan ukuran gzip `dist/` | Jika model diputar terus-menerus selama 10 detik pada perangkat uji berspesifikasi rendah, tampilan mencapai sasaran 30 FPS atau lebih; angka ini sasaran pengujian, bukan jaminan di semua perangkat. Jika npm run build dijalankan, ukuran bundel produksi terkompresi gzip tidak melebihi 5 MB dan ukuran aktualnya dicatat di docs/PROGRESS.md. |
| F2 | Urutan simulasi | Otomatis: `npm test` menjalankan semua tahap sampai shutdown | Jika pengguna menekan tombol mulai dan melanjutkan tahapan simulasi, sistem menampilkan urutan pemeriksaan perangkat, menyalakan komputer, proses booting, masuk ke sistem operasi, hingga prosedur shutdown yang benar. |
| F2 | Tindakan salah (K2) | Otomatis: `npm test` | Jika pengguna melakukan tindakan yang bukan expectedAction pada tahap aktif, simulasi tidak maju dan tetap berada di tahap yang sama. |
| F2 | Penanda selesai | Manual dan otomatis untuk status selesai | Jika pengguna menyelesaikan tahap shutdown terakhir, simulasi menampilkan penanda selesai dan tombol untuk mengulang dari awal. |
| F2 | Tanpa penyimpanan (K4) | Otomatis: tes memastikan state hanya di memori; manual: muat ulang halaman | Jika halaman dimuat ulang, simulasi kembali ke tahap awal; progres hanya disimpan di memori sesi, tidak di localStorage, database, atau server. |
| F3 | Petunjuk per tahap | Otomatis: `npm test` memeriksa setiap tahap punya `instruction` dan `interactionTarget` valid; manual untuk tampilan | Jika pengguna memilih atau menjalankan suatu tahapan, sistem menampilkan petunjuk tindakan yang harus dilakukan pada tahapan tersebut. Jika tahap aktif berganti, teks petunjuk (instruction) berganti sesuai data SimulationStep tahap baru dan komponen sasaran tindakan (interactionTarget) ditandai di model 3D. |
| F3 | Memilih tahapan (K3) | Otomatis: `npm test` | Jika pengguna memilih tahapan dari daftar, hanya petunjuk tahapan itu yang tampil; tahap aktif dan progres simulasi tidak berubah. |
| F4 | Penjelasan tahapan | Manual untuk tampilan; otomatis untuk keberadaan `description` | Jika pengguna memilih salah satu tahapan, sistem menampilkan penjelasan tujuan dan fungsi tahapan tersebut dengan bahasa yang mudah dipahami. Jika pengguna memilih tahapan dari daftar, hanya penjelasan tahapan itu yang tampil; tahap aktif dan progres simulasi tidak berubah. |
| F5 | Peringatan kesalahan | Manual untuk banner; otomatis untuk logika | Jika pengguna melakukan tindakan yang tidak sesuai dengan urutan simulasi, sistem menampilkan peringatan, menjelaskan kesalahan, dan memberikan arahan untuk memperbaikinya. Jika peringatan tampil, teksnya diambil dari warningMessage dan correction milik tahap aktif, dan tahap aktif tetap sama sampai pengguna melakukan tindakan yang benar. |
| F6 | Kuis dan skor | Otomatis untuk perhitungan skor; manual untuk tampilan | Jika pengguna menyelesaikan simulasi dan membuka kuis, aplikasi menampilkan pertanyaan dari data QuizQuestion satu per satu beserta pilihan jawaban. Jika pengguna menjawab semua pertanyaan, aplikasi menampilkan skor akhir dan, untuk setiap soal, jawaban yang benar beserta penjelasannya (explanation). Jika kuis selesai atau halaman dimuat ulang, skor tidak tersimpan; skor hanya ada di memori sesi. |
| R1 | Deploy dini dan berulang | Manual: buka URL Vercel; otomatis: `curl -sI <URL Vercel>` (ganti dengan URL aktual; verifikasi perintah di mesin lokal) | Status HTTP 200, halaman tampil tanpa galat, dan scene 3D muncul setelah setiap fitur `must` selesai |
| R2 | Pembekuan fitur 16 November 2026 pukul 20.00 WIB | Otomatis: `git log --since="2026-11-16 20:00 +0700" --oneline` | Hanya commit bertipe fix, docs, atau chore setelah waktu itu, dan `npm run build` lulus pada versi terakhir |
| R3 | Model dari geometri bawaan | Otomatis: `git ls-files` lalu cari berkas berekstensi glb, gltf, obj, atau fbx (jalankan di Git Bash atau WSL) | Tidak ada berkas model 3D eksternal di repositori pada versi awal, dan model tetap dapat diputar dan diklik |

## CI Configuration

Berkas `.github/workflows/ci.yml` dipicu oleh pull request dan push ke `main`. Urutan langkah: checkout kode, memasang Node.js (ikuti Node.js LTS aktif; cek `node --version` dan nodejs.org untuk versi terbaru), cache dependensi npm, lalu menjalankan `npm ci`, `npm run lint`, `npm test`, dan `npm run build` berurutan. Pada level Dasar, CI bukan syarat merge, sehingga hasilnya dibaca sebagai peringatan dini; mahasiswa tetap menjalankan gerbang yang sama secara lokal. Versi GitHub Actions harus dicek ulang sebelum dipakai dan, untuk produksi, di-pin ke SHA commit.

## Regression Policy

Setiap bug yang diperbaiki mendapat tes yang gagal sebelum perbaikan dan lulus sesudahnya. Tes yang gagal tidak boleh dinonaktifkan. Jika sebuah tes harus berubah, alasannya dijelaskan di PR dan di `docs/DECISIONS.md`.

## Failure Handling

Saat gerbang gagal: baca log, perbaiki penyebabnya, lalu jalankan ulang. Karena alat AI berupa chat di browser, batasi percobaan perbaikan maksimal 3 kali per masalah; setelah itu berhenti, periksa secara manual atau minta bantuan dosen. Catat masalah dan pelajarannya di `docs/LESSONS.md`.
