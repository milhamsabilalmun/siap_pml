# Software Requirements Specification (SRS) - SIAP

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini menjelaskan spesifikasi kebutuhan perangkat lunak untuk Sistem Informasi dan Aplikasi Pendidikan (SIAP), sebuah aplikasi berbasis web yang dirancang untuk membantu lembaga pendidikan dalam mengelola data guru, data siswa, dan administrasi.

### 1.2 Lingkup
SIAP adalah sistem manajemen informasi pendidikan yang mencakup:
- Manajemen data guru
- Manajemen data siswa dengan fasilitas unggah dokumen
- Sistem administrasi surat dan notula rapat
- Kontrol akses berbasis peran (admin, wali kelas, guru)

### 1.3 Definisi, Akronim, dan Singkatan
- **SIAP**: Sistem Informasi dan Aplikasi Pendidikan
- **SRS**: Software Requirements Specification
- **ERD**: Entity Relationship Diagram
- **SDD**: Software Design Document
- **MVP**: Minimum Viable Product

### 1.4 Referensi
- Database Schema: [schema.sql](../database/schema.sql)
- Entity Relationship Diagram: [erd.md](../database/erd.md)

### 1.5 Gambaran Umum
Dokumen ini dibagi menjadi beberapa bagian utama:
- Deskripsi keseluruhan sistem
- Kebutuhan spesifik fungsi dan non-fungsi
- Karakteristik pengguna
- Batasan dan ketergantungan

## 2. Deskripsi Umum

### 2.1 Perspektif Produk
SIAP adalah aplikasi web yang menyediakan solusi terintegrasi untuk manajemen informasi pendidikan. Sistem ini dirancang untuk digunakan oleh administrator sekolah, wali kelas, dan guru.

### 2.2 Fungsi Produk
1. **Autentikasi dan Otorisasi**
   - Login pengguna dengan tiga level akses
   - Manajemen sesi pengguna

2. **Manajemen Data Guru**
   - CRUD (Create, Read, Update, Delete) data guru
   - Impor dan ekspor data dalam format Excel
   - Penyimpanan informasi lengkap kepegawaian

3. **Manajemen Data Siswa**
   - CRUD data siswa
   - Unggah dan kelola dokumen siswa
   - Impor dan ekspor data dalam format Excel

4. **Sistem Administrasi**
   - Manajemen surat masuk dan keluar
   - Pembuatan dan penyimpanan notula rapat
   - Inventaris dokumen administrasi

### 2.3 Karakteristik Pengguna
| Peran | Deskripsi | Hak Akses |
|-------|-----------|-----------|
| Admin | Administrator sistem | Akses penuh ke semua fitur |
| Wali Kelas | Guru yang bertanggung jawab atas kelas | Lihat, edit, dan tambah data |
| Guru | Pengajar mata pelajaran | Lihat, edit, dan tambah data |

### 2.4 Batasan
- Sistem hanya dapat diakses melalui browser web
- Memerlukan koneksi internet untuk berfungsi
- Kompatibel dengan browser modern (Chrome, Firefox, Safari, Edge)

### 2.5 Asumsi dan Ketergantungan
- Server database MySQL tersedia
- Lingkungan runtime Node.js telah terinstal
- Pengguna memiliki pengetahuan dasar penggunaan komputer

## 3. Kebutuhan Spesifik

### 3.1 Kebutuhan Fungsional

#### 3.1.1 Modul Autentikasi
**RF-001**: Sistem harus menyediakan fungsi login dengan username dan password
**RF-002**: Sistem harus memvalidasi kredensial pengguna
**RF-003**: Sistem harus mengarahkan pengguna ke dashboard sesuai peran
**RF-004**: Sistem harus menyediakan fungsi logout

#### 3.1.2 Modul Data Guru
**RF-005**: Sistem harus memungkinkan admin/wali kelas untuk menambah data guru baru
**RF-006**: Sistem harus memungkinkan pengguna untuk melihat daftar guru
**RF-007**: Sistem harus memungkinkan admin/wali kelas untuk mengedit data guru
**RF-008**: Sistem harus memungkinkan admin untuk menghapus data guru
**RF-009**: Sistem harus menyediakan fungsi impor data guru dari file Excel
**RF-010**: Sistem harus menyediakan fungsi ekspor data guru ke file Excel

#### 3.1.3 Modul Data Siswa
**RF-011**: Sistem harus memungkinkan admin/wali kelas untuk menambah data siswa baru
**RF-012**: Sistem harus memungkinkan pengguna untuk melihat daftar siswa
**RF-013**: Sistem harus memungkinkan admin/wali kelas untuk mengedit data siswa
**RF-014**: Sistem harus memungkinkan admin untuk menghapus data siswa
**RF-015**: Sistem harus memungkinkan pengguna untuk mengunggah dokumen siswa
**RF-016**: Sistem harus memungkinkan pengguna untuk melihat dokumen siswa
**RF-017**: Sistem harus menyediakan fungsi impor data siswa dari file Excel
**RF-018**: Sistem harus menyediakan fungsi ekspor data siswa ke file Excel

#### 3.1.4 Modul Administrasi
**RF-019**: Sistem harus memungkinkan pengguna untuk menambah dokumen administrasi
**RF-020**: Sistem harus memungkinkan pengguna untuk melihat daftar dokumen administrasi
**RF-021**: Sistem harus memungkinkan admin/wali kelas untuk mengedit dokumen administrasi
**RF-022**: Sistem harus memungkinkan admin untuk menghapus dokumen administrasi
**RF-023**: Sistem harus memungkinkan pengguna untuk menambah notula rapat
**RF-024**: Sistem harus memungkinkan pengguna untuk melihat daftar notula rapat
**RF-025**: Sistem harus memungkinkan admin/wali kelas untuk mengedit notula rapat
**RF-026**: Sistem harus memungkinkan admin untuk menghapus notula rapat

### 3.2 Kebutuhan Non-Fungsional

#### 3.2.1 Kebutuhan Kinerja
**NFR-001**: Sistem harus merespons permintaan pengguna dalam waktu maksimal 3 detik
**NFR-002**: Sistem harus mendukung minimal 100 pengguna simultan

#### 3.2.2 Kebutuhan Keamanan
**NFR-003**: Sistem harus menyimpan password dalam bentuk hash
**NFR-004**: Sistem harus menggunakan token JWT untuk autentikasi
**NFR-005**: Sistem harus memvalidasi input pengguna untuk mencegah SQL injection

#### 3.2.3 Kebutuhan Keandalan
**NFR-006**: Sistem harus memiliki uptime minimal 99%
**NFR-007**: Sistem harus menyediakan mekanisme backup data

#### 3.2.4 Kebutuhan Kompatibilitas
**NFR-008**: Sistem harus kompatibel dengan browser modern
**NFR-009**: Sistem harus responsif dan dapat diakses dari perangkat mobile

## 4. Model Data

### 4.1 Diagram Entity Relationship
Lihat [erd.md](../database/erd.md) untuk diagram lengkap.

### 4.2 Deskripsi Tabel Database
Lihat [schema.sql](../database/schema.sql) untuk struktur tabel lengkap.

## 5. Antarmuka Pengguna

### 5.1 Diagram Alur Navigasi
Sistem menyediakan antarmuka berbasis web dengan navigasi menu yang intuitif sesuai peran pengguna.

### 5.2 Standar Desain
- Desain modern dengan tema warna biru
- Tata letak yang responsif
- Komponen UI yang konsisten

## 6. Kebutuhan Lainnya

### 6.1 Kebutuhan Sistem
- Server web dengan Node.js v14+
- Database MySQL v5.7+
- Browser modern

### 6.2 Kebutuhan Instalasi
- Node.js dan npm
- MySQL server
- Akses internet

### 6.3 Kebutuhan Pemeliharaan
- Backup database rutin
- Monitoring kinerja server
- Pembaruan keamanan berkala