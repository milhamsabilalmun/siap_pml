# SIAP - Sistem Informasi dan Aplikasi Pendidikan

SIAP adalah aplikasi berbasis web untuk manajemen data pendidikan yang mencakup data guru, data siswa, dan administrasi sekolah.

## Fitur Utama

### Autentikasi Pengguna
- **Admin**: Akses penuh ke semua fitur
- **Wali Kelas**: Akses untuk melihat, mengedit, dan menambah data
- **Guru**: Akses untuk melihat, mengedit, dan menambah data

### Modul Data Guru
- Manajemen data pokok keguruan
- Import dan export data dalam format Excel
- CRUD (Create, Read, Update, Delete) data guru

### Modul Data Siswa
- Manajemen data siswa
- Upload dokumen penting:
  - Akta kelahiran
  - Ijazah
  - Kartu keluarga (KK)
  - KTP orang tua
  - Kartu-kartu lainnya
- Preview dokumen
- Import dan export data dalam format Excel

### Modul Administrasi
- Manajemen surat masuk dan keluar
- Inventaris surat
- Notula rapat
- Pengajuan penerbitan surat dengan upload dokumen pendukung

## Teknologi yang Digunakan

### Backend
- Node.js dengan Express.js
- MySQL untuk database
- JSON Web Tokens (JWT) untuk autentikasi
- Multer untuk upload file
- XLSX untuk import/export Excel

### Frontend
- React dengan Vite
- React Router untuk navigasi
- CSS modular untuk styling
- Axios untuk HTTP requests

## Struktur Database

![ERD](database/erd.png)

Rincian tabel database:
- `users`: Manajemen pengguna dan autentikasi
- `teachers`: Data guru
- `students`: Data siswa
- `student_documents`: Dokumen siswa
- `administrative_documents`: Dokumen administrasi
- `meeting_minutes`: Notula rapat

## Instalasi

### Prerequisites
- Node.js >= 14.x
- MySQL >= 5.7
- npm atau yarn

### Setup Database
1. Buat database MySQL dengan nama `siap_db`
2. Jalankan script SQL dari file `database/schema.sql`

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Sesuaikan konfigurasi database di file .env
npm run dev
```

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## Penggunaan

### Akun Default
- **Admin**: username: `admin`, password: `password`
- **Wali Kelas**: username: `walikelas`, password: `password`
- **Guru**: username: `guru1`, password: `password`

### Menjalankan Aplikasi
1. Jalankan backend server: `cd backend && npm run dev`
2. Jalankan frontend: `cd frontend && npm run dev`
3. Buka browser di `http://localhost:3000`

## API Endpoints

### Autentikasi
- `POST /api/auth/login` - Login pengguna
- `GET /api/auth/profile` - Mendapatkan profil pengguna

### Data Guru
- `GET /api/teachers` - Mendapatkan semua data guru
- `GET /api/teachers/:id` - Mendapatkan data guru berdasarkan ID
- `POST /api/teachers` - Menambah data guru baru
- `PUT /api/teachers/:id` - Mengupdate data guru
- `DELETE /api/teachers/:id` - Menghapus data guru
- `GET /api/teachers/export/excel` - Export data guru ke Excel
- `POST /api/teachers/import/excel` - Import data guru dari Excel

### Data Siswa
- `GET /api/students` - Mendapatkan semua data siswa
- `GET /api/students/:id` - Mendapatkan data siswa berdasarkan ID
- `POST /api/students` - Menambah data siswa baru
- `PUT /api/students/:id` - Mengupdate data siswa
- `DELETE /api/students/:id` - Menghapus data siswa
- `GET /api/students/:id/documents` - Mendapatkan dokumen siswa
- `POST /api/students/:id/documents` - Upload dokumen siswa
- `DELETE /api/students/documents/:id` - Menghapus dokumen siswa
- `GET /api/students/export/excel` - Export data siswa ke Excel
- `POST /api/students/import/excel` - Import data siswa dari Excel

### Administrasi
- `GET /api/administrative/documents` - Mendapatkan semua dokumen administrasi
- `GET /api/administrative/documents/:id` - Mendapatkan dokumen administrasi berdasarkan ID
- `POST /api/administrative/documents` - Menambah dokumen administrasi baru
- `PUT /api/administrative/documents/:id` - Mengupdate dokumen administrasi
- `DELETE /api/administrative/documents/:id` - Menghapus dokumen administrasi
- `GET /api/administrative/meetings` - Mendapatkan semua notula rapat
- `GET /api/administrative/meetings/:id` - Mendapatkan notula rapat berdasarkan ID
- `POST /api/administrative/meetings` - Menambah notula rapat baru
- `PUT /api/administrative/meetings/:id` - Mengupdate notula rapat
- `DELETE /api/administrative/meetings/:id` - Menghapus notula rapat

## Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Project Link: [https://github.com/yourusername/siap](https://github.com/yourusername/siap)