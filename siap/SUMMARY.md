# SIAP - Sistem Informasi dan Aplikasi Pendidikan
## Struktur Aplikasi

### 1. Database
- **Lokasi**: `/database`
- **File Utama**: `schema.sql` (struktur database MySQL)
- **ERD**: `erd.md` (diagram hubungan entitas)

### 2. Backend (Node.js + Express)
- **Lokasi**: `/backend`
- **Struktur**:
  - `server.js` - Entry point aplikasi
  - `config/` - Konfigurasi database
  - `controllers/` - Logika bisnis
  - `routes/` - Routing API
  - `middleware/` - Middleware autentikasi
  - `package.json` - Dependensi backend

#### Fitur Backend:
- RESTful API
- Autentikasi JWT
- Upload file
- Import/Export Excel
- Validasi data

### 3. Frontend (React + Vite)
- **Lokasi**: `/frontend`
- **Struktur**:
  - `src/main.jsx` - Entry point React
  - `src/App.jsx` - Komponen utama
  - `src/layouts/` - Layout aplikasi
  - `src/components/` - Komponen UI
  - `src/views/` - Halaman aplikasi
  - `src/services/` - Service API
  - `src/assets/` - Asset statis
  - `package.json` - Dependensi frontend

#### Fitur Frontend:
- Responsive design
- Routing client-side
- State management
- Form handling
- File preview

### 4. Modul Aplikasi

#### A. Autentikasi
- Login dengan 3 level pengguna:
  - Admin (full akses)
  - Wali Kelas (lihat, edit, tambah)
  - Guru (lihat, edit, tambah)

#### B. Data Guru
- **CRUD** data guru
- **Import/Export** Excel
- Data pokok keguruan:
  - ID Guru
  - Nama lengkap
  - Jenis kelamin
  - Tempat, tanggal lahir
  - Agama
  - Pendidikan
  - NPWP
  - No. HP
  - Alamat

#### C. Data Siswa
- **CRUD** data siswa
- **Import/Export** Excel
- **Upload dokumen**:
  - Akta kelahiran
  - Ijazah
  - Kartu keluarga
  - KTP orang tua
  - Kartu lainnya
- **Preview dokumen**

#### D. Administrasi
- **Surat masuk/keluar**
- **Notula rapat**
- **Inventaris dokumen**
- **Upload file pendukung**

### 5. Teknologi Utama
- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: React, Vite
- **Autentikasi**: JWT
- **File handling**: Multer, file-saver
- **Import/Export**: XLSX
- **Styling**: CSS modular

### 6. Instalasi
1. Setup database MySQL
2. Install dependensi backend: `cd backend && npm install`
3. Install dependensi frontend: `cd frontend && npm install`
4. Jalankan backend: `cd backend && npm run dev`
5. Jalankan frontend: `cd frontend && npm run dev`

### 7. Penggunaan
- Akses aplikasi di `http://localhost:3000`
- Gunakan akun default:
  - Admin: admin / password
  - Wali Kelas: walikelas / password
  - Guru: guru1 / password