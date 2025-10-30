# Software Design Document (SDD) - SIAP

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini menjelaskan desain arsitektur dan teknis dari Sistem Informasi dan Aplikasi Pendidikan (SIAP). Dokumen ini dimaksudkan untuk membimbing tim pengembang dalam implementasi sistem.

### 1.2 Lingkup
Dokumen ini mencakup desain arsitektur sistem, desain database, desain antarmuka pengguna, dan komponen teknis lainnya dari aplikasi SIAP.

### 1.3 Definisi, Akronim, dan Singkatan
- **SDD**: Software Design Document
- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **MVC**: Model-View-Controller
- **UI**: User Interface
- **UX**: User Experience

### 1.4 Referensi
- SRS: [SRS.md](./SRS.md)
- Database Schema: [schema.sql](../database/schema.sql)
- ERD: [erd.md](../database/erd.md)

## 2. Gambaran Umum Arsitektur

### 2.1 Arsitektur Sistem
SIAP mengikuti arsitektur client-server dengan pola desain MVC:

```
+----------------+        HTTP/REST        +----------------+
|   Frontend     | <---------------------> |    Backend     |
|  (React/Vite)  |                         | (Node.js/Express)|
+----------------+                         +----------------+
                                                    |
                                                    | Database
                                                    v
                                            +----------------+
                                            |   MySQL        |
                                            +----------------+
```

### 2.2 Komponen Sistem
1. **Frontend**: Antarmuka pengguna berbasis React dengan Vite
2. **Backend**: API server berbasis Node.js dengan Express
3. **Database**: MySQL untuk penyimpanan data

### 2.3 Teknologi yang Digunakan
- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express.js, JWT, Multer
- **Database**: MySQL
- **Autentikasi**: JSON Web Tokens (JWT)
- **File Handling**: Multer, file-saver
- **Import/Export**: XLSX

## 3. Desain Arsitektur Terperinci

### 3.1 Arsitektur Backend

#### 3.1.1 Struktur Direktori
```
backend/
├── server.js              # Entry point aplikasi
├── config/                # Konfigurasi database
├── controllers/           # Logika bisnis
├── routes/                # Routing API
├── middleware/            # Middleware autentikasi
├── models/                # Model data (jika menggunakan ORM)
└── utils/                 # Fungsi utilitas
```

#### 3.1.2 Pola Desain
Backend mengikuti pola desain MVC:
- **Model**: Representasi data dari tabel database
- **View**: Tidak digunakan secara langsung (API-only)
- **Controller**: Logika bisnis dan pemrosesan data

#### 3.1.3 Modul Aplikasi
1. **Modul Autentikasi**
   - Login/logout pengguna
   - Validasi token JWT
   - Otorisasi berdasarkan peran

2. **Modul Data Guru**
   - CRUD operasi untuk data guru
   - Impor/ekspor Excel
   - Validasi data

3. **Modul Data Siswa**
   - CRUD operasi untuk data siswa
   - Manajemen dokumen siswa
   - Impor/ekspor Excel

4. **Modul Administrasi**
   - Manajemen dokumen administrasi
   - Manajemen notula rapat
   - Upload file

### 3.2 Arsitektur Frontend

#### 3.2.1 Struktur Direktori
```
frontend/
├── src/
│   ├── main.jsx           # Entry point React
│   ├── App.jsx            # Komponen utama
│   ├── layouts/           # Layout aplikasi
│   ├── components/        # Komponen UI
│   ├── views/             # Halaman aplikasi
│   ├── services/          # Service API
│   └── assets/            # Asset statis
└── vite.config.js         # Konfigurasi Vite
```

#### 3.2.2 Pola Desain
Frontend mengikuti pola komponen React:
- **Komponen Reusable**: Komponen UI yang dapat digunakan kembali
- **State Management**: Manajemen state lokal dengan React hooks
- **Routing**: Navigasi antar halaman dengan React Router

#### 3.2.3 Struktur Navigasi
```
App
├── AuthLayout
│   └── Login
└── MainLayout
    ├── Header
    ├── Sidebar
    └── Routes
        ├── Dashboard
        ├── Teachers
        │   ├── TeacherList
        │   └── TeacherForm
        ├── Students
        │   ├── StudentList
        │   ├── StudentForm
        │   └── StudentDocuments
        └── Administrative
            ├── AdministrativeList
            ├── AdministrativeForm
            ├── MeetingList
            └── MeetingForm
```

## 4. Desain Database

### 4.1 Diagram Entity Relationship
Lihat [erd.md](../database/erd.md) untuk diagram lengkap.

### 4.2 Deskripsi Tabel

#### 4.2.1 Tabel USERS
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INT (PK) | ID unik pengguna |
| username | VARCHAR(50) | Nama pengguna |
| password | VARCHAR(255) | Password (hash) |
| email | VARCHAR(100) | Email pengguna |
| role | ENUM | Peran pengguna (admin, wali_kelas, guru) |
| created_at | TIMESTAMP | Waktu pembuatan |
| updated_at | TIMESTAMP | Waktu pembaruan |

#### 4.2.2 Tabel TEACHERS
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INT (PK) | ID unik guru |
| user_id | INT (FK) | Referensi ke tabel USERS |
| teacher_id | VARCHAR(20) | ID guru |
| full_name | VARCHAR(100) | Nama lengkap |
| gender | ENUM | Jenis kelamin |
| place_of_birth | VARCHAR(50) | Tempat lahir |
| date_of_birth | DATE | Tanggal lahir |
| religion | VARCHAR(20) | Agama |
| education | VARCHAR(50) | Pendidikan |
| npwp | VARCHAR(30) | Nomor NPWP |
| phone | VARCHAR(15) | Nomor telepon |
| address | TEXT | Alamat |
| photo | VARCHAR(255) | Path foto |
| created_at | TIMESTAMP | Waktu pembuatan |
| updated_at | TIMESTAMP | Waktu pembaruan |

#### 4.2.3 Tabel STUDENTS
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INT (PK) | ID unik siswa |
| student_id | VARCHAR(20) | ID siswa |
| full_name | VARCHAR(100) | Nama lengkap |
| gender | ENUM | Jenis kelamin |
| place_of_birth | VARCHAR(50) | Tempat lahir |
| date_of_birth | DATE | Tanggal lahir |
| religion | VARCHAR(20) | Agama |
| class | VARCHAR(10) | Kelas |
| parent_name | VARCHAR(100) | Nama orang tua |
| parent_phone | VARCHAR(15) | Telepon orang tua |
| address | TEXT | Alamat |
| photo | VARCHAR(255) | Path foto |
| created_at | TIMESTAMP | Waktu pembuatan |
| updated_at | TIMESTAMP | Waktu pembaruan |

#### 4.2.4 Tabel STUDENT_DOCUMENTS
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INT (PK) | ID unik dokumen |
| student_id | INT (FK) | Referensi ke tabel STUDENTS |
| document_type | ENUM | Jenis dokumen |
| file_path | VARCHAR(255) | Path file |
| file_name | VARCHAR(255) | Nama file |
| uploaded_at | TIMESTAMP | Waktu upload |

#### 4.2.5 Tabel ADMINISTRATIVE_DOCUMENTS
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INT (PK) | ID unik dokumen |
| document_type | ENUM | Jenis dokumen (surat_masuk, surat_keluar) |
| title | VARCHAR(255) | Judul dokumen |
| description | TEXT | Deskripsi |
| file_path | VARCHAR(255) | Path file |
| file_name | VARCHAR(255) | Nama file |
| status | ENUM | Status dokumen |
| document_date | DATE | Tanggal dokumen |
| created_at | TIMESTAMP | Waktu pembuatan |
| updated_at | TIMESTAMP | Waktu pembaruan |

#### 4.2.6 Tabel MEETING_MINUTES
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INT (PK) | ID unik notula |
| meeting_title | VARCHAR(255) | Judul rapat |
| meeting_date | DATE | Tanggal rapat |
| participants | TEXT | Peserta rapat |
| agenda | TEXT | Agenda rapat |
| minutes | TEXT | Notula rapat |
| file_path | VARCHAR(255) | Path file |
| file_name | VARCHAR(255) | Nama file |
| created_at | TIMESTAMP | Waktu pembuatan |
| updated_at | TIMESTAMP | Waktu pembaruan |

## 5. Desain Antarmuka Pengguna

### 5.1 Wireframe Utama

#### 5.1.1 Halaman Login
```
+---------------------------------------------------+
|                 SIAP - Login                      |
|                                                   |
|  +---------------------------------------------+  |
|  | Username: [_______________________________] |  |
|  |                                             |  |
|  | Password: [_______________________________] |  |
|  |                                             |  |
|  |         [          Login           ]        |  |
|  +---------------------------------------------+  |
|                                                   |
|  Default Credentials:                             |
|  Admin: admin / password                          |
|  Wali Kelas: walikelas / password                 |
|  Guru: guru1 / password                           |
+---------------------------------------------------+
```

#### 5.1.2 Dashboard
```
+---------------------------------------------------+
| Header: [Menu] SIAP                    [User][▼]  |
|                                                   |
|  +---------+  +---------+  +---------+  +--------+ |
|  |Total    |  |Total    |  |Surat    |  |Surat   | |
|  |Guru     |  |Siswa    |  |Masuk    |  |Keluar  | |
|  |   24    |  |   420   |  |   15    |  |   8    | |
|  +---------+  +---------+  +---------+  +--------+ |
|                                                   |
|  Recent Activity:                                 |
|  • Data guru baru ditambahkan                     |
|  • Surat masuk diterima                           |
|  • Notula rapat disimpan                          |
|                                                   |
|  System Information:                              |
|  • Version: 1.0.0                                 |
|  • Status: Online                                 |
|  • Last Update: 25 Oktober 2023                   |
+---------------------------------------------------+
```

#### 5.1.3 Daftar Data Guru
```
+---------------------------------------------------+
| Header: [Menu] SIAP                    [User][▼]  |
|                                                   |
|  Data Guru                           [Export][+]  |
|  [Cari guru_________________________]              |
|                                                   |
|  +------+-------------+------+----------+------+  |
|  |ID    |Nama         |Jenis |Pendidikan|No. HP|  |
|  |Guru  |Lengkap      |Kelamin|          |      |  |
|  +------+-------------+------+----------+------+  |
|  |GR001 |Budi Santoso |Laki- |S1 Pendid.|081234|  |
|  |      |             |laki  |          |56789 |  |
|  +------+-------------+------+----------+------+  |
|  |Actions: [Edit] [Hapus]                        |  |
|  +-----------------------------------------------+  |
+---------------------------------------------------+
```

### 5.2 Komponen UI

#### 5.2.1 Header
- Logo dan nama aplikasi
- Menu toggle untuk mobile
- Informasi pengguna dan tombol logout

#### 5.2.2 Sidebar
- Navigasi menu berdasarkan peran pengguna
- Highlight halaman aktif
- Responsive untuk mobile

#### 5.2.3 Form Elements
- Input fields dengan validasi
- Select dropdown untuk pilihan
- Date picker untuk tanggal
- File upload untuk dokumen

#### 5.2.4 Tables
- Pagination untuk data yang banyak
- Sorting berdasarkan kolom
- Search/filter functionality

## 6. Desain API

### 6.1 Endpoint Autentikasi
| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/auth/login` | POST | Login pengguna |
| `/api/auth/profile` | GET | Mendapatkan profil pengguna |

### 6.2 Endpoint Data Guru
| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/teachers` | GET | Mendapatkan semua data guru |
| `/api/teachers/:id` | GET | Mendapatkan data guru berdasarkan ID |
| `/api/teachers` | POST | Menambah data guru baru |
| `/api/teachers/:id` | PUT | Mengupdate data guru |
| `/api/teachers/:id` | DELETE | Menghapus data guru |
| `/api/teachers/export/excel` | GET | Export data guru ke Excel |
| `/api/teachers/import/excel` | POST | Import data guru dari Excel |

### 6.3 Endpoint Data Siswa
| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/students` | GET | Mendapatkan semua data siswa |
| `/api/students/:id` | GET | Mendapatkan data siswa berdasarkan ID |
| `/api/students` | POST | Menambah data siswa baru |
| `/api/students/:id` | PUT | Mengupdate data siswa |
| `/api/students/:id` | DELETE | Menghapus data siswa |
| `/api/students/:id/documents` | GET | Mendapatkan dokumen siswa |
| `/api/students/:id/documents` | POST | Upload dokumen siswa |
| `/api/students/documents/:id` | DELETE | Menghapus dokumen siswa |
| `/api/students/export/excel` | GET | Export data siswa ke Excel |
| `/api/students/import/excel` | POST | Import data siswa dari Excel |

### 6.4 Endpoint Administrasi
| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/administrative/documents` | GET | Mendapatkan semua dokumen administrasi |
| `/api/administrative/documents/:id` | GET | Mendapatkan dokumen administrasi berdasarkan ID |
| `/api/administrative/documents` | POST | Menambah dokumen administrasi baru |
| `/api/administrative/documents/:id` | PUT | Mengupdate dokumen administrasi |
| `/api/administrative/documents/:id` | DELETE | Menghapus dokumen administrasi |
| `/api/administrative/meetings` | GET | Mendapatkan semua notula rapat |
| `/api/administrative/meetings/:id` | GET | Mendapatkan notula rapat berdasarkan ID |
| `/api/administrative/meetings` | POST | Menambah notula rapat baru |
| `/api/administrative/meetings/:id` | PUT | Mengupdate notula rapat |
| `/api/administrative/meetings/:id` | DELETE | Menghapus notula rapat |

## 7. Manajemen Error

### 7.1 Kode Error HTTP
| Kode | Deskripsi |
|------|-----------|
| 200 | Sukses |
| 201 | Data berhasil dibuat |
| 400 | Bad Request - Validasi gagal |
| 401 | Unauthorized - Token tidak valid |
| 403 | Forbidden - Akses ditolak |
| 404 | Not Found - Data tidak ditemukan |
| 500 | Internal Server Error |

### 7.2 Format Response Error
```json
{
  "message": "Deskripsi error",
  "error": "Kode error (opsional)",
  "details": "Detail error (opsional)"
}
```

## 8. Security Design

### 8.1 Autentikasi
- JWT (JSON Web Tokens) untuk stateless authentication
- Password hashing dengan bcrypt
- Token expiration set 24 jam

### 8.2 Otorisasi
- Role-based access control (RBAC)
- Middleware untuk verifikasi peran
- Validasi akses per endpoint

### 8.3 Proteksi Data
- Validasi input di frontend dan backend
- Prepared statements untuk mencegah SQL injection
- File upload validation dan sanitasi

## 9. Performance Considerations

### 9.1 Optimasi Database
- Penggunaan index pada kolom yang sering dicari
- Query optimization untuk operasi yang kompleks
- Connection pooling untuk efisiensi koneksi

### 9.2 Caching
- Browser caching untuk asset statis
- API response caching untuk data yang jarang berubah

### 9.3 File Handling
- File size limits untuk upload
- Temporary file cleanup
- Efficient file storage structure

## 10. Deployment Architecture

### 10.1 Lingkungan
- Development: Local development environment
- Staging: Testing environment mirroring production
- Production: Live user environment

### 10.2 Scalability
- Horizontal scaling untuk frontend
- Database read replicas untuk query intensif
- Load balancing untuk traffic tinggi

### 10.3 Monitoring
- Application performance monitoring
- Database performance monitoring
- Error tracking and alerting