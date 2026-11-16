/**
 * Data prosedur dan tahapan simulasi menyalakan & mematikan PC desktop (T-007 · F2, F3).
 * Sesuai model data di docs/ARCHITECTURE.md.
 * 
 * 5 Fase:
 * 1. pemeriksaan perangkat
 * 2. menyalakan
 * 3. booting
 * 4. masuk sistem operasi
 * 5. shutdown
 */

export const simulationProcedure = {
  id: 'pc-power-standard',
  title: 'Prosedur Standar Menyalakan dan Mematikan Komputer Desktop',
  description: 'Panduan edukasi langkah demi langkah untuk menyalakan komputer dari pemeriksaan fisik hingga proses shutdown yang aman melalui sistem operasi.',
  category: 'Dasar Operasional Komputer',
  steps: [
    // ----------------------------------------------------
    // Fase 1: Pemeriksaan Perangkat
    // ----------------------------------------------------
    {
      id: 'step-check-cable',
      order: 1,
      title: 'Pemeriksaan Sambungan Kabel Daya',
      phase: 'pemeriksaan perangkat',
      description: 'Memastikan kabel daya utama telah terpasang rapat pada port power supply (PSU) di belakang casing dan tersambung ke sumber listrik PLN.',
      instruction: 'Periksa sambungan kabel daya dengan mengeklik kabel daya di bagian belakang casing komputer.',
      expectedAction: 'click_power_cable',
      warningMessage: 'Kabel daya belum diperiksa. Komputer memerlukan aliran listrik sebelum dapat dinyalakan.',
      correction: 'Arahkan kursor dan klik kabel daya pada bagian belakang unit casing.',
      interactionTarget: 'component-power-cable',
      nextStepId: 'step-power-monitor',
    },
    {
      id: 'step-power-monitor',
      order: 2,
      title: 'Menyalakan Monitor Display',
      phase: 'pemeriksaan perangkat',
      description: 'Menghidupkan monitor terlebih dahulu agar status sinyal video dan tampilan BIOS/POST dapat langsung terbaca saat casing dinyalakan.',
      instruction: 'Nyalakan layar monitor dengan mengeklik tombol daya monitor.',
      expectedAction: 'click_monitor_power',
      warningMessage: 'Monitor belum menyala. Sebaiknya hidupkan monitor terlebih dahulu agar kamu dapat memantau proses booting.',
      correction: 'Klik tombol power monitor di sudut kanan bawah bingkai monitor.',
      interactionTarget: 'component-monitor-power',
      nextStepId: 'step-power-pc',
    },

    // ----------------------------------------------------
    // Fase 2: Menyalakan Komputer
    // ----------------------------------------------------
    {
      id: 'step-power-pc',
      order: 3,
      title: 'Menekan Tombol Power Casing',
      phase: 'menyalakan',
      description: 'Menekan tombol switch power pada panel depan casing untuk menghantarkan sinyal power-on ke motherboard.',
      instruction: 'Nyalakan CPU komputer dengan menekan tombol power pada casing bagian depan.',
      expectedAction: 'click_power_button',
      warningMessage: 'Komputer belum dinyalakan. Kamu harus menekan tombol power utama pada casing.',
      correction: 'Klik tombol power bundar pada bagian depan casing PC.',
      interactionTarget: 'component-power-button',
      nextStepId: 'step-check-led',
    },
    {
      id: 'step-check-led',
      order: 4,
      title: 'Memeriksa Indikator Lampu LED Casing',
      phase: 'menyalakan',
      description: 'Melihat indikator lampu LED power menyala untuk memastikan arus listrik sudah aktif mengalir ke motherboard dan kipas pendingin.',
      instruction: 'Periksa status daya dengan mengeklik lampu indikator LED power pada casing.',
      expectedAction: 'click_power_led',
      warningMessage: 'Pastikan indikator daya menyala untuk memverifikasi motherboard menerima daya listrik.',
      correction: 'Klik lampu LED kecil berwarna hijau di samping tombol power casing.',
      interactionTarget: 'component-power-led',
      nextStepId: 'step-booting-post',
    },

    // ----------------------------------------------------
    // Fase 3: Proses Booting
    // ----------------------------------------------------
    {
      id: 'step-booting-post',
      order: 5,
      title: 'Menunggu Pengujian Mandiri Sistem (POST & BIOS)',
      phase: 'booting',
      description: 'Proses POST (Power-On Self-Test) berjalan otomatis untuk menguji hardware (CPU, RAM, VGA, keyboard) sebelum memuat bootloader sistem operasi.',
      instruction: 'Perhatikan layar monitor yang menampilkan proses inisialisasi BIOS dan POST.',
      expectedAction: 'observe_screen',
      warningMessage: 'Jangan mematikan komputer saat proses booting atau pengujian POST sedang berlangsung.',
      correction: 'Klik panel layar monitor untuk mengonfirmasi proses booting hardware berjalan lancar.',
      interactionTarget: 'component-screen',
      nextStepId: 'step-os-login',
    },

    // ----------------------------------------------------
    // Fase 4: Masuk ke Sistem Operasi
    // ----------------------------------------------------
    {
      id: 'step-os-login',
      order: 6,
      title: 'Masuk ke Desktop Sistem Operasi',
      phase: 'masuk sistem operasi',
      description: 'Sistem operasi telah selesai dimuat dan menampilkan antarmuka desktop siap pakai.',
      instruction: 'Gunakan mouse untuk mengarahkan kursor dan berinteraksi dengan desktop sistem operasi.',
      expectedAction: 'click_mouse',
      warningMessage: 'Komputer sudah siap di desktop. Gerakkan atau klik mouse untuk mulai menggunakannya.',
      correction: 'Klik perangkat tetikus (mouse) di atas meja kerja.',
      interactionTarget: 'component-mouse',
      nextStepId: 'step-save-work',
    },
    {
      id: 'step-save-work',
      order: 7,
      title: 'Menyimpan Dokumen dan Menutup Aplikasi',
      phase: 'masuk sistem operasi',
      description: 'Kebiasaan penting sebelum mematikan komputer adalah menyimpan seluruh pekerjaan aktif dan menutup program yang sedang berjalan.',
      instruction: 'Gunakan keyboard untuk memastikan seluruh aplikasi tersimpan sebelum proses pemadaman.',
      expectedAction: 'click_keyboard',
      warningMessage: 'Pastikan tidak ada aplikasi yang belum tersimpan sebelum kamu mematikan sistem.',
      correction: 'Klik papan ketik (keyboard) untuk mensimulasikan penyimpanan berkas kerja.',
      interactionTarget: 'component-keyboard',
      nextStepId: 'step-shutdown-os',
    },

    // ----------------------------------------------------
    // Fase 5: Shutdown yang Benar
    // ----------------------------------------------------
    {
      id: 'step-shutdown-os',
      order: 8,
      title: 'Memilih Perintah Shut Down Melalui Menu OS',
      phase: 'shutdown',
      description: 'Mematikan komputer melalui prosedur resmi: Menu Mulai -> Daya -> Shut down. Prosedur ini menghentikan servis sistem, menulis cache ke disk, dan memarkir head hard drive dengan aman.',
      instruction: 'Klik layar monitor pada area tombol Shut Down untuk menutup sistem operasi secara teratur.',
      expectedAction: 'click_screen_shutdown',
      warningMessage: 'Jangan langsung menekan tombol power fisik casing atau mencabut kabel! Gunakan menu Shut down dari sistem operasi.',
      correction: 'Klik layar monitor untuk mengeksekusi perintah Shut Down yang aman.',
      interactionTarget: 'component-screen',
      nextStepId: 'step-wait-poweroff',
    },
    {
      id: 'step-wait-poweroff',
      order: 9,
      title: 'Menunggu Komputer Mati Sepenuhnya',
      phase: 'shutdown',
      description: 'Menunggu hingga lampu indikator casing padam dan kipas pendingin berhenti berputar sebelum mematikan perangkat eksternal.',
      instruction: 'Periksa lampu indikator LED casing hingga padam sempurna untuk memastikan daya mati.',
      expectedAction: 'click_power_led_off',
      warningMessage: 'Tunggu hingga komponen internal benar-benar berhenti sebelum mematikan periferal.',
      correction: 'Klik lampu indikator daya casing untuk memastikan sistem sudah dalam keadaan off.',
      interactionTarget: 'component-power-led',
      nextStepId: 'step-turn-off-monitor',
    },
    {
      id: 'step-turn-off-monitor',
      order: 10,
      title: 'Mematikan Layar Monitor',
      phase: 'shutdown',
      description: 'Langkah terakhir setelah CPU mati adalah mematikan monitor agar menghemat energi listrik.',
      instruction: 'Matikan layar monitor dengan mengeklik tombol daya monitor. Prosedur simulasi selesai!',
      expectedAction: 'click_monitor_power_off',
      warningMessage: 'Lengkapi prosedur dengan mematikan layar monitor setelah komputer mati.',
      correction: 'Klik tombol power monitor di bagian kanan bawah bingkai monitor.',
      interactionTarget: 'component-monitor-power',
      nextStepId: null, // Tahap terakhir harus bernilai null
    },
  ],
}
