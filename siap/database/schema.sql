-- SIAP Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS siap_db;
USE siap_db;

-- Users table (for authentication)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role ENUM('admin', 'wali_kelas', 'guru') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    teacher_id VARCHAR(20) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    gender ENUM('Laki-laki', 'Perempuan'),
    place_of_birth VARCHAR(50),
    date_of_birth DATE,
    religion VARCHAR(20),
    education VARCHAR(50),
    npwp VARCHAR(30),
    phone VARCHAR(15),
    address TEXT,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    gender ENUM('Laki-laki', 'Perempuan'),
    place_of_birth VARCHAR(50),
    date_of_birth DATE,
    religion VARCHAR(20),
    class VARCHAR(10),
    parent_name VARCHAR(100),
    parent_phone VARCHAR(15),
    address TEXT,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student documents table
CREATE TABLE student_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    document_type ENUM('akta_kelahiran', 'ijazah', 'kk', 'ktp_orang_tua', 'kartu_lain') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Administrative documents table
CREATE TABLE administrative_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_type ENUM('surat_masuk', 'surat_keluar') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(255),
    file_name VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    document_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Meeting minutes table
CREATE TABLE meeting_minutes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    meeting_date DATE NOT NULL,
    participants TEXT,
    agenda TEXT,
    minutes TEXT,
    file_path VARCHAR(255),
    file_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (username, password, email, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@siap.edu', 'admin'),
('walikelas', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'wali@siap.edu', 'wali_kelas'),
('guru1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'guru1@siap.edu', 'guru');

-- Insert sample teacher
INSERT INTO teachers (user_id, teacher_id, full_name, gender, place_of_birth, date_of_birth, religion, education, phone, address) VALUES
(3, 'GR001', 'Budi Santoso', 'Laki-laki', 'Jakarta', '1985-05-15', 'Islam', 'S1 Pendidikan', '08123456789', 'Jl. Merdeka No. 123');