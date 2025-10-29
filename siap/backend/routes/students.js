const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentDocuments,
  uploadStudentDocument,
  deleteStudentDocument,
  exportStudents,
  importStudents
} = require('../controllers/studentsController');
const { authorizeRole } = require('../middleware/auth');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Get all students
router.get('/', authorizeRole('admin', 'wali_kelas', 'guru'), getAllStudents);

// Get student by ID
router.get('/:id', authorizeRole('admin', 'wali_kelas', 'guru'), getStudentById);

// Create new student
router.post('/', authorizeRole('admin', 'wali_kelas'), createStudent);

// Update student
router.put('/:id', authorizeRole('admin', 'wali_kelas'), updateStudent);

// Delete student
router.delete('/:id', authorizeRole('admin'), deleteStudent);

// Get student documents
router.get('/:studentId/documents', authorizeRole('admin', 'wali_kelas', 'guru'), getStudentDocuments);

// Upload student document
router.post('/:studentId/documents', authorizeRole('admin', 'wali_kelas'), upload.single('file'), uploadStudentDocument);

// Delete student document
router.delete('/documents/:documentId', authorizeRole('admin', 'wali_kelas'), deleteStudentDocument);

// Export students to Excel
router.get('/export/excel', authorizeRole('admin', 'wali_kelas', 'guru'), exportStudents);

// Import students from Excel
router.post('/import/excel', authorizeRole('admin', 'wali_kelas'), upload.single('file'), importStudents);

module.exports = router;