/**
 * Data komponen PC (PCComponent) untuk F1 & T-006.
 * Sesuai model data di docs/ARCHITECTURE.md.
 * Field wajib: id, name, description, function, interactionTarget.
 */
export const pcComponents = [
  {
    id: 'power-cable',
    name: 'Kabel Daya (Power Cable)',
    description: 'Kabel penghubung arus listrik dari stopkontak ke catu daya (PSU) komputer.',
    function: 'Menyuplai aliran listrik AC dari stopkontak ke Power Supply Unit agar komputer mendapatkan daya untuk beroperasi.',
    interactionTarget: 'component-power-cable',
  },
  {
    id: 'casing-tower',
    name: 'Casing Komputer (Tower)',
    description: 'Rangka dan pelindung fisik yang menampung seluruh komponen internal komputer.',
    function: 'Melindungi komponen internal (motherboard, prosesor, RAM, penyimpanan) dari debu, kotoran, dan benturan fisik serta menjaga sirkulasi udara.',
    interactionTarget: 'component-casing',
  },
  {
    id: 'power-button',
    name: 'Tombol Power Casing',
    description: 'Tombol switch utama pada bagian depan casing komputer desktop.',
    function: 'Mengirimkan sinyal ke motherboard untuk memulai proses powering on (menyalakan sistem) atau force shutdown jika ditekan lama.',
    interactionTarget: 'component-power-button',
  },
  {
    id: 'power-led',
    name: 'Lampu Indikator Power (LED)',
    description: 'Lampu kecil penanda status menyala pada bagian depan casing.',
    function: 'Memberikan umpan balik visual bahwa motherboard dan komponen komputer sedang aktif menerima daya listrik.',
    interactionTarget: 'component-power-led',
  },
  {
    id: 'monitor-power',
    name: 'Tombol Power Monitor',
    description: 'Tombol untuk mengaktifkan panel layar monitor.',
    function: 'Menyalakan atau mematikan sirkuit display monitor agar dapat menampilkan sinyal gambar grafis dari komputer.',
    interactionTarget: 'component-monitor-power',
  },
  {
    id: 'screen',
    name: 'Layar Monitor (Display)',
    description: 'Panel visual tempat antarmuka komputer ditampilkan kepada pengguna.',
    function: 'Menampilkan antarmuka visual grafik sistem operasi, proses booting, aplikasi, dan hasil interaksi pengguna.',
    interactionTarget: 'component-screen',
  },
  {
    id: 'keyboard',
    name: 'Papan Ketik (Keyboard)',
    description: 'Perangkat input utama berbasis tombol huruf, angka, dan perintah pintasan.',
    function: 'Memasukkan karakter teks, angka, navigasi, dan pintasan sistem (seperti tombol Windows atau kombinasi shutdown).',
    interactionTarget: 'component-keyboard',
  },
  {
    id: 'mouse',
    name: 'Tetikus (Mouse)',
    description: 'Perangkat input penunjuk (pointing device) untuk mengontrol kursor visual.',
    function: 'Mengarahkan kursor pada layar, memilih objek, mengeklik menu Start, dan mengeksekusi perintah shutdown di antarmuka sistem operasi.',
    interactionTarget: 'component-mouse',
  },
]
