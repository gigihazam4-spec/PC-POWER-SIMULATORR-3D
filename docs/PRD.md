# Product Requirements Document: PC Power Simulator 3D

> Simulator 3D interaktif berbasis web untuk mengajarkan pemula menyalakan dan mematikan komputer desktop dengan benar.

## Overview

| Field | Isi |
|---|---|
| Nama produk | PC Power Simulator 3D |
| Platform | web |
| Level proses | dasar |
| Tagline | Belajar menyalakan dan mematikan komputer dengan simulasi 3D interaktif. |
| Tim dan waktu | 1 orang; `duration_weeks` = 1 (nilai minimum yang diterima kit). Tenggat aktual: Senin, 16 November 2026, pukul 23.00 WIB, berupa URL Vercel yang dapat diakses. Pengerjaan mengikuti tenggat aktual, bukan satu minggu penuh. |

## Problem

Pelajar, mahasiswa, dan masyarakat umum yang masih pemula sering belum memahami tata cara menyalakan dan mematikan komputer desktop dengan benar. Saat ini mereka belajar dari tutorial YouTube, artikel atau modul panduan, bertanya kepada teman atau orang yang lebih berpengalaman, atau mencoba sendiri tanpa panduan yang terstruktur. Akibatnya urutan langkah dan alasan di baliknya tidak benar-benar dipahami. Jika dibiarkan, pengguna bisa mematikan komputer secara paksa tanpa shutdown yang benar sehingga berisiko kehilangan data yang belum disimpan atau mengalami gangguan sistem, dan pengguna pemula tetap bingung serta kurang percaya diri.

## Goals and Non-Goals

### Goals

1. Menghasilkan media pembelajaran berbasis website dengan visualisasi komputer desktop 3D yang interaktif menggunakan Three.js. Teramati dari: URL Vercel dapat dibuka di browser, dan model 3D dapat diputar, diperbesar, diperkecil, serta diklik (F1).
2. Membantu pengguna pemula memahami dan mempelajari urutan menyalakan serta mematikan komputer desktop dengan benar melalui simulasi langkah demi langkah. Teramati dari: pengguna dapat menyelesaikan simulasi dari pemeriksaan perangkat sampai shutdown yang benar (F2) dengan petunjuk di setiap langkah (F3).

### Non-Goals

- Tidak menyediakan login atau registrasi akun. Login atau registrasi tidak diperlukan karena aplikasi tidak menyimpan data pengguna; pengunjung langsung memakai simulator.
- Tidak menggunakan database pengguna atau sistem CRUD. Aplikasi tidak punya backend, sehingga tidak ada data pengguna yang perlu dikelola; data simulasi cukup berupa berkas di dalam proyek.
- Tidak menyediakan pembayaran atau transaksi. Tidak ada fitur berbayar; proyek ini murni media belajar.
- Tidak mengendalikan komputer fisik sungguhan. Aplikasi adalah simulasi visual di browser dan sengaja tidak menyentuh perangkat komputer sungguhan.
- Tidak menjalankan simulasi sistem operasi Windows secara penuh; hanya visualisasi proses booting dan tampilan sistem operasi secara sederhana. Simulasi sistem operasi penuh terlalu besar untuk tenggat; cukup visualisasi booting dan tampilan sistem operasi sederhana yang mendukung tahapan belajar.
- Tidak menyediakan diagnosis kerusakan hardware atau simulasi perbaikan komputer tingkat lanjut. Diagnosis dan perbaikan perangkat keras tingkat lanjut berada di luar tujuan belajar pemula dan di luar waktu yang tersedia.
- Tidak membuat aplikasi Android atau iOS terpisah. Proyek difokuskan pada satu platform, yaitu web, sehingga tidak ada aplikasi Android atau iOS terpisah.

## Target Users

| Persona | Kebutuhan | Kutipan |
|---|---|---|
| Pengguna pemula: pelajar/mahasiswa dan masyarakat umum (persona rumusan mahasiswa, bukan hasil wawancara dengan orang sungguhan) | Memahami urutan langkah dan alasan di balik prosedur menyalakan dan mematikan komputer dengan benar. | "Saya masih sering bingung ketika harus menyalakan dan mematikan komputer dengan benar. Selama ini saya hanya mengikuti apa yang diajarkan teman atau melihat tutorial, tetapi belum memahami urutan langkah dan alasan di balik setiap prosedur." |
| Kondisi pengguna | Perangkat murah atau spesifikasi rendah; Antarmuka Bahasa Indonesia; Responsif pada desktop, tablet, dan smartphone | Dari jawaban wawancara C-09 dan W-08. |

Kutipan di atas dirumuskan oleh mahasiswa sebagai gambaran persona, bukan hasil wawancara dengan orang sungguhan.

## Core Features

Butir pertama pada setiap fitur F1 sampai F5 adalah kriteria dari mahasiswa. Butir lainnya, serta seluruh kriteria F6, adalah usulan asisten yang sudah disetujui mahasiswa (lihat bagian Assistant Proposals di `docs/DECISIONS.md`). Label K1 sampai K4 berasal dari pemeriksaan konflik antarkriteria saat menyusun SPEC: K1 menambahkan F6; K2 berarti tindakan yang bukan `expectedAction` tidak memajukan tahap; K3 berarti memilih tahapan dari daftar hanya menampilkan informasi; K4 berarti progres dan skor hanya disimpan di memori sesi. Aturan K2 sampai K4 menjaga perilaku simulasi tetap terdefinisi walaupun F4 dan F5 belum selesai.

### F1 - Model 3D komputer desktop interaktif (must)

Model komputer desktop ditampilkan dalam 3D dengan Three.js; pengguna dapat memutar, memperbesar, memperkecil, dan mengeklik komponennya. Versi awal dibangun dari geometri bawaan Three.js (R3).

Acceptance Criteria:

- Jika pengguna memutar, memperbesar, memperkecil, atau mengeklik komponen komputer, model 3D merespons interaksi tersebut.
- Jika pengguna mengeklik sebuah komponen (mis. tombol power atau monitor), komponen itu tersorot dan nama serta fungsinya dari data PCComponent tampil di panel info.
- Jika halaman dibuka pada lebar layar 1280, 768, dan 375 px, canvas 3D dan kontrol utama tetap terlihat dan dapat dipakai tanpa gulir horizontal.
- Jika model diputar terus-menerus selama 10 detik pada perangkat uji berspesifikasi rendah, tampilan mencapai sasaran 30 FPS atau lebih; angka ini sasaran pengujian, bukan jaminan di semua perangkat.
- Jika npm run build dijalankan, ukuran bundel produksi terkompresi gzip tidak melebihi 5 MB dan ukuran aktualnya dicatat di docs/PROGRESS.md.

### F2 - Simulasi langkah demi langkah (must)

Simulasi memandu pengguna melalui lima fase berurutan: pemeriksaan perangkat, menyalakan komputer, proses booting, masuk ke sistem operasi (tampilan sederhana, bukan sistem operasi sungguhan), dan prosedur shutdown yang benar.

Acceptance Criteria:

- Jika pengguna menekan tombol mulai dan melanjutkan tahapan simulasi, sistem menampilkan urutan pemeriksaan perangkat, menyalakan komputer, proses booting, masuk ke sistem operasi, hingga prosedur shutdown yang benar.
- Jika pengguna melakukan tindakan yang bukan expectedAction pada tahap aktif, simulasi tidak maju dan tetap berada di tahap yang sama.
- Jika pengguna menyelesaikan tahap shutdown terakhir, simulasi menampilkan penanda selesai dan tombol untuk mengulang dari awal.
- Jika halaman dimuat ulang, simulasi kembali ke tahap awal; progres hanya disimpan di memori sesi, tidak di localStorage, database, atau server.

### F3 - Petunjuk interaktif di setiap langkah (must)

Setiap tahap simulasi menampilkan petunjuk tindakan yang harus dilakukan pengguna.

Acceptance Criteria:

- Jika pengguna memilih atau menjalankan suatu tahapan, sistem menampilkan petunjuk tindakan yang harus dilakukan pada tahapan tersebut.
- Jika tahap aktif berganti, teks petunjuk (instruction) berganti sesuai data SimulationStep tahap baru dan komponen sasaran tindakan (interactionTarget) ditandai di model 3D.
- Jika pengguna memilih tahapan dari daftar, hanya petunjuk tahapan itu yang tampil; tahap aktif dan progres simulasi tidak berubah.

### F4 - Penjelasan fungsi setiap tahapan (should)

Setiap tahapan dilengkapi penjelasan tujuan dan fungsinya dalam bahasa yang mudah dipahami pemula.

Acceptance Criteria:

- Jika pengguna memilih salah satu tahapan, sistem menampilkan penjelasan tujuan dan fungsi tahapan tersebut dengan bahasa yang mudah dipahami.
- Jika pengguna memilih tahapan dari daftar, hanya penjelasan tahapan itu yang tampil; tahap aktif dan progres simulasi tidak berubah.

### F5 - Pemberitahuan kesalahan prosedur (should)

Aplikasi memberi peringatan, penjelasan, dan arahan perbaikan ketika pengguna melakukan tindakan di luar urutan prosedur.

Acceptance Criteria:

- Jika pengguna melakukan tindakan yang tidak sesuai dengan urutan simulasi, sistem menampilkan peringatan, menjelaskan kesalahan, dan memberikan arahan untuk memperbaikinya.
- Jika peringatan tampil, teksnya diambil dari warningMessage dan correction milik tahap aktif, dan tahap aktif tetap sama sampai pengguna melakukan tindakan yang benar.

### F6 - Kuis singkat (could)

Setelah menyelesaikan simulasi, pengguna dapat menjawab kuis singkat tentang prosedur menyalakan dan mematikan komputer.

Acceptance Criteria:

- Jika pengguna menyelesaikan simulasi dan membuka kuis, aplikasi menampilkan pertanyaan dari data QuizQuestion satu per satu beserta pilihan jawaban.
- Jika pengguna menjawab semua pertanyaan, aplikasi menampilkan skor akhir dan, untuk setiap soal, jawaban yang benar beserta penjelasannya (explanation).
- Jika kuis selesai atau halaman dimuat ulang, skor tidak tersimpan; skor hanya ada di memori sesi.

## User Flows

**Alur A: menyelesaikan simulasi tanpa kesalahan (F1, F2, F3, F4)**

1. Pengunjung membuka URL aplikasi; model komputer desktop 3D tampil dan dapat diputar serta diperbesar (F1).
2. Pengunjung menekan tombol mulai; tahap pertama, pemeriksaan perangkat, menjadi aktif dan petunjuk tindakannya tampil (F2, F3).
3. Pengunjung melakukan tindakan yang diminta pada model, misalnya mengeklik kabel atau tombol yang ditandai; tahap maju bila tindakan sesuai `expectedAction` (F2).
4. Simulasi berlanjut melalui menyalakan komputer, proses booting, dan masuk ke tampilan sistem operasi sederhana; di tiap tahap pengunjung dapat membuka penjelasan fungsi tahapan itu (F4).
5. Pengunjung menjalankan prosedur shutdown yang benar; simulasi menampilkan penanda selesai dan tombol untuk mengulang (F2).
6. Keadaan galat utama: bila halaman dimuat ulang, simulasi kembali ke tahap awal karena progres hanya ada di memori sesi (K4).

**Alur B: melakukan kesalahan prosedur (F2, F3, F5)**

1. Pada tahap aktif, pengunjung mengeklik komponen atau tombol yang bukan `expectedAction`.
2. Simulasi tidak maju dan tetap di tahap yang sama (K2, F2).
3. Bila F5 sudah dibuat, peringatan tampil dengan penjelasan kesalahan dan arahan perbaikan dari `warningMessage` dan `correction` tahap aktif; petunjuk tahap tetap terlihat (F3, F5).
4. Pengunjung mengulang dengan tindakan yang benar, dan simulasi maju.
5. Keadaan galat utama: bila F5 belum dibuat, tindakan salah tidak menghasilkan apa pun selain tahap tetap sama.

**Alur C: menjelajah komponen dan membaca penjelasan tanpa mengubah progres (F1, F3, F4)**

1. Pengunjung mengeklik komponen pada model; komponen tersorot dan nama serta fungsinya tampil (F1).
2. Pengunjung memilih tahapan dari daftar; hanya petunjuk atau penjelasan tahapan itu yang tampil (F3, F4).
3. Tahap aktif dan progres simulasi tidak berubah (K3).

**Alur D: mengerjakan kuis setelah simulasi, bila F6 dibuat (F6)**

1. Setelah penanda selesai, pengunjung membuka kuis; pertanyaan tampil satu per satu.
2. Setelah semua pertanyaan dijawab, skor akhir serta jawaban benar dan penjelasannya tampil.
3. Keadaan galat utama: skor tidak disimpan; memuat ulang halaman menghapusnya.

## AI Features

Tidak ada fitur AI di dalam aplikasi; AI hanya dipakai mahasiswa sebagai alat bantu perencanaan dan pengembangan.

## Non-Functional Requirements

| Kategori | Persyaratan |
|---|---|
| Performa | Sasaran 30 FPS atau lebih saat model diputar 10 detik pada perangkat uji berspesifikasi rendah; ini sasaran pengujian, bukan jaminan di semua perangkat. Ukuran bundel produksi terkompresi gzip tidak melebihi 5 MB dan ukuran aktual dilaporkan setelah `npm run build`. Kedua angka adalah Assistant Proposals yang disetujui mahasiswa. |
| Aksesibilitas | Mengacu WCAG 2.2 AA: kontras teks 4,5:1, elemen UI 3:1, fokus keyboard terlihat, tidak bergantung pada warna saja. Rincian di `docs/DESIGN_SYSTEM.md`. |
| Kondisi pengguna | Perangkat murah atau spesifikasi rendah, antarmuka Bahasa Indonesia, dan tampilan responsif pada desktop, tablet, dan smartphone. |
| Responsivitas | Diuji pada lebar 1280, 768, dan 375 px tanpa gulir horizontal (Assistant Proposal yang disetujui mahasiswa). |
| Bahasa antarmuka | Seluruh antarmuka, petunjuk, penjelasan, peringatan, dan kuis dalam Bahasa Indonesia. |
| Privasi data | Data pribadi: tidak ada. Tidak ada login, database, `localStorage`, maupun penyimpanan server; progres dan skor hanya di memori sesi (K4). |
| Ketersediaan | Situs statis yang dilayani Vercel; tidak ada server sendiri yang dipelihara. Batas paket gratis: cek paket terbaru di vercel.com. |

## Success Metrics

| Metrik | Target | Cara Ukur |
|---|---|---|
| Interaksi model 3D | Semua butir uji F1 lulus (usulan) | Menguji apakah model komputer dapat diputar, diperbesar, diperkecil, dan merespons klik pengguna. |
| Keberhasilan simulasi | Simulasi dapat diselesaikan dari pemeriksaan perangkat sampai shutdown yang benar tanpa galat (usulan) | Menguji apakah pengguna dapat menyelesaikan tahapan menyalakan dan mematikan komputer sesuai urutan yang benar. |
| Pemahaman pengguna | Kuis dapat diselesaikan dan skor akhir tampil; hanya diukur bila F6 dibuat (usulan) | Memberikan kuis singkat mengenai prosedur menyalakan dan mematikan komputer setelah pengguna menyelesaikan simulasi. |
| Respons kesalahan | Setiap tindakan di luar urutan memunculkan peringatan; hanya diukur bila F5 selesai (usulan) | Menguji apakah sistem menampilkan pemberitahuan ketika pengguna melakukan tindakan yang tidak sesuai dengan urutan simulasi. |

Target pada tabel ini adalah usulan asisten yang disetujui mahasiswa dan tidak memuat angka baru.

## Risks and Open Questions

### Risiko menurut mahasiswa

> Risiko terbesar proyek ini adalah keterbatasan waktu pengerjaan karena tenggat pengumpulan sangat dekat. Saya khawatir website belum selesai, fitur simulasi 3D belum berjalan dengan baik, atau deployment ke Vercel mengalami kendala sehingga URL tidak bisa diakses saat dikumpulkan.

### Kendali risiko yang disetujui mahasiswa

- R1: Deploy ke Vercel sejak kerangka Vite dan scene Three.js minimal berjalan; setelah setiap fitur must selesai, deploy ulang dan buka URL yang sama → halaman tampil tanpa galat dan scene 3D muncul.
  Fitur terdampak: F1, F2, F3 (setup dan deployment awal).
- R2: Pembekuan fitur pada Senin, 16 November 2026 pukul 20.00 WIB → setelah itu hanya perbaikan bug, pengujian build, dan pemeriksaan URL Vercel; versi yang dikumpulkan adalah versi terakhir yang lulus npm run build dan terbuka normal di URL Vercel.
  Fitur terdampak: semua fitur (F1 sampai F6) karena pembekuan fitur berlaku global.
- R3: Model komputer awal dibuat dari geometri bawaan Three.js tanpa berkas model eksternal → pengguna tetap dapat memutar, memperbesar, dan mengeklik komponen (F1); detail tambahan dikerjakan setelah F1 sampai F3 berjalan di URL Vercel.
  Fitur terdampak: F1 (model 3D awal dari geometri bawaan Three.js).

### Risiko lain dan mitigasi

- Tenggat sangat dekat sehingga fitur should (F4, F5) dan kuis (F6) mungkin tidak selesai. Mitigasi: F4 dan F5 sudah ditandai `should` dan F6 `could`, sehingga F1 sampai F3 (`must`) dikerjakan lebih dulu; R2 membekukan fitur Senin 16 November 2026 pukul 20.00 WIB.
- Kinerja rendering 3D buruk pada perangkat berspesifikasi rendah. Mitigasi: R3 (geometri bawaan Three.js tanpa berkas model eksternal), sasaran 30 FPS dan batas 5 MB gzip diukur sejak versi awal, bukan di akhir.
- Deployment ke Vercel bermasalah sehingga URL tidak dapat diakses saat dikumpulkan. Mitigasi: R1, yaitu deploy ke Vercel sejak kerangka berjalan dan setelah setiap fitur `must`, lalu membuka URL yang sama untuk memeriksa hasilnya.
- Perintah npm test gagal di lingkungan bersih bila berkas pengujian belum dibuat. Mitigasi: T-001 membuat satu berkas tes contoh di folder `tests/` sehingga `npm test` lulus sejak awal dan di lingkungan bersih.

### Pertanyaan terbuka

- Urutan dan isi tindakan pada tiap `SimulationStep` (misalnya urutan menyalakan monitor dan casing) perlu diverifikasi mahasiswa dengan sumber tepercaya seperti modul praktikum atau panduan resmi sebelum data simulasi ditulis.
- Tampilan "sistem operasi sederhana" mengacu ke gaya Windows seperti disebut pada batasan proyek; mahasiswa perlu mengonfirmasi apakah gaya itu dipakai atau tampilan netral.
- Perangkat uji berspesifikasi rendah untuk sasaran 30 FPS belum ditentukan.
- Cara mengukur ukuran bundel gzip (jumlah semua berkas di `dist/`) perlu diverifikasi dengan perintah nyata saat T-001 selesai.
- Perilaku bila browser tidak mendukung WebGL belum diputuskan.
- Aksi pada objek 3D belum punya alternatif keyboard; perlu diputuskan apakah ditambahkan setelah F1 sampai F3 stabil.
- Versi Node.js, Three.js, Vite, dan ESLint belum dicatat; semuanya ditulis latest stable dan diverifikasi di T-001 (lihat `docs/DECISIONS.md`, Open Questions).
