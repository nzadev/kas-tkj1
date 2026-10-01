/**
 * KAS-TKJ1: Core Logic, Exact Mathematical Engine & LocalStorage Manager
 * Sistem Informasi Kas & Monitoring Iuran Kelas XII TKJ 1 - SMK Kartika X-1
 * Kelompok 4: Nabil Zaenal Assyqin (Anchor), Kaila, Keisya, Irpan, Raihan, Dzakii
 */

const STORAGE_KEY = 'kas_tkj1_storage_v2';
const TARIF_IURAN_TARGET = 20000; // Target bulanan (Rp 5.000 x 4 minggu)

// 27 Nama Siswa Riil Sesuai Hasil Undian Resmi di Lembar Tugas Pak Allan
// Total Terkumpul: 20 Lunas (Rp 20.000) + 3 @ 15.000 + 3 @ 10.000 + 1 @ 5.000 = Rp 480.000 (SINKRON 100%)
const INITIAL_STUDENTS = [
  // Kelompok 1
  { id: 'std-01', nama: 'FYARA TUZ ZAHRA', gender: 'P', kelompok: 'Kelompok 1', terbayar: 20000, status: 'Lunas' },
  { id: 'std-02', nama: 'Mutia Sara', gender: 'P', kelompok: 'Kelompok 1', terbayar: 20000, status: 'Lunas' },
  { id: 'std-03', nama: 'Jesen Toms Lasi', gender: 'L', kelompok: 'Kelompok 1', terbayar: 10000, status: 'Nunggak' },
  { id: 'std-04', nama: 'Masbayu', gender: 'L', kelompok: 'Kelompok 1', terbayar: 15000, status: 'Nunggak' },
  { id: 'std-05', nama: 'Adhani Wahyudi', gender: 'L', kelompok: 'Kelompok 1', terbayar: 20000, status: 'Lunas' },

  // Kelompok 2
  { id: 'std-06', nama: 'DEA ANATASYA PUTRI', gender: 'P', kelompok: 'Kelompok 2', terbayar: 20000, status: 'Lunas' },
  { id: 'std-07', nama: 'Atha Salsabila Agustine', gender: 'P', kelompok: 'Kelompok 2', terbayar: 20000, status: 'Lunas' },
  { id: 'std-08', nama: 'Ahmad Fitoni', gender: 'L', kelompok: 'Kelompok 2', terbayar: 5000, status: 'Nunggak' },
  { id: 'std-09', nama: 'Ilham Saputra', gender: 'L', kelompok: 'Kelompok 2', terbayar: 20000, status: 'Lunas' },
  { id: 'std-10', nama: 'Raditya Damariz Gautama', gender: 'L', kelompok: 'Kelompok 2', terbayar: 15000, status: 'Nunggak' },

  // Kelompok 3
  { id: 'std-11', nama: 'NAILA NUR SALSABILA PUTRI', gender: 'P', kelompok: 'Kelompok 3', terbayar: 20000, status: 'Lunas' },
  { id: 'std-12', nama: 'Izzabela Maulina', gender: 'P', kelompok: 'Kelompok 3', terbayar: 20000, status: 'Lunas' },
  { id: 'std-13', nama: 'Dwi Nur Ichrom', gender: 'L', kelompok: 'Kelompok 3', terbayar: 20000, status: 'Lunas' },
  { id: 'std-14', nama: 'Mochammad Farrel Ramaulia', gender: 'L', kelompok: 'Kelompok 3', terbayar: 10000, status: 'Nunggak' },
  { id: 'std-15', nama: 'Muhamad Holyone', gender: 'L', kelompok: 'Kelompok 3', terbayar: 20000, status: 'Lunas' },

  // Kelompok 4 (Kelompok Pembuat)
  { id: 'std-16', nama: 'NABIL ZAENAL ASSYQIN', gender: 'L', kelompok: 'Kelompok 4', terbayar: 20000, status: 'Lunas' },
  { id: 'std-17', nama: 'Kaila Kanzha', gender: 'P', kelompok: 'Kelompok 4', terbayar: 20000, status: 'Lunas' },
  { id: 'std-18', nama: 'Keisya Tania Sibarani', gender: 'P', kelompok: 'Kelompok 4', terbayar: 20000, status: 'Lunas' },
  { id: 'std-19', nama: 'Muhamad Irpan', gender: 'L', kelompok: 'Kelompok 4', terbayar: 20000, status: 'Lunas' },
  { id: 'std-20', nama: 'Raihan Mufadzal Zaki', gender: 'L', kelompok: 'Kelompok 4', terbayar: 20000, status: 'Lunas' },
  { id: 'std-21', nama: 'Dzakii Pratama Haritahta', gender: 'L', kelompok: 'Kelompok 4', terbayar: 20000, status: 'Lunas' },

  // Kelompok 5
  { id: 'std-22', nama: 'SEPTIAN ROBERTO SILALAHI', gender: 'L', kelompok: 'Kelompok 5', terbayar: 20000, status: 'Lunas' },
  { id: 'std-23', nama: 'Anna Tasya', gender: 'P', kelompok: 'Kelompok 5', terbayar: 20000, status: 'Lunas' },
  { id: 'std-24', nama: 'Ratu Habibah', gender: 'P', kelompok: 'Kelompok 5', terbayar: 20000, status: 'Lunas' },
  { id: 'std-25', nama: 'Muhammad Fariz Ramadhan', gender: 'L', kelompok: 'Kelompok 5', terbayar: 15000, status: 'Nunggak' },
  { id: 'std-26', nama: 'Raju Arya Ramana', gender: 'L', kelompok: 'Kelompok 5', terbayar: 20000, status: 'Lunas' },
  { id: 'std-27', nama: 'Shapa Alipiandi', gender: 'L', kelompok: 'Kelompok 5', terbayar: 10000, status: 'Nunggak' }
];

// Transaksi Riil Bawaan Awal (Sinkron 100% dengan Total Uang Iuran Siswa)
// Total Masuk = 135k + 130k + 115k + 100k = Rp 480.000 (Pas dengan jumlah iuran 27 siswa)
// Total Keluar = 28k + 45k + 50k + 22k = Rp 145.000
// Saldo Kas Sisa = Rp 480.000 - Rp 145.000 = Rp 335.000
const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    tanggal: '2026-09-02',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran Kas Minggu ke-1 (27 Siswa @ Rp 5.000)',
    pihak: 'Bendahara Kelas',
    nominal: 135000,
    studentId: null
  },
  {
    id: 'tx-102',
    tanggal: '2026-09-05',
    tipe: 'keluar',
    kategori: 'Operasional Kelas',
    keterangan: 'Beli 3 Spidol Snowman Boardmarker + Isi Ulang Tinta',
    pihak: 'Fotokopi & ATK Berkah',
    nominal: 28000,
    studentId: null
  },
  {
    id: 'tx-103',
    tanggal: '2026-09-09',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran Kas Minggu ke-2 (26 Siswa @ Rp 5.000)',
    pihak: 'Bendahara Kelas',
    nominal: 130000,
    studentId: null
  },
  {
    id: 'tx-104',
    tanggal: '2026-09-12',
    tipe: 'keluar',
    kategori: 'Praktik Lab TKJ',
    keterangan: 'Beli 1 Pack Konektor RJ45 Cat6 (50 Pcs) Ujian Jaringan',
    pihak: 'Toko Komputer Harco',
    nominal: 45000,
    studentId: null
  },
  {
    id: 'tx-105',
    tanggal: '2026-09-16',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran Kas Minggu ke-3 (23 Siswa @ Rp 5.000)',
    pihak: 'Bendahara Kelas',
    nominal: 115000,
    studentId: null
  },
  {
    id: 'tx-106',
    tanggal: '2026-09-19',
    tipe: 'keluar',
    kategori: 'Sosial & Jenguk',
    keterangan: 'Uang santunan & jenguk teman sekelas sakit',
    pihak: 'Sie Sosial Kelas',
    nominal: 50000,
    studentId: null
  },
  {
    id: 'tx-107',
    tanggal: '2026-09-23',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran Kas Minggu ke-4 (20 Siswa Lunas @ Rp 5.000)',
    pihak: 'Bendahara Kelas',
    nominal: 100000,
    studentId: null
  },
  {
    id: 'tx-108',
    tanggal: '2026-09-25',
    tipe: 'keluar',
    kategori: 'Operasional Kelas',
    keterangan: 'Fotokopi modul materi Uji Kompetensi Kejuruan (UKK)',
    pihak: 'Koperasi SMK Kartika X-1',
    nominal: 22000,
    studentId: null
  }
];

// Global State
let state = {
  students: [],
  transactions: []
};

let deferredPrompt = null;

// ==========================================================================
// 1. Data Persistence & LocalStorage
// ==========================================================================
function loadState() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      const parsed = JSON.parse(rawData);
      state.students = parsed.students || INITIAL_STUDENTS;
      state.transactions = parsed.transactions || INITIAL_TRANSACTIONS;
    } else {
      state.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
      state.transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
      saveState();
    }
  } catch (error) {
    console.error('Gagal membaca data dari localStorage:', error);
    state.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    state.transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Gagal menyimpan ke localStorage:', error);
    showToast('Memori lokal penuh atau diblokir browser!', 'danger');
  }
}

// Auto-save saat user menutup tab / reload
window.addEventListener('beforeunload', () => {
  saveState();
});

// ==========================================================================
// 2. Kalkulasi Presisi Matematika
// ==========================================================================
function calculateTotals() {
  const totalMasuk = state.transactions
    .filter(t => t.tipe === 'masuk')
    .reduce((sum, curr) => sum + Number(curr.nominal), 0);

  const totalKeluar = state.transactions
    .filter(t => t.tipe === 'keluar')
    .reduce((sum, curr) => sum + Number(curr.nominal), 0);

  const saldoKas = totalMasuk - totalKeluar;

  const countMasuk = state.transactions.filter(t => t.tipe === 'masuk').length;
  const countKeluar = state.transactions.filter(t => t.tipe === 'keluar').length;

  const totalSiswa = state.students.length;
  const siswaLunas = state.students.filter(s => s.status === 'Lunas').length;
  const siswaNunggak = totalSiswa - siswaLunas;
  const persenLunas = totalSiswa > 0 ? Math.round((siswaLunas / totalSiswa) * 100) : 0;

  // Total uang iuran yang terkumpul dari seluruh siswa
  const totalIuranSiswa = state.students.reduce((sum, curr) => sum + Number(curr.terbayar), 0);

  return {
    totalMasuk,
    totalKeluar,
    saldoKas,
    countMasuk,
    countKeluar,
    totalSiswa,
    siswaLunas,
    siswaNunggak,
    persenLunas,
    totalIuranSiswa
  };
}

function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

// ==========================================================================
// 3. Render Dashboard
// ==========================================================================
function renderDashboard() {
  const totals = calculateTotals();

  // Saldo
  const elSaldo = document.getElementById('valSaldoKas');
  elSaldo.textContent = formatRupiah(totals.saldoKas);

  const badgeStatusKas = document.getElementById('badgeStatusKas');
  if (totals.saldoKas < 50000) {
    badgeStatusKas.textContent = '● Kritis';
    badgeStatusKas.className = 'status-indicator-badge tag-red';
  } else {
    badgeStatusKas.textContent = '● Saldo Aman';
    badgeStatusKas.className = 'status-indicator-badge tag-green';
  }

  // Pemasukan
  document.getElementById('valTotalMasuk').textContent = formatRupiah(totals.totalMasuk);
  document.getElementById('textDetailMasuk').textContent = `${totals.countMasuk} transaksi kas masuk`;

  // Pengeluaran
  document.getElementById('valTotalKeluar').textContent = formatRupiah(totals.totalKeluar);
  document.getElementById('textDetailKeluar').textContent = `${totals.countKeluar} mutasi belanja/kegiatan`;

  // Kepatuhan
  document.getElementById('valRasioLunas').textContent = `${totals.siswaLunas} / ${totals.totalSiswa}`;
  document.getElementById('valPersenLunas').textContent = `${totals.persenLunas}%`;
  document.getElementById('progressBarFill').style.width = `${totals.persenLunas}%`;
  document.getElementById('textSiswaNunggak').textContent = `${totals.siswaNunggak} siswa nunggak kas`;
}

// ==========================================================================
// 4. Render Monitoring 27 Siswa
// ==========================================================================
function renderStudents() {
  const tbody = document.getElementById('tbodySiswa');
  const searchVal = (document.getElementById('searchSiswaInput').value || '').toLowerCase().trim();
  const filterVal = document.getElementById('filterStatusSiswa').value;

  const filtered = state.students.filter(student => {
    const matchSearch = student.nama.toLowerCase().includes(searchVal);
    const matchFilter = (filterVal === 'all') ||
                        (filterVal === 'lunas' && student.status === 'Lunas') ||
                        (filterVal === 'nunggak' && student.status === 'Nunggak');
    return matchSearch && matchFilter;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 32px; color: var(--color-text-muted);">
          Tidak ada data siswa yang cocok dengan pencarian / filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((student, idx) => {
    const isLunas = student.status === 'Lunas';
    const sisaNunggak = Math.max(0, TARIF_IURAN_TARGET - student.terbayar);
    const initials = getInitials(student.nama);
    const mingguLunas = Math.min(4, Math.floor(student.terbayar / 5000));

    return `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted); text-align: center;">${idx + 1}</td>
        <td>
          <div class="student-profile-cell">
            <div class="student-avatar ${student.gender === 'P' ? 'avatar-p' : 'avatar-l'}">${initials}</div>
            <div>
              <strong class="student-name">${escapeHtml(student.nama)}</strong>
              <div class="student-meta-sub">
                <span>${student.gender === 'P' ? 'Perempuan' : 'Laki-laki'}</span>
                <span>•</span>
                <span>Lunas: <strong>${mingguLunas}/4 Minggu</strong></span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 800; color: var(--color-text-main); font-variant-numeric: tabular-nums;">${formatRupiah(student.terbayar)}</div>
          <div class="mini-progress-track">
            <div class="mini-progress-bar" style="width: ${(student.terbayar / TARIF_IURAN_TARGET) * 100}%;"></div>
          </div>
        </td>
        <td>
          <span class="badge-status ${isLunas ? 'badge-lunas' : 'badge-nunggak'}">
            ${isLunas ? '✓ Lunas' : `Kurang ${formatRupiah(sisaNunggak)}`}
          </span>
        </td>
        <td style="text-align: center;">
          <div class="quick-action-btns">
            <button 
              type="button" 
              class="btn-danger-sm"
              onclick="reduceStudentPayment('${student.id}', 5000)"
              title="Kurangi iuran Rp 5.000 (Koreksi)"
              ${student.terbayar <= 0 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}
            >
              −5k
            </button>
            <button 
              type="button" 
              class="btn btn-sm ${isLunas ? 'btn-outline' : 'btn-success'}"
              onclick="quickPayStudent('${student.id}', 5000)"
              title="Catat bayar iuran Rp 5.000"
            >
              +5k
            </button>
            <button 
              type="button" 
              class="btn btn-sm btn-outline"
              onclick="quickPayStudent('${student.id}', 10000)"
              title="Catat bayar iuran Rp 10.000"
            >
              +10k
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Quick Payment Action (Tambah Uang Iuran)
window.quickPayStudent = function(studentId, nominalTambah = 5000) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  student.terbayar += nominalTambah;
  if (student.terbayar >= TARIF_IURAN_TARGET) {
    student.status = 'Lunas';
  }

  const today = new Date().toISOString().split('T')[0];
  const newTx = {
    id: 'tx-' + Date.now(),
    tanggal: today,
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: `Iuran kas siswa ${student.nama} (+${formatRupiah(nominalTambah)})`,
    pihak: student.nama,
    nominal: nominalTambah,
    studentId: student.id
  };

  state.transactions.unshift(newTx);
  saveState();

  renderDashboard();
  renderStudents();
  renderTransactions();
  renderCategoryBreakdown();

  showToast(`Iuran ${formatRupiah(nominalTambah)} dari ${student.nama} tersimpan!`, 'success');
};

// Quick Reduction Action (Kurangi Uang Iuran / Koreksi Kas)
window.reduceStudentPayment = function(studentId, nominalKurang = 5000) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  if (student.terbayar <= 0) {
    showToast(`Uang iuran ${student.nama} sudah Rp 0, tidak bisa dikurangi lagi!`, 'danger');
    return;
  }

  const nominalReal = Math.min(student.terbayar, nominalKurang);
  student.terbayar -= nominalReal;
  if (student.terbayar < TARIF_IURAN_TARGET) {
    student.status = 'Nunggak';
  }

  // Catat otomatis ke buku mutasi kas sebagai koreksi/pengeluaran
  const today = new Date().toISOString().split('T')[0];
  const newTx = {
    id: 'tx-' + Date.now(),
    tanggal: today,
    tipe: 'keluar',
    kategori: 'Iuran Kas Siswa',
    keterangan: `Koreksi / Pengurangan iuran kas siswa ${student.nama} (-${formatRupiah(nominalReal)})`,
    pihak: student.nama,
    nominal: nominalReal,
    studentId: student.id
  };

  state.transactions.unshift(newTx);
  saveState();

  renderDashboard();
  renderStudents();
  renderTransactions();
  renderCategoryBreakdown();

  showToast(`Iuran ${student.nama} dikurangi ${formatRupiah(nominalReal)} (Koreksi tercatat)`, 'warning');
};

// ==========================================================================
// 5. Render Buku Mutasi
// ==========================================================================
function renderTransactions() {
  const tbody = document.getElementById('tbodyMutasi');
  const searchVal = (document.getElementById('searchMutasiInput').value || '').toLowerCase().trim();
  const filterTipe = document.getElementById('filterTipeMutasi').value;
  const filterKat = document.getElementById('filterKategoriMutasi').value;

  const filtered = state.transactions.filter(tx => {
    const matchSearch = tx.keterangan.toLowerCase().includes(searchVal) ||
                        tx.pihak.toLowerCase().includes(searchVal);
    const matchTipe = (filterTipe === 'all') || (tx.tipe === filterTipe);
    const matchKat = (filterKat === 'all') || (tx.kategori === filterKat);

    return matchSearch && matchTipe && matchKat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 32px; color: var(--color-text-muted);">
          Belum ada riwayat mutasi kas yang sesuai filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((tx) => {
    const isMasuk = tx.tipe === 'masuk';

    return `
      <tr>
        <td style="font-size: 13px; font-weight: 600; font-family: monospace;">${tx.tanggal}</td>
        <td>
          <span class="badge-status ${isMasuk ? 'badge-masuk' : 'badge-keluar'}">
            ${isMasuk ? '📥 Masuk' : '📤 Keluar'}
          </span>
        </td>
        <td><strong class="category-tag">${escapeHtml(tx.kategori)}</strong></td>
        <td>${escapeHtml(tx.keterangan)}</td>
        <td><span class="group-pill">${escapeHtml(tx.pihak)}</span></td>
        <td style="text-align: right; font-weight: 800; font-variant-numeric: tabular-nums; color: ${isMasuk ? 'var(--color-success)' : 'var(--color-danger)'};">
          ${isMasuk ? '+' : '-'} ${formatRupiah(tx.nominal)}
        </td>
        <td style="text-align: center;">
          <button 
            type="button" 
            class="btn-action-delete" 
            onclick="deleteTransaction('${tx.id}')"
            title="Hapus transaksi"
          >
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteTransaction = function(txId) {
  const index = state.transactions.findIndex(t => t.id === txId);
  if (index === -1) return;

  const tx = state.transactions[index];
  if (!confirm(`Hapus transaksi "${tx.keterangan}" (${formatRupiah(tx.nominal)})?`)) {
    return;
  }

  if (tx.studentId) {
    const student = state.students.find(s => s.id === tx.studentId);
    if (student) {
      student.terbayar = Math.max(0, student.terbayar - Number(tx.nominal));
      student.status = student.terbayar >= TARIF_IURAN_TARGET ? 'Lunas' : 'Nunggak';
    }
  }

  state.transactions.splice(index, 1);
  saveState();

  renderDashboard();
  renderStudents();
  renderTransactions();
  renderCategoryBreakdown();

  showToast('Transaksi berhasil dihapus dari memori!', 'success');
};

// ==========================================================================
// 6. Render Analisis Kategori
// ==========================================================================
function renderCategoryBreakdown() {
  const container = document.getElementById('categoryBreakdownGrid');
  const categories = [
    { name: 'Iuran Kas Siswa', tipe: 'masuk', color: 'var(--color-success)', icon: '💰' },
    { name: 'Praktik Lab TKJ', tipe: 'keluar', color: 'var(--color-primary-light)', icon: '🔌' },
    { name: 'Operasional Kelas', tipe: 'keluar', color: 'var(--color-warning)', icon: '✏️' },
    { name: 'Sosial & Jenguk', tipe: 'keluar', color: '#8b5cf6', icon: '🤝' },
    { name: 'Acara & Lomba', tipe: 'keluar', color: '#06b6d4', icon: '🏆' },
    { name: 'Lain-lain', tipe: 'keluar', color: 'var(--color-text-muted)', icon: '📦' }
  ];

  container.innerHTML = categories.map(cat => {
    const txList = state.transactions.filter(t => t.kategori === cat.name);
    const total = txList.reduce((sum, curr) => sum + Number(curr.nominal), 0);
    const count = txList.length;

    return `
      <div class="category-card" style="border-left: 5px solid ${cat.color};">
        <div class="category-card-header">
          <span class="category-name">${cat.icon} ${escapeHtml(cat.name)}</span>
          <span class="stat-icon-tag ${cat.tipe === 'masuk' ? 'tag-green' : 'tag-red'}">
            ${cat.tipe === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}
          </span>
        </div>
        <div class="category-amount" style="color: ${cat.color};">${formatRupiah(total)}</div>
        <p class="stat-helper">${count} mutasi tercatat</p>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 7. Backup, Restore, dan Export Excel (CSV)
// ==========================================================================
function setupBackupAndExport() {
  // Export JSON Backup
  document.getElementById('btnExportBackup')?.addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `KAS_TKJ1_Backup_${dateStr}.json`);
    dlAnchor.click();
    showToast('File backup JSON berhasil didownload!', 'success');
  });

  // Restore JSON Backup
  const fileInput = document.getElementById('inputRestoreFile');
  document.getElementById('btnTriggerRestore')?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.students && imported.transactions) {
          state = imported;
          saveState();
          renderDashboard();
          renderStudents();
          renderTransactions();
          renderCategoryBreakdown();
          showToast('Data berhasil di-restore dari file backup!', 'success');
        } else {
          showToast('Format file backup tidak valid!', 'danger');
        }
      } catch (err) {
        showToast('Gagal membaca file JSON!', 'danger');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // Export Excel CSV
  document.getElementById('btnExportCsv')?.addEventListener('click', () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tanggal,Jenis,Kategori,Keterangan,Pihak Terkait,Nominal (Rp)\n";

    state.transactions.forEach(t => {
      const row = [
        `"${t.tanggal}"`,
        `"${t.tipe === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}"`,
        `"${t.kategori}"`,
        `"${t.keterangan.replace(/"/g, '""')}"`,
        `"${t.pihak.replace(/"/g, '""')}"`,
        t.nominal
      ].join(',');
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Mutasi_Kas_XII_TKJ_1_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Rekap Excel (CSV) berhasil didownload!', 'success');
  });
}

// ==========================================================================
// 8. Form Transaksi Baru (Validasi Ketat Anti-AI Slop)
// ==========================================================================
function setupFormHandler() {
  const form = document.getElementById('formTransaksi');
  const radioTipe = document.getElementsByName('tipeTransaksi');
  const selectKategori = document.getElementById('selectKategori');
  const groupSiswa = document.getElementById('groupPilihanSiswa');
  const groupPihakLuar = document.getElementById('groupPihakLuar');
  const selectSiswa = document.getElementById('selectSiswaTx');
  const inputNominal = document.getElementById('inputNominal');
  const inputKeterangan = document.getElementById('inputKeterangan');
  const inputTanggal = document.getElementById('inputTanggal');

  selectSiswa.innerHTML = '<option value="">-- Pilih Siswa (Atau Kosongkan jika Umum) --</option>' +
    state.students.map(s => `<option value="${s.id}">${escapeHtml(s.nama)}</option>`).join('');

  inputTanggal.value = new Date().toISOString().split('T')[0];

  document.querySelectorAll('.btn-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      inputNominal.value = btn.dataset.nominal;
      validateNominal();
    });
  });

  radioTipe.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'masuk') {
        groupSiswa.classList.remove('hidden');
        groupPihakLuar.classList.add('hidden');
        selectKategori.value = 'Iuran Kas Siswa';
      } else {
        groupSiswa.classList.add('hidden');
        groupPihakLuar.classList.remove('hidden');
        selectKategori.value = 'Operasional Kelas';
      }
    });
  });

  function validateNominal() {
    const val = Number(inputNominal.value);
    const err = document.getElementById('errorNominal');
    if (!val || val < 500) {
      err.textContent = 'Nominal minimal Rp 500 dan harus berupa angka valid!';
      return false;
    }
    err.textContent = '';
    return true;
  }

  function validateKeterangan() {
    const val = inputKeterangan.value.trim();
    const err = document.getElementById('errorKeterangan');
    if (val.length < 3) {
      err.textContent = 'Keterangan harus diisi minimal 3 karakter!';
      return false;
    }
    err.textContent = '';
    return true;
  }

  inputNominal.addEventListener('input', validateNominal);
  inputKeterangan.addEventListener('input', validateKeterangan);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNominalValid = validateNominal();
    const isKetValid = validateKeterangan();

    if (!isNominalValid || !isKetValid) {
      showToast('Mohon lengkapi formulir dengan benar!', 'danger');
      return;
    }

    const tipeSelected = Array.from(radioTipe).find(r => r.checked)?.value || 'masuk';
    const kategori = selectKategori.value;
    const nominal = Number(inputNominal.value);
    const keterangan = inputKeterangan.value.trim();
    const tanggal = inputTanggal.value || new Date().toISOString().split('T')[0];

    let pihak = 'Umum / Kas Kelas';
    let studentId = null;

    if (tipeSelected === 'masuk') {
      const selectedStdId = selectSiswa.value;
      if (selectedStdId) {
        const student = state.students.find(s => s.id === selectedStdId);
        if (student) {
          pihak = student.nama;
          studentId = student.id;
          student.terbayar += nominal;
          if (student.terbayar >= TARIF_IURAN_TARGET) {
            student.status = 'Lunas';
          }
        }
      } else {
        pihak = 'Iuran Kas Bersama';
      }
    } else {
      const pihakInput = document.getElementById('inputPihakLuar').value.trim();
      pihak = pihakInput || 'Belanja Operasional';
    }

    const newTx = {
      id: 'tx-' + Date.now(),
      tanggal,
      tipe: tipeSelected,
      kategori,
      keterangan,
      pihak,
      nominal,
      studentId
    };

    state.transactions.unshift(newTx);
    saveState();

    renderDashboard();
    renderStudents();
    renderTransactions();
    renderCategoryBreakdown();

    form.reset();
    inputTanggal.value = new Date().toISOString().split('T')[0];
    document.getElementById('modalTransaksi').classList.add('hidden');

    showToast(`Transaksi ${formatRupiah(nominal)} berhasil disimpan!`, 'success');
  });
}

// ==========================================================================
// 9. Tab Navigasi & Event Listeners
// ==========================================================================
function setupNavigationAndModals() {
  const tabButtons = document.querySelectorAll('.view-tab-btn, .bottom-nav-item');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.target;
      if (!targetView) return;

      document.querySelectorAll('.view-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.target === targetView);
      });
      document.querySelectorAll('.bottom-nav-item').forEach(b => {
        b.classList.toggle('active', b.dataset.target === targetView);
      });

      document.querySelectorAll('.content-view-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === targetView);
      });
    });
  });

  const modalTx = document.getElementById('modalTransaksi');
  const btnOpenModal = document.getElementById('btnOpenModal');
  const btnMobileAddTx = document.getElementById('btnMobileAddTx');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');

  const openTxModal = () => modalTx.classList.remove('hidden');
  const closeTxModal = () => modalTx.classList.add('hidden');

  btnOpenModal?.addEventListener('click', openTxModal);
  btnMobileAddTx?.addEventListener('click', openTxModal);
  btnCloseModal?.addEventListener('click', closeTxModal);
  btnCancelModal?.addEventListener('click', closeTxModal);

  const modalAndroid = document.getElementById('modalAndroid');
  const btnOpenAndroid = document.getElementById('btnOpenAndroidModal');
  const btnCloseAndroid = document.getElementById('btnCloseAndroidModal');
  const btnCloseAndroidBtn = document.getElementById('btnCloseAndroidModalBtn');

  btnOpenAndroid?.addEventListener('click', () => modalAndroid.classList.remove('hidden'));
  btnCloseAndroid?.addEventListener('click', () => modalAndroid.classList.add('hidden'));
  btnCloseAndroidBtn?.addEventListener('click', () => modalAndroid.classList.add('hidden'));

  [modalTx, modalAndroid].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  document.getElementById('btnPrintReport')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btnResetData')?.addEventListener('click', () => {
    if (confirm('Kembalikan data kas dan 27 siswa ke status awal bawaan pabrik?')) {
      localStorage.removeItem(STORAGE_KEY);
      loadState();
      renderDashboard();
      renderStudents();
      renderTransactions();
      renderCategoryBreakdown();
      showToast('Data berhasil di-reset ke kondisi awal!', 'success');
    }
  });

  document.getElementById('searchSiswaInput')?.addEventListener('input', renderStudents);
  document.getElementById('filterStatusSiswa')?.addEventListener('change', renderStudents);
  document.getElementById('searchMutasiInput')?.addEventListener('input', renderTransactions);
  document.getElementById('filterTipeMutasi')?.addEventListener('change', renderTransactions);
  document.getElementById('filterKategoriMutasi')?.addEventListener('change', renderTransactions);
}

// ==========================================================================
// 10. PWA Setup
// ==========================================================================
function setupPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('KAS-TKJ1 Service Worker terdaftar.');
    }).catch(err => {
      console.warn('Gagal registrasi SW:', err);
    });
  }

  const pwaBanner = document.getElementById('pwaBanner');
  const btnInstall = document.getElementById('btnInstallPwa');
  const btnDismiss = document.getElementById('btnDismissPwa');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaBanner) pwaBanner.classList.remove('hidden');
  });

  btnInstall?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('Terima kasih telah memasang KAS-TKJ1!', 'success');
    }
    deferredPrompt = null;
    pwaBanner.classList.add('hidden');
  });

  btnDismiss?.addEventListener('click', () => {
    pwaBanner.classList.add('hidden');
  });
}

// ==========================================================================
// 11. Toast & Escaper
// ==========================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// Bootstrapper
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderDashboard();
  renderStudents();
  renderTransactions();
  renderCategoryBreakdown();
  setupFormHandler();
  setupNavigationAndModals();
  setupBackupAndExport();
  setupPWA();
});
