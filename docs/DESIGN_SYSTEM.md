# Design System: PC Power Simulator 3D

## Principles

1. **Ramah bagi pemula.** Bahasa sederhana dan satu instruksi dominan per layar. Contoh: panel petunjuk hanya menampilkan tindakan tahap aktif, bukan seluruh prosedur sekaligus.
2. **Modern, minimalis, dan rapi.** Hanya elemen yang membantu belajar yang tampil. Contoh: satu canvas 3D besar, satu panel samping, dan satu baris tombol utama.
3. **Bernuansa teknologi tetapi tidak rumit.** Latar navy gelap dan abu-abu gelap memberi kesan komputer tanpa dekorasi berlebihan. Contoh: aksen biru dipakai hanya untuk tombol utama, tahap aktif, dan komponen yang ditandai.
4. **Ringan untuk perangkat spesifikasi rendah.** Tanpa berkas font eksternal, tanpa gambar besar, animasi UI singkat. Contoh: font sistem dan bayangan sederhana pada kartu.
5. **Umpan balik jelas dan tidak menghakimi.** Status berhasil, peringatan, dan galat memakai warna sekaligus ikon dan teks. Contoh: peringatan salah prosedur menjelaskan apa yang keliru dan apa langkah berikutnya.

## Color Tokens

Tampilan memakai mode gelap saja, sesuai keputusan mahasiswa (tidak ada pengalih tema). Karena itu hanya nilai gelap yang didefinisikan; nilai terang sengaja tidak disediakan. Aksen biru primer `#3B82F6` berasal dari keputusan mahasiswa, sedangkan token turunan lainnya adalah usulan asisten. Rasio kontras di bawah sudah dihitung dengan rumus WCAG 2.2.

| Token | Nilai | Penggunaan |
|---|---|---|
| `--color-bg` | `#0B1220` | Latar halaman (navy gelap) |
| `--color-surface` | `#121B2E` | Kartu dan panel |
| `--color-surface-2` | `#1E293B` | Permukaan terangkat (abu-abu gelap), kolom kode, tombol sekunder |
| `--color-border` | `#334155` | Garis pemisah dekoratif (kontras 1,66:1 pada surface; hanya untuk dekorasi, bukan batas kontrol) |
| `--color-border-strong` | `#64748B` | Batas input dan tombol sekunder (3,61:1 pada surface, 3,93:1 pada bg) |
| `--color-text` | `#E5E7EB` | Teks utama (15,12:1 pada bg, 13,88:1 pada surface, 11,82:1 pada surface-2) |
| `--color-text-muted` | `#94A3B8` | Teks redup dan keterangan (7,30:1 pada bg, 6,70:1 pada surface, 5,71:1 pada surface-2) |
| `--color-primary` | `#3B82F6` | Aksen: tombol utama, tahap aktif, tautan (5,09:1 pada bg, 4,67:1 pada surface) |
| `--color-primary-hover` | `#60A5FA` | Status hover tombol utama (6,76:1 pada surface) |
| `--color-on-primary` | `#0B1220` | Teks di atas tombol primer (5,09:1); jangan memakai putih karena putih di atas `#3B82F6` hanya 3,68:1 |
| `--color-success` | `#22C55E` | Status berhasil (7,54:1 pada surface) |
| `--color-warning` | `#F59E0B` | Peringatan salah prosedur, oranye (8,00:1 pada surface) |
| `--color-danger` | `#F87171` | Galat dan bahaya, merah muda terang (6,21:1 pada surface) |
| `--color-focus` | `#93C5FD` | Cincin fokus keyboard (10,38:1 pada bg) |

Aturan pakai: teks berwarna primer hanya di atas `--color-bg` atau `--color-surface` (kontras di atas 4,5:1); di atas `--color-surface-2` warna primer (3,98:1) hanya untuk elemen UI dan ikon, bukan teks isi. Semua nilai bergantung pada angka di atas; hitung ulang bila token berubah.

## Typography

Font memakai font sistem tanpa berkas font eksternal (usulan asisten yang disetujui mahasiswa): `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Untuk kode atau nama teknis: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`.

| Gaya | Ukuran | Bobot | Tinggi baris | Penggunaan |
|---|---|---|---|---|
| Judul | 28 px | 700 | 1,25 | Judul halaman dan nama aplikasi |
| Subjudul | 20 px | 600 | 1,3 | Judul panel dan nama tahap |
| Isi | 16 px | 400 | 1,6 | Petunjuk, penjelasan, dan teks kuis |
| Keterangan | 14 px | 400 | 1,5 | Label kecil, nomor tahap, catatan |
| Kode | 14 px | 400 | 1,5 | Nama komponen teknis bila perlu |

Ukuran isi minimal 16 px. Gunakan satuan relatif (`rem`) agar mengikuti pengaturan ukuran teks pengguna.

## Spacing and Layout

Skala jarak berbasis 4 px: `--space-1` = 4 px, `--space-2` = 8 px, `--space-3` = 12 px, `--space-4` = 16 px, `--space-5` = 24 px, `--space-6` = 32 px, `--space-7` = 48 px, `--space-8` = 64 px.

Layout web memakai dua area: canvas 3D dan panel informasi (petunjuk, penjelasan, peringatan, daftar tahapan, kontrol).

| Lebar layar | Susunan | Keterangan |
|---|---|---|
| Kurang dari 768 px | Satu kolom: canvas di atas, panel di bawah | Diuji pada 375 px; tinggi canvas sekitar 60% tinggi layar |
| 768 sampai 1279 px | Dua kolom: canvas dan panel 320 px | Diuji pada 768 px |
| 1280 px ke atas | Dua kolom: canvas dan panel 380 px | Diuji pada 1280 px; lebar konten maksimum 1280 px dan terpusat |

Aturan padding: halaman `--space-4` pada layar kecil dan `--space-5` pada layar lebih besar; panel dan kartu `--space-4`; jarak antarelemen dalam panel `--space-3`. Tidak boleh ada gulir horizontal pada ketiga lebar uji. Angka breakpoint dan lebar panel adalah usulan asisten; ubah bila hasil uji menunjukkan perlunya.

## Components

Aplikasi tidak memakai pustaka UI, jadi semua komponen dibuat dengan HTML dan CSS sendiri berdasarkan token di atas.

| Komponen | Dipakai oleh | Varian | Status dan aturan |
|---|---|---|---|
| Tombol | F2 (mulai, lanjut, ulang), F6 | Primer (latar `--color-primary`, teks `--color-on-primary`), sekunder (latar `--color-surface-2`, batas `--color-border-strong`) | Default, hover, fokus (cincin `--color-focus` 2 px), nonaktif, memuat. Target sentuh minimal 44 px tinggi. Satu tombol primer per layar. |
| Canvas 3D | F1 | Satu ukuran responsif | Memuat (indikator teks "Memuat model..."), galat. Menampilkan sorotan pada komponen yang diklik atau yang menjadi sasaran tindakan (F1, F3). |
| Panel petunjuk | F3 | Kartu `--color-surface` | Menampilkan `instruction` tahap aktif; teks bahasa Indonesia ringkas. |
| Panel penjelasan | F4 | Kartu atau bagian yang dapat dibuka | Menampilkan `description` tahap yang dipilih tanpa mengubah tahap aktif (K3). |
| Daftar tahapan | F2, F3, F4 | Daftar bernomor | Item: selesai (ikon centang dan teks), aktif (aksen primer), belum (redup). Memilih item hanya menampilkan informasi. |
| Banner peringatan | F5 | Peringatan (oranye), berhasil (hijau), galat (merah muda) | Selalu berisi ikon, judul singkat, penjelasan, dan arahan perbaikan; tidak bergantung pada warna saja; dapat ditutup. |
| Panel info komponen | F1 | Kartu | Menampilkan `name` dan `function` komponen yang diklik. |
| Indikator progres | F2 | Teks "Tahap 2 dari 12" dan bilah tipis | Teks wajib ada; bilah hanya tambahan. |
| Kartu kuis | F6 | Pilihan jawaban sebagai tombol sekunder | Default, terpilih, benar (hijau dengan ikon), salah (merah muda dengan ikon), nonaktif setelah dijawab. |

## Accessibility

Mengacu WCAG 2.2 AA. Daftar periksa:

- Kontras teks minimal 4,5:1 dan elemen UI minimal 3:1; rasio token sudah tercatat di Color Tokens.
- Fokus keyboard selalu terlihat dengan cincin `--color-focus`; urutan tab mengikuti urutan baca: kontrol utama, daftar tahapan, panel.
- Semua tombol dan daftar tahapan adalah elemen HTML yang dapat difokuskan dan dioperasikan dengan keyboard.
- Label teks tersedia untuk setiap kontrol; canvas memiliki teks alternatif singkat yang menjelaskan fungsinya.
- Target sentuh minimal 24 x 24 CSS px, dan 44 px untuk tombol utama pada layar kecil.
- Informasi tidak hanya lewat warna: status memakai ikon dan teks.
- Hormati `prefers-reduced-motion`: matikan putaran otomatis dan transisi panjang.
- Teks dapat diperbesar sampai 200% tanpa kehilangan konten.
- Perangkat spesifikasi rendah: hindari animasi UI berat dan gambar besar.
- Antarmuka Bahasa Indonesia: atur atribut bahasa halaman ke `id`.
- Pembaca layar: perubahan tahap dan pesan peringatan diumumkan lewat area `aria-live` sopan.
- Batasan yang diketahui: aksi pada objek 3D belum punya alternatif keyboard; keputusan menambahkannya dicatat sebagai pertanyaan terbuka di PRD.

## Motion and Feedback

Animasi UI berdurasi 150 sampai 250 ms dengan easing `ease-out`; animasi model 3D sederhana dan dapat dimatikan. Bila `prefers-reduced-motion` aktif, transisi dimatikan dan sorotan komponen memakai perubahan warna statis.

Keadaan: memuat (teks "Memuat model..." dengan indikator sederhana), kosong (belum ada tahapan dipilih: "Pilih tahapan untuk membaca penjelasannya."), galat, dan sukses ("Tahap selesai. Lanjut ke tahap berikutnya.").

Tiga contoh pesan galat untuk aplikasi ini (teks final ada di data simulasi):

1. "Belum waktunya. Pada tahap ini kamu perlu memeriksa kabel daya lebih dulu. Klik kabel daya pada model."
2. "Komputer belum dimatikan dengan benar. Gunakan menu Shut down, jangan langsung menekan tombol power."
3. "Jawaban belum tepat. Baca penjelasannya, lalu lanjut ke soal berikutnya."

Pesan selalu menyebut apa yang terjadi dan apa langkah berikutnya, tanpa menyalahkan pengguna.

## Content and Voice

Bahasa antarmuka adalah Bahasa Indonesia. Nada ramah, tenang, dan langsung; memakai kata "kamu"; kalimat pendek maksimal sekitar 20 kata; satu ide per kalimat. Istilah teknis diberi penjelasan singkat saat pertama muncul. Format tanggal "16 November 2026"; angka memakai pemisah desimal koma pada teks Indonesia.

Glosarium istilah aplikasi (dipakai konsisten):

| Istilah | Makna dan penggunaan |
|---|---|
| Simulasi | Seluruh alur belajar dari pemeriksaan sampai shutdown |
| Tahap | Satu langkah dalam simulasi (`SimulationStep`) |
| Petunjuk | Teks tindakan yang harus dilakukan pada tahap aktif |
| Penjelasan | Teks tujuan dan fungsi sebuah tahapan |
| Komponen | Bagian komputer yang tampil di model 3D (`PCComponent`) |
| Casing | Kotak unit pemroses komputer desktop |
| Booting | Proses komputer menyala sampai sistem operasi siap |
| Shutdown | Prosedur mematikan komputer lewat sistem operasi |
| Peringatan | Pesan saat tindakan tidak sesuai urutan |
| Kuis | Soal singkat setelah simulasi (F6) |
