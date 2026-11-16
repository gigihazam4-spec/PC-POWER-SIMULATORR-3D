# Decisions: PC Power Simulator 3D

Catatan keputusan arsitektur (Architecture Decision Records). Keputusan **tidak dibatalkan diam-diam**: untuk mengubahnya, tambahkan ADR baru yang berstatus `Supersedes ADR-nnn` dan jelaskan alasannya.

## How to Use

- Buat ADR baru bila ada pilihan teknologi, perubahan struktur data, kompromi keamanan, atau penambahan dependensi besar.
- Format ADR: Status, Tanggal, Konteks, Keputusan, Konsekuensi, dan Alternatif yang dipertimbangkan.
- Alat AI wajib membaca ADR sebelum mengusulkan perubahan arsitektur dan tidak boleh mengubahnya tanpa ADR baru yang disetujui mahasiswa.

## Decision Records

Semua ADR di bawah memakai tanggal 2026-11-15 kecuali dibuat kemudian.

### ADR-001: Platform web

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih platform Web pada C-02: "Aplikasi akan berjalan melalui browser dan menggunakan Three.js untuk simulasi 3D interaktif." Tidak ada platform pendukung. Aplikasi adalah media belajar berbasis website dan bukan alat untuk mengendalikan komputer sungguhan.
- **Keputusan:** Platform utama adalah web, berupa situs statis sisi-klien tanpa platform pendukung.
- **Konsekuensi:** Pengguna cukup membuka URL tanpa instalasi dan URL itu yang dikumpulkan. Aplikasi bergantung pada dukungan WebGL di browser dan tidak memakai fitur perangkat (kamera, lokasi, notifikasi). Tidak ada aplikasi Android atau iOS terpisah (batasan proyek).
- **Alternatif yang dipertimbangkan:** Mobile, desktop, dan IoT tidak dipilih karena tidak sesuai dengan tujuan media pembelajaran berbasis website.

### ADR-002: Frontend dan UI

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Stack dipilih mahasiswa (campuran; semua lapisan pilihan mahasiswa). Alasan mahasiswa, dikutip persis: "Saya memilih Three.js sebagai teknologi utama karena proyek ini berfokus pada penerapan pemodelan dan simulasi 3D interaktif berbasis website. Untuk teknologi pendukung, saya mengutamakan stack yang sederhana, mudah dipelajari, ringan, dan realistis untuk diselesaikan dalam waktu pengerjaan yang tersedia." Frontend memakai HTML5, CSS3, dan JavaScript tanpa framework UI, dengan Three.js untuk rendering 3D dan Vite sebagai build tool.
- **Keputusan:** Frontend: HTML5, CSS3, dan JavaScript. Library 3D: Three.js. Build tool: Vite. Linter: ESLint (usulan asisten yang disetujui). Versi ditulis latest stable dengan perintah verifikasi: `npm view three version`, `npm view vite version`, `npm view eslint version`.
- **Konsekuensi:** Pendekatan sederhana dan ringan, sesuai kebutuhan perangkat spesifikasi rendah. Tanpa framework UI, struktur kode dijaga lewat pemisahan folder `data`, `logic`, `scene`, dan `ui` (ADR-008). Tidak ada risiko khusus yang disampaikan saat wawancara. Three.js dan Vite tidak ada di rekomendasi kit sehingga struktur folder mengikuti hasil perintah scaffold resmi Vite dan dipastikan di T-001.
- **Alternatif yang dipertimbangkan:** Rekomendasi kit untuk web (Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui) disebut hanya sebagai pembanding dan tidak disarankan sebagai pengganti; pilihan mahasiswa dipertahankan.

### ADR-003: Backend dan data

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih tanpa backend dan tanpa database. Seluruh data simulasi disimpan di berkas JavaScript atau JSON di dalam proyek, dan tidak ada data pribadi.
- **Keputusan:** Tidak ada backend dan tidak ada database. Entitas data: `SimulationProcedure`, `SimulationStep`, `PCComponent`, dan `QuizQuestion` (rincian di `docs/ARCHITECTURE.md`, bagian Data Model). Progres dan skor hanya di memori sesi.
- **Konsekuensi:** Tidak ada server yang dipelihara dan tidak ada data pengguna yang dikelola. Progres dan skor tidak dapat disimpan antarsesi, dan perubahan konten membutuhkan deploy ulang.
- **Alternatif yang dipertimbangkan:** Backend dengan database (mis. layanan basis data terkelola) tidak dipilih karena tidak ada kebutuhan menyimpan data.

### ADR-004: Autentikasi dan keamanan

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih satu peran saja (pengunjung), tanpa login, registrasi, atau data pribadi (C-06, C-07).
- **Keputusan:** Tidak ada autentikasi (`stack.auth` dan `security.auth_method` = tidak ada). Peran: pengunjung. Data pribadi: tidak ada. Keamanan difokuskan pada integritas konten, rantai pasok dependensi, dan akun GitHub serta Vercel (lihat `docs/SECURITY.md`).
- **Konsekuensi:** Tidak ada kontrol akses untuk dikelola dan permukaan serangan kecil. Bila kelak ada fitur yang membutuhkan akun atau data pribadi, diperlukan ADR baru dan otorisasi di sisi server.
- **Alternatif yang dipertimbangkan:** Layanan autentikasi (Supabase Auth, Auth.js, dan sejenisnya) tidak dipilih karena aplikasi tidak memerlukan akun.

### ADR-005: Hosting dan deployment

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih Vercel untuk deployment dan menyebut URL hasil deploy sebagai yang dikumpulkan pada Senin, 16 November 2026 pukul 23.00 WIB. Deploy dilakukan dari GitHub (W-06).
- **Keputusan:** Hosting di Vercel dengan Build Command `npm run build` dan Output Directory `dist` (dipastikan di dasbor Vercel). Deploy pertama dilakukan sejak kerangka berjalan (T-004) dan diulang setiap fitur `must` selesai (R1).
- **Konsekuensi:** URL produksi tersedia sejak awal. Batas paket gratis Vercel mengikuti paket terbaru dan perlu dicek. Rollback dilakukan lewat dasbor atau revert commit.
- **Alternatif yang dipertimbangkan:** Host statis lain dapat dipakai sebagai cadangan dengan mengunggah isi `dist/`; tidak dipilih sebagai utama.

### ADR-006: Strategi pengujian dan level proses

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih level Dasar pada C-10 dengan alasan proyek dikerjakan secara individual dengan alur kerja sederhana dan terarah, serta tetap memakai pengujian otomatis dan manual tanpa CI sebagai syarat merge. Setelah penjelasan, mahasiswa menyetujui review manusia di setiap task, berkas `ci.yml`, dan `docs/REVIEW.md`. Pengujian pada W-09: gabungan `node --test` untuk logika dan uji manual di browser. Alat AI adalah chat di browser (C-11); tim 1 orang (C-13).
- **Keputusan:** Level Dasar; pengujian otomatis `node --test` (perintah `npm test`) untuk logika tahapan, urutan, dan data kuis; pengujian manual di browser untuk 3D, tombol, peringatan, dan responsivitas. CI bukan syarat merge.
- **Konsekuensi:** Logika penting dapat diuji cepat tanpa browser; tampilan 3D hanya diuji manual sehingga ada celah cakupan otomatis. Kode logika harus dipisah dari Three.js dan DOM (ADR-008).
- **Alternatif yang dipertimbangkan:** Rekomendasi kit (Vitest atau Jest ditambah Playwright) tidak dipilih; level Menengah dan Loop tidak dipilih.

### ADR-007: Prioritas pengerjaan dan kendali risiko

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Tenggat aktual adalah Senin, 16 November 2026 pukul 23.00 WIB berupa URL Vercel yang berfungsi, sedangkan `duration_weeks` memakai nilai minimum 1. Risiko terbesar menurut mahasiswa adalah keterbatasan waktu, simulasi 3D yang belum berjalan baik, dan deployment Vercel yang bermasalah.
- **Keputusan:** Urutan kerja: setup, deploy dini, lalu F1 sampai F3; F4, F5, dan F6 menyusul bila waktu memungkinkan. Tiga kendali risiko yang disetujui: R1 (deploy dini dan berulang), R2 (pembekuan fitur Senin 16 November 2026 pukul 20.00 WIB), R3 (model awal dari geometri bawaan Three.js).
- **Konsekuensi:** Selalu ada URL yang dapat dikumpulkan; fitur `should` dan `could` dapat tertunda atau tidak selesai.
- **Alternatif yang dipertimbangkan:** Mengerjakan semua fitur secara paralel tanpa deploy dini tidak dipilih karena meningkatkan risiko URL tidak berfungsi.

### ADR-008: Pemisahan logika dan aturan perilaku simulasi

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa menyetujui pemisahan logika simulasi, validasi urutan langkah, dan data kuis dari kode Three.js dan DOM agar dapat diuji otomatis (C-17), serta aturan K2, K3, dan K4 pada pemeriksaan konflik kriteria.
- **Keputusan:** Folder `src/logic/` berisi fungsi murni tanpa DOM dan Three.js. K2: tindakan yang bukan `expectedAction` tidak memajukan tahap. K3: memilih tahapan hanya menampilkan petunjuk dan penjelasan. K4: progres dan skor hanya di memori sesi tanpa `localStorage`, database, atau server.
- **Konsekuensi:** Logika dapat diuji dengan `node --test`. Perilaku simulasi tetap terdefinisi walaupun F5 belum selesai.
- **Alternatif yang dipertimbangkan:** Menyimpan progres di `localStorage` ditolak oleh mahasiswa pada K4.

## Student Decisions

Keputusan di bawah berasal dari mahasiswa. Angka 30 FPS, batas 5 MB gzip, dan lebar uji 1280, 768, dan 375 px bukan keputusan awal mahasiswa; ketiganya adalah Assistant Proposals yang disetujui (lihat bagian berikutnya).

| Keputusan | Sumber | Catatan |
|---|---|---|
| Ide, masalah, dan pengguna: pelajar, mahasiswa, masyarakat umum pemula | C-01, C-03 | Persona dan kutipan dirumuskan mahasiswa sendiri, bukan hasil wawancara |
| Nama aplikasi PC Power Simulator 3D, platform Web, mulai dari nol | C-19, C-02, C-18 | Tanpa platform pendukung |
| Fitur F1 sampai F5 dengan kriteria butir pertama, prioritas F1 sampai F3 must dan F4, F5 should | C-04, C-05 | Alasan prioritas dari mahasiswa |
| F6 Kuis singkat (could) | K1 (pilihan A) | Tambahan atas keputusan mahasiswa |
| Tujuan, empat nama metrik beserta cara ukur, dan tujuh batasan | C-20 | Target metrik adalah usulan asisten |
| Tanpa data pribadi, satu peran, tanpa AI, kondisi perangkat murah dan antarmuka Bahasa Indonesia | C-06 sampai C-09 | |
| Stack campuran dan alasannya (JavaScript, Three.js, HTML5, CSS3, Vite, Vercel, tanpa backend, database, dan auth) | C-16, W-01 sampai W-06 | Alasan dikutip di ADR-002 |
| Empat entitas data, nada visual, warna biru, mode gelap saja | W-03, W-05 | |
| Tanpa layanan tambahan dan tanpa kebutuhan web khusus | W-07, W-08 | |
| Pengujian gabungan `node --test` dan manual | W-09 | |
| Persetujuan kata kunci dan perintah proyek, ESLint, lockfile di T-001 | W-10, C-17 | Usulan asisten yang disetujui |
| Level Dasar, alat chat di browser, 1 orang, 1 minggu | C-10, C-11, C-13 | |
| Tenggat Senin 16 November 2026 pukul 23.00 WIB berupa URL Vercel | Klarifikasi tenggat | Prioritas deploy dini dan F1 sampai F3 |
| Risiko terbesar dan alasan proyek | C-14, C-15 | Dikutip persis di SPEC dan PRD |
| Persetujuan K2, K3, dan K4 | Pemeriksaan konflik Fase 2 | Aturan perilaku simulasi dan penyimpanan |
| Persetujuan R1, R2, dan R3 | C-14b | Rumusan awal dari asisten |

## Delegated Choices

Semua pilihan dibuat langsung oleh mahasiswa.

## Assistant Proposals

Nilai berikut diusulkan asisten dan telah disetujui mahasiswa pada 2026-11-15. Koreksi administratif mahasiswa: angka 30 FPS, batas 5 MB gzip, dan lebar uji 1280, 768, dan 375 px berada di kategori ini, bukan keputusan awal mahasiswa.

| Bidang SPEC | Nilai yang diusulkan asisten | Alasan singkat | Disetujui mahasiswa |
|---|---|---|---|
| `meta.one_liner` | Simulator 3D interaktif berbasis web untuk mengajarkan pemula menyalakan dan mematikan komputer desktop dengan benar. | Rangkuman satu kalimat dari ide yang kamu konfirmasi di Fase 0. | ya (2026-11-15) |
| `metrics[0].target` | Semua butir uji F1 lulus (usulan) | Kamu menyebut nama dan cara ukur tanpa angka target; target diusulkan tanpa angka baru. | ya (2026-11-15) |
| `metrics[1].target` | Simulasi dapat diselesaikan dari pemeriksaan perangkat sampai shutdown yang benar tanpa galat (usulan) | Sama: target diusulkan tanpa angka baru. | ya (2026-11-15) |
| `metrics[2].target` | Kuis dapat diselesaikan dan skor akhir tampil; hanya diukur bila F6 dibuat (usulan) | Sama; metrik ini hanya diukur bila F6 dibuat (hasil K1). | ya (2026-11-15) |
| `metrics[3].target` | Setiap tindakan di luar urutan memunculkan peringatan; hanya diukur bila F5 selesai (usulan) | Sama; metrik ini hanya diukur bila F5 selesai (hasil K2). | ya (2026-11-15) |
| `features[0].acceptance[1]` | Jika pengguna mengeklik sebuah komponen (mis. tombol power atau monitor), komponen itu tersorot dan nama serta fungsinya dari data PCComponent tampil di panel info. | Melengkapi F1 menjadi minimal dua butir yang dapat diuji; menghubungkan klik komponen dengan data PCComponent. | ya (2026-11-15) |
| `features[0].acceptance[2]` | Jika halaman dibuka pada lebar layar 1280, 768, dan 375 px, canvas 3D dan kontrol utama tetap terlihat dan dapat dipakai tanpa gulir horizontal. | Menguji persyaratan responsif desktop, tablet, dan smartphone; lebar 1280, 768, dan 375 px adalah angka usulan. | ya (2026-11-15) |
| `features[0].acceptance[3]` | Jika model diputar terus-menerus selama 10 detik pada perangkat uji berspesifikasi rendah, tampilan mencapai sasaran 30 FPS atau lebih; angka ini sasaran pengujian, bukan jaminan di semua perangkat. | Menguji persyaratan perangkat spesifikasi rendah; sasaran 30 FPS adalah angka usulan, disetujui sebagai sasaran pengujian dan bukan jaminan di semua perangkat. | ya (2026-11-15) |
| `features[0].acceptance[4]` | Jika npm run build dijalankan, ukuran bundel produksi terkompresi gzip tidak melebihi 5 MB dan ukuran aktualnya dicatat di docs/PROGRESS.md. | Batas 5 MB adalah angka usulan; disetujui dengan pengukuran gzip dan kewajiban melaporkan ukuran aktual setelah build. | ya (2026-11-15) |
| `features[1].acceptance[1]` | Jika pengguna melakukan tindakan yang bukan expectedAction pada tahap aktif, simulasi tidak maju dan tetap berada di tahap yang sama. | Aturan K2: tindakan yang bukan expectedAction tidak memajukan tahap, agar F2 tetap terdefinisi bila F5 belum dibuat. | ya (2026-11-15) |
| `features[1].acceptance[2]` | Jika pengguna menyelesaikan tahap shutdown terakhir, simulasi menampilkan penanda selesai dan tombol untuk mengulang dari awal. | Membuat akhir simulasi dapat diamati dan dapat diulang. | ya (2026-11-15) |
| `features[1].acceptance[3]` | Jika halaman dimuat ulang, simulasi kembali ke tahap awal; progres hanya disimpan di memori sesi, tidak di localStorage, database, atau server. | Aturan K4: progres hanya di memori sesi, sejalan dengan tanpa database dan tanpa data pribadi. | ya (2026-11-15) |
| `features[2].acceptance[1]` | Jika tahap aktif berganti, teks petunjuk (instruction) berganti sesuai data SimulationStep tahap baru dan komponen sasaran tindakan (interactionTarget) ditandai di model 3D. | Menghubungkan petunjuk dengan data SimulationStep dan penandaan interactionTarget. | ya (2026-11-15) |
| `features[2].acceptance[2]` | Jika pengguna memilih tahapan dari daftar, hanya petunjuk tahapan itu yang tampil; tahap aktif dan progres simulasi tidak berubah. | Aturan K3: memilih tahapan hanya menampilkan informasi dan tidak melompati urutan. | ya (2026-11-15) |
| `features[3].acceptance[1]` | Jika pengguna memilih tahapan dari daftar, hanya penjelasan tahapan itu yang tampil; tahap aktif dan progres simulasi tidak berubah. | Aturan K3 untuk F4. | ya (2026-11-15) |
| `features[4].acceptance[1]` | Jika peringatan tampil, teksnya diambil dari warningMessage dan correction milik tahap aktif, dan tahap aktif tetap sama sampai pengguna melakukan tindakan yang benar. | Menghubungkan peringatan dengan warningMessage dan correction serta menjaga aturan K2. | ya (2026-11-15) |
| `features[5].description` | Setelah menyelesaikan simulasi, pengguna dapat menjawab kuis singkat tentang prosedur menyalakan dan mematikan komputer. | F6 ditambahkan atas keputusanmu pada K1; rumusan deskripsinya dari asisten. | ya (2026-11-15) |
| `features[5].acceptance[0]` | Jika pengguna menyelesaikan simulasi dan membuka kuis, aplikasi menampilkan pertanyaan dari data QuizQuestion satu per satu beserta pilihan jawaban. | Rumusan kriteria F6 dari asisten berdasarkan entitas QuizQuestion dan metrik pemahaman. | ya (2026-11-15) |
| `features[5].acceptance[1]` | Jika pengguna menjawab semua pertanyaan, aplikasi menampilkan skor akhir dan, untuk setiap soal, jawaban yang benar beserta penjelasannya (explanation). | Rumusan kriteria F6 dari asisten. | ya (2026-11-15) |
| `features[5].acceptance[2]` | Jika kuis selesai atau halaman dimuat ulang, skor tidak tersimpan; skor hanya ada di memori sesi. | Aturan K4 diterapkan ke skor kuis. | ya (2026-11-15) |
| `design.primary_color` | #3B82F6 | Kamu memilih biru sebagai aksen; kode heksadesimal ini dipilih asisten karena kontrasnya 5,09:1 pada latar navy. | ya (2026-11-15) |
| `design.font` | Font sistem, tanpa berkas font eksternal | Kamu belum menyebut font; font sistem ringan untuk perangkat spesifikasi rendah. | ya (2026-11-15) |
| `stack.keywords` | Three.js; JavaScript; Vite; HTML5; CSS3; Vercel | Kata kunci diusulkan dari teknologi yang kamu sebut (W-10). | ya (2026-11-15) |
| `stack.ecosystems` | node | Diusulkan dari stack-mu (C-17): Vite dan npm berjalan di Node.js. | ya (2026-11-15) |
| `stack.commands` | install: `npm ci`; dev: `npm run dev`; lint: `npm run lint`; typecheck: (kosong); test: `npm test`; build: `npm run build`; ci_setup: (kosong) | Diusulkan (C-17); lint memakai ESLint karena kit mewajibkan perintah lint dan kamu belum menyebut alatnya. | ya (2026-11-15) |
| `risks` | Tenggat sangat dekat sehingga fitur should (F4, F5) dan kuis (F6) mungkin tidak selesai.; Kinerja rendering 3D buruk pada perangkat berspesifikasi rendah.; Deployment ke Vercel bermasalah sehingga ... | Daftar risiko teknis dan proyek di luar risiko terbesar yang kamu tulis sendiri. | ya (2026-11-15) |
| `student_reflection.risk_controls` | R1: Deploy ke Vercel sejak kerangka Vite dan scene Three.js minimal berjalan; setelah setiap fitur must selesai, deploy ulang dan buka URL yang sama → halaman tampil tanpa galat dan scene 3D muncul... | Rumusan R1 sampai R3 diusulkan asisten (C-14b) dan kamu setujui. | ya (2026-11-15) |
| `security.secrets_handling` | Tidak ada rahasia karena proyek tanpa backend, API, atau layanan pihak ketiga; bila kelak ada, simpan di .env lokal yang tidak di-commit dan di pengelola rahasia hosting | Kebijakan rahasia standar kit, disesuaikan karena proyek tanpa backend. | ya (2026-11-15) |

Token warna turunan di `docs/DESIGN_SYSTEM.md` selain `#3B82F6`, gaya bahasa antarmuka, penataan folder `src/`, nama cabang dan task contoh, serta susunan task `T-001` sampai `T-017` juga usulan asisten yang disetujui sebagai bagian dari paket dokumen.

Konflik antar kriteria yang diselesaikan saat penyusunan SPEC:

| Konflik | Keputusan mahasiswa |
|---|---|
| K1: kuis ada di metrik dan data tetapi tidak punya fitur | Pilihan A: tambahkan F6 Kuis singkat (could); F1 sampai F5 tidak berubah |
| K2: F2 (must) menuntut urutan, peringatan ada di F5 (should) | Setuju: tindakan yang bukan expectedAction tidak memajukan tahap; peringatan ditambahkan F5 |
| K3: memilih tahapan (F3, F4) dapat melompati urutan F2 | Setuju: memilih tahapan hanya menampilkan petunjuk dan penjelasan tanpa mengubah progres |
| K4: progres dan skor tetapi tanpa database dan data pribadi | Setuju: hanya di memori sesi; tanpa localStorage, database, atau penyimpanan server |

## Open Questions

| Hal yang belum pasti | Cara verifikasi atau keputusan | Pemilik | Kapan |
|---|---|---|---|
| Versi Node.js, Three.js, Vite, dan ESLint | `node --version`, `npm view three version`, `npm view vite version`, `npm view eslint version`; catat di PROGRESS | Mahasiswa | T-001 |
| Pola penemuan berkas tes oleh `node --test` dan konfigurasi ESLint | Dokumentasi resmi Node.js dan ESLint | Mahasiswa | T-001 |
| Batas paket gratis Vercel dan opsi pratinjau deploy | Cek paket terbaru dan dasbor Vercel | Mahasiswa | T-004 |
| Kebenaran urutan dan isi tahapan simulasi | Verifikasi dengan modul praktikum atau sumber resmi | Mahasiswa dan dosen | T-007 |
| Gaya tampilan "sistem operasi sederhana" (gaya Windows atau netral) | Keputusan mahasiswa | Mahasiswa | T-009 |
| Perangkat uji berspesifikasi rendah untuk sasaran 30 FPS | Tentukan perangkat dan alat ukur FPS | Mahasiswa | T-011 |
| Cara mengukur ukuran gzip total `dist/` | Verifikasi perintah di mesin lokal | Mahasiswa | T-011 |
| Perilaku bila WebGL tidak tersedia | Keputusan mahasiswa | Mahasiswa | Sebelum T-005 selesai |
| Alternatif keyboard untuk aksi pada objek 3D | Keputusan mahasiswa setelah F1 sampai F3 stabil | Mahasiswa | Setelah T-011 |
| Header keamanan lewat konfigurasi Vercel | Cek dokumentasi Vercel | Mahasiswa | Opsional setelah T-004 |
| Pengaturan GitHub: secret scanning, 2FA, Dependabot untuk npm | Periksa pengaturan repositori | Mahasiswa | T-001 |
| Acuan teknologi kit terakhir diverifikasi 2026-10-20 | Tanggal ini adalah milik kit, bukan hasil pemeriksaan versi proyek | Dosen | Awal semester |
