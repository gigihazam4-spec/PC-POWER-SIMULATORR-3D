/**
 * Data Kuis Pemahaman Menyalakan dan Mematikan Komputer (T-014 · F6).
 * Sesuai model QuizQuestion di docs/ARCHITECTURE.md.
 *
 * @typedef {object} QuizQuestion
 * @property {string} id - Pengenal unik soal
 * @property {string} question - Teks pertanyaan
 * @property {string[]} options - Array pilihan jawaban
 * @property {number} correctAnswer - Indeks jawaban yang benar (0-based)
 * @property {string} explanation - Penjelasan edukatif setelah dijawab
 */

/** @type {QuizQuestion[]} */
export const quizQuestions = [
  {
    id: 'quiz_01_urutan_daya',
    question: 'Sebelum menyalakan tombol power pada komputer, hal utama apa yang harus diperiksa terlebih dahulu?',
    options: [
      'Menekan tombol power pada layar monitor',
      'Memastikan kabel daya utama PC dan monitor telah terhubung ke stopkontak beraliran listrik',
      'Mengklik tombol mouse berulang kali',
      'Membuka casing samping komputer',
    ],
    correctAnswer: 1,
    explanation: 'Memeriksa kestabilan sambungan kabel daya utama sangat penting agar komputer menerima suplai listrik yang cukup dan aman sebelum komponen elektronik dinyalakan.',
  },
  {
    id: 'quiz_02_booting',
    question: 'Apa yang dimaksud dengan proses "Booting" setelah tombol power casing ditekan?',
    options: [
      'Proses membersihkan debu di dalam kipas pendingin',
      'Proses inisialisasi perangkat keras oleh BIOS/UEFI hingga sistem operasi selesai dimuat ke memori',
      'Proses mematikan sistem operasi secara paksa',
      'Proses mencabut kabel monitor saat komputer menyala',
    ],
    correctAnswer: 1,
    explanation: 'Booting adalah proses awal saat komputer pertama kali dinyalakan, di mana sistem membaca firmware (BIOS/UEFI) dan memuat sistem operasi ke dalam RAM.',
  },
  {
    id: 'quiz_03_shutdown_benar',
    question: 'Bagaimana cara mematikan komputer desktop yang benar dan aman bagi sistem operasi?',
    options: [
      'Langsung mencabut steker listrik dari dinding saat Windows masih terbuka',
      'Menekan dan menahan tombol power casing selama 10 detik setiap saat',
      'Menutup semua aplikasi, lalu memilih menu "Shut down" pada sistem operasi',
      'Menekan tombol power monitor saja dan membiarkan CPU menyala',
    ],
    correctAnswer: 2,
    explanation: 'Mematikan komputer melalui menu Shut down di sistem operasi memberi kesempatan pada OS untuk menyimpan data kerja dan menutup berkas sistem secara teratur guna mencegah kerusakan sistem berkas.',
  },
  {
    id: 'quiz_04_indikator_mati',
    question: 'Kapan saat yang paling tepat untuk mencabut steker atau mematikan stabilizer/stopkontak setelah memilih shutdown?',
    options: [
      'Begitu tombol "Shut down" di layar diklik',
      'Setelah semua lampu LED indikator daya padam dan kipas pendingin CPU benar-benar berhenti berputar',
      'Saat layar monitor masih menampilkan teks "Shutting down"',
      'Tidak perlu menunggu, bisa langsung dicabut seketika',
    ],
    correctAnswer: 1,
    explanation: 'Komputer masih menulis status akhir ke penyimpanan saat proses shut down. Listrik hanya boleh diputus total setelah indikator daya padam dan kipas berhenti berputar.',
  },
  {
    id: 'quiz_05_kabel_longgar',
    question: 'Mengapa kabel daya yang longgar berbahaya bagi kelangsungan komputer desktop?',
    options: [
      'Dapat menyebabkan percikan bunga api listrik (*arcing*) dan komputer mati mendadak saat beroperasi',
      'Membuat resolusi layar monitor otomatis mengecil',
      'Menyebabkan tombol keyboard menjadi keras saat ditekan',
      'Membuat warna mouse berubah',
    ],
    correctAnswer: 0,
    explanation: 'Sambungan listrik yang longgar dapat memicu lonjakan arus atau putus-sambung aliran listrik (*micro-interruption*) yang berisiko merusak unit catu daya (PSU) dan komponen internal lainnya.',
  },
]
