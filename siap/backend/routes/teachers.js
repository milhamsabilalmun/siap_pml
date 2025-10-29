const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  exportTeachers,
  importTeachers
} = require('../controllers/teachersController');
const { authorizeRole } = require('../middleware/auth');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Get all teachers
router.get('/', authorizeRole('admin', 'wali_kelas', 'guru'), getAllTeachers);

// Get teacher by ID
router.get('/:id', authorizeRole('admin', 'wali_kelas', 'guru'), getTeacherById);

// Create new teacher
router.post('/', authorizeRole('admin', 'wali_kelas'), createTeacher);

// Update teacher
router.put('/:id', authorizeRole('admin', 'wali_kelas'), updateTeacher);

// Delete teacher
router.delete('/:id', authorizeRole('admin'), deleteTeacher);

// Export teachers to Excel
router.get('/export/excel', authorizeRole('admin', 'wali_kelas', 'guru'), exportTeachers);

// Import teachers from Excel
router.post('/import/excel', authorizeRole('admin', 'wali_kelas'), upload.single('file'), importTeachers);

module.exports = router;