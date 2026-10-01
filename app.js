/**
 * KAS-TKJ1: Core Logic & LocalStorage Engine
 * Sistem Informasi Kas & Monitoring Iuran Kelas XII TKJ 1 - SMK Kartika X-1
 * Kelompok 4: Nabil Zaenal Assyqin (Anchor), Kaila, Keisya, Irpan, Raihan, Dzakii
 */

const STORAGE_KEY = 'kas_tkj1_storage_v1';
const TARIF_IURAN_TARGET = 20000; // Target kas per siswa per bulan (Rp 5.000/minggu x 4)

// 27 Nama Siswa Riil Sesuai Hasil Undian Resmi di Lembar Tugas Pak Allan
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

// Transaksi Riil Bawaan Awal (Data Dummy Terverifikasi untuk Uji Live Demo)
const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    tanggal: '2026-09-02',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran kas minggu ke-1 September (20 Siswa)',
    pihak: 'Bendahara Kas',
    nominal: 100000,
    studentId: null
  },
  {
    id: 'tx-102',
    tanggal: '2026-09-05',
    tipe: 'keluar',
    kategori: 'Operasional Kelas',
    keterangan: 'Beli 3 buah Spidol Snowman Boardmarker + Isi Ulang Tinta',
    pihak: 'Fotokopi & ATK Berkah',
    nominal: 28000,
    studentId: null
  },
  {
    id: 'tx-103',
    tanggal: '2026-09-10',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran kas minggu ke-2 September (24 Siswa)',
    pihak: 'Bendahara Kas',
    nominal: 120000,
    studentId: null
  },
  {
    id: 'tx-104',
    tanggal: '2026-09-14',
    tipe: 'keluar',
    kategori: 'Praktik Lab TKJ',
    keterangan: 'Beli 1 Pack Konektor RJ45 Cat6 (50 Pcs) untuk Ujian Jaringan',
    pihak: 'Toko Komputer Harco',
    nominal: 45000,
    studentId: null
  },
  {
    id: 'tx-105',
    tanggal: '2026-09-18',
    tipe: 'keluar',
    kategori: 'Sosial & Jenguk',
    keterangan: 'Uang santunan & jenguk teman sekelas sakit',
    pihak: 'Sie Sosial Kelas',
    nominal: 50000,
    studentId: null
  },
  {
    id: 'tx-106',
    tanggal: '2026-09-22',
    tipe: 'keluar',
    kategori: 'Operasional Kelas',
    keterangan: 'Fotokopi modul materi Uji Kompetensi Kejuruan (UKK)',
    pihak: 'Koperasi SMK Kartika X-1',
    nominal: 22000,
    studentId: null
  },
  {
    id: 'tx-107',
    tanggal: '2026-09-28',
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: 'Iuran kas minggu ke-3 & 4 September',
    pihak: 'Bendahara Kas',
    nominal: 145000,
    studentId: null
  }
];

// State Global
let state = {
  students: [],
  transactions: []
};

// PWA Deferred Prompt Handler
let deferredPrompt = null;

// ==========================================================================
// 1. Inisialisasi & LocalStorage Persistence
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

// ==========================================================================
// 2. Kalkulasi Matematika & Metrik Dashboard
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

  return {
    totalMasuk,
    totalKeluar,
    saldoKas,
    countMasuk,
    countKeluar,
    totalSiswa,
    siswaLunas,
    siswaNunggak,
    persenLunas
  };
}

function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

// ==========================================================================
// 3. Render Dashboard Stat Cards
// ==========================================================================
function renderDashboard() {
  const totals = calculateTotals();

  // Saldo
  const elSaldo = document.getElementById('valSaldoKas');
  elSaldo.textContent = formatRupiah(totals.saldoKas);

  const badgeStatusKas = document.getElementById('badgeStatusKas');
  if (totals.saldoKas < 50000) {
    badgeStatusKas.textContent = 'Status: Kritis';
    badgeStatusKas.className = 'status-indicator-badge tag-red';
  } else {
    badgeStatusKas.textContent = 'Status: Aman';
    badgeStatusKas.className = 'status-indicator-badge tag-green';
  }

  // Pemasukan
  document.getElementById('valTotalMasuk').textContent = formatRupiah(totals.totalMasuk);
  document.getElementById('textDetailMasuk').textContent = `${totals.countMasuk} transaksi tercatat`;

  // Pengeluaran
  document.getElementById('valTotalKeluar').textContent = formatRupiah(totals.totalKeluar);
  document.getElementById('textDetailKeluar').textContent = `${totals.countKeluar} mutasi operasional`;

  // Kepatuhan
  document.getElementById('valRasioLunas').textContent = `${totals.siswaLunas} / ${totals.totalSiswa}`;
  document.getElementById('valPersenLunas').textContent = `${totals.persenLunas}%`;
  document.getElementById('progressBarFill').style.width = `${totals.persenLunas}%`;
  document.getElementById('textSiswaNunggak').textContent = `${totals.siswaNunggak} siswa belum melunasi kas`;
}

// ==========================================================================
// 4. Render Tabel 27 Siswa
// ==========================================================================
function renderStudents() {
  const tbody = document.getElementById('tbodySiswa');
  const searchVal = (document.getElementById('searchSiswaInput').value || '').toLowerCase().trim();
  const filterVal = document.getElementById('filterStatusSiswa').value;

  const filtered = state.students.filter(student => {
    const matchSearch = student.nama.toLowerCase().includes(searchVal) ||
                        student.kelompok.toLowerCase().includes(searchVal);
    const matchFilter = (filterVal === 'all') ||
                        (filterVal === 'lunas' && student.status === 'Lunas') ||
                        (filterVal === 'nunggak' && student.status === 'Nunggak');
    return matchSearch && matchFilter;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: var(--color-text-muted);">
          Tidak ada data siswa yang cocok dengan pencarian / filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((student, idx) => {
    const isLunas = student.status === 'Lunas';
    const sisaNunggak = Math.max(0, TARIF_IURAN_TARGET - student.terbayar);

    return `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
        <td>
          <strong>${escapeHtml(student.nama)}</strong>
          <span style="font-size: 11px; color: var(--color-text-muted); display: block;">
            Jenis Kelamin: ${student.gender === 'P' ? 'Perempuan' : 'Laki-laki'}
          </span>
        </td>
        <td><span class="meta-group-badge">${escapeHtml(student.kelompok)}</span></td>
        <td style="font-weight: 700;">
          ${formatRupiah(student.terbayar)}
          <span style="font-size: 11px; display: block; color: var(--color-text-muted);">
            Target: ${formatRupiah(TARIF_IURAN_TARGET)}
          </span>
        </td>
        <td>
          <span class="badge-status ${isLunas ? 'badge-lunas' : 'badge-nunggak'}">
            ${isLunas ? '✓ Lunas' : `Kurang ${formatRupiah(sisaNunggak)}`}
          </span>
        </td>
        <td style="text-align: center;">
          <button 
            type="button" 
            class="btn btn-sm ${isLunas ? 'btn-outline' : 'btn-success'}"
            onclick="quickPayStudent('${student.id}')"
            title="Catat pembayaran iuran"
          >
            ${isLunas ? '+ Bayar Lagi' : '➕ Bayar Rp 5.000'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Quick Payment Action (Demonstrasi Instan 5 Menit Live Demo)
window.quickPayStudent = function(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  const nominalTambah = 5000;
  student.terbayar += nominalTambah;
  if (student.terbayar >= TARIF_IURAN_TARGET) {
    student.status = 'Lunas';
  }

  // Catat otomatis ke buku mutasi kas
  const today = new Date().toISOString().split('T')[0];
  const newTx = {
    id: 'tx-' + Date.now(),
    tanggal: today,
    tipe: 'masuk',
    kategori: 'Iuran Kas Siswa',
    keterangan: `Iuran kas mingguan siswa ${student.nama}`,
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

  showToast(`Iuran Rp 5.000 dari ${student.nama} berhasil dicatat!`, 'success');
};

// ==========================================================================
// 5. Render Buku Mutasi Transaksi
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
        <td colspan="7" style="text-align: center; padding: 24px; color: var(--color-text-muted);">
          Belum ada riwayat mutasi yang sesuai filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((tx) => {
    const isMasuk = tx.tipe === 'masuk';

    return `
      <tr>
        <td style="font-size: 13px; font-weight: 600;">${tx.tanggal}</td>
        <td>
          <span class="badge-status ${isMasuk ? 'badge-masuk' : 'badge-keluar'}">
            ${isMasuk ? '📥 Masuk' : '📤 Keluar'}
          </span>
        </td>
        <td><strong>${escapeHtml(tx.kategori)}</strong></td>
        <td>${escapeHtml(tx.keterangan)}</td>
        <td><span class="meta-group-badge">${escapeHtml(tx.pihak)}</span></td>
        <td style="text-align: right; font-weight: 800; color: ${isMasuk ? 'var(--color-success)' : 'var(--color-danger)'};">
          ${isMasuk ? '+' : '-'} ${formatRupiah(tx.nominal)}
        </td>
        <td style="text-align: center;">
          <button 
            type="button" 
            class="btn-action-delete" 
            onclick="deleteTransaction('${tx.id}')"
            title="Hapus transaksi ini"
          >
            🗑️ Hapus
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Hapus Transaksi (Rollback State)
window.deleteTransaction = function(txId) {
  const index = state.transactions.findIndex(t => t.id === txId);
  if (index === -1) return;

  const tx = state.transactions[index];
  if (!confirm(`Hapus transaksi "${tx.keterangan}" (${formatRupiah(tx.nominal)})?`)) {
    return;
  }

  // Jika ini transaksi iuran siswa, kurangi juga riwayat pembayaran siswa
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

  showToast('Transaksi berhasil dihapus dari memori lokal!', 'success');
};

// ==========================================================================
// 6. Render Analisis Kategori
// ==========================================================================
function renderCategoryBreakdown() {
  const container = document.getElementById('categoryBreakdownGrid');
  const categories = [
    { name: 'Iuran Kas Siswa', tipe: 'masuk', color: 'var(--color-success)' },
    { name: 'Praktik Lab TKJ', tipe: 'keluar', color: 'var(--color-danger)' },
    { name: 'Operasional Kelas', tipe: 'keluar', color: 'var(--color-warning)' },
    { name: 'Sosial & Jenguk', tipe: 'keluar', color: '#8b5cf6' },
    { name: 'Acara & Lomba', tipe: 'keluar', color: '#06b6d4' },
    { name: 'Lain-lain', tipe: 'keluar', color: 'var(--color-text-muted)' }
  ];

  container.innerHTML = categories.map(cat => {
    const txList = state.transactions.filter(t => t.kategori === cat.name);
    const total = txList.reduce((sum, curr) => sum + Number(curr.nominal), 0);
    const count = txList.length;

    return `
      <div class="category-card" style="border-top: 4px solid ${cat.color};">
        <div class="category-card-header">
          <span class="category-name">${escapeHtml(cat.name)}</span>
          <span class="stat-icon-tag ${cat.tipe === 'masuk' ? 'tag-green' : 'tag-red'}">
            ${cat.tipe === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}
          </span>
        </div>
        <div class="category-amount" style="color: ${cat.color};">${formatRupiah(total)}</div>
        <p class="stat-helper">${count} mutasi tercatat dalam kategori ini</p>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 7. Form Catat Transaksi Baru (Validasi Ketat Anti-AI Slop)
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

  // Isi dropdown siswa
  selectSiswa.innerHTML = '<option value="">-- Pilih Siswa (Atau Kosongkan jika Umum) --</option>' +
    state.students.map(s => `<option value="${s.id}">${escapeHtml(s.nama)} (${escapeHtml(s.kelompok)})</option>`).join('');

  // Tanggal default hari ini
  inputTanggal.value = new Date().toISOString().split('T')[0];

  // Preset Nominal Chips
  document.querySelectorAll('.btn-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      inputNominal.value = btn.dataset.nominal;
      validateNominal();
    });
  });

  // Switch form tampilan berdasarkan tipe
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

  // Validasi Inline
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

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNominalValid = validateNominal();
    const isKetValid = validateKeterangan();

    if (!isNominalValid || !isKetValid) {
      showToast('Mohon lengkapi formulir dengan data yang valid!', 'danger');
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

    // Re-render
    renderDashboard();
    renderStudents();
    renderTransactions();
    renderCategoryBreakdown();

    // Reset Form & Tutup Modal
    form.reset();
    inputTanggal.value = new Date().toISOString().split('T')[0];
    document.getElementById('modalTransaksi').classList.add('hidden');

    showToast(`Transaksi ${tipeSelected === 'masuk' ? 'pemasukan' : 'pengeluaran'} ${formatRupiah(nominal)} berhasil disimpan!`, 'success');
  });
}

// ==========================================================================
// 8. Tab Navigation & Modal Listeners
// ==========================================================================
function setupNavigationAndModals() {
  // View Switch Tabs
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

  // Modal Transaksi Trigger
  const modalTx = document.getElementById('modalTransaksi');
  const btnOpenModal = document.getElementById('btnOpenModal');
  const btnMobileAddTx = document.getElementById('btnMobileAddTx');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');

  const openTxModal = () => modalTx.classList.remove('hidden');
  const closeTxModal = () => modalTx.classList.add('hidden');

  btnOpenModal.addEventListener('click', openTxModal);
  if (btnMobileAddTx) btnMobileAddTx.addEventListener('click', openTxModal);
  btnCloseModal.addEventListener('click', closeTxModal);
  btnCancelModal.addEventListener('click', closeTxModal);

  // Modal Android Trigger
  const modalAndroid = document.getElementById('modalAndroid');
  const btnOpenAndroid = document.getElementById('btnOpenAndroidModal');
  const btnCloseAndroid = document.getElementById('btnCloseAndroidModal');
  const btnCloseAndroidBtn = document.getElementById('btnCloseAndroidModalBtn');

  btnOpenAndroid.addEventListener('click', () => modalAndroid.classList.remove('hidden'));
  btnCloseAndroid.addEventListener('click', () => modalAndroid.classList.add('hidden'));
  btnCloseAndroidBtn.addEventListener('click', () => modalAndroid.classList.add('hidden'));

  // Close modals on backdrop click
  [modalTx, modalAndroid].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Print Report Button
  document.getElementById('btnPrintReport').addEventListener('click', () => {
    window.print();
  });

  // Reset Data to Default
  document.getElementById('btnResetData').addEventListener('click', () => {
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

  // Filter Listeners
  document.getElementById('searchSiswaInput').addEventListener('input', renderStudents);
  document.getElementById('filterStatusSiswa').addEventListener('change', renderStudents);
  document.getElementById('searchMutasiInput').addEventListener('input', renderTransactions);
  document.getElementById('filterTipeMutasi').addEventListener('change', renderTransactions);
  document.getElementById('filterKategoriMutasi').addEventListener('change', renderTransactions);
}

// ==========================================================================
// 9. PWA & Service Worker Registration
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

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Terima kasih telah memasang KAS-TKJ1!', 'success');
      }
      deferredPrompt = null;
      pwaBanner.classList.add('hidden');
    });
  }

  if (btnDismiss) {
    btnDismiss.addEventListener('click', () => {
      pwaBanner.classList.add('hidden');
    });
  }
}

// ==========================================================================
// 10. Toast Notification & Helpers
// ==========================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
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
// 11. App Bootstrapper
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderDashboard();
  renderStudents();
  renderTransactions();
  renderCategoryBreakdown();
  setupFormHandler();
  setupNavigationAndModals();
  setupPWA();
});
