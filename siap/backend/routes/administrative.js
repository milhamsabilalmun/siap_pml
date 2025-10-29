const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getAllMeetingMinutes,
  getMeetingMinuteById,
  createMeetingMinute,
  updateMeetingMinute,
  deleteMeetingMinute
} = require('../controllers/administrativeController');
const { authorizeRole } = require('../middleware/auth');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Administrative Documents Routes

// Get all documents
router.get('/documents', authorizeRole('admin', 'wali_kelas', 'guru'), getAllDocuments);

// Get document by ID
router.get('/documents/:id', authorizeRole('admin', 'wali_kelas', 'guru'), getDocumentById);

// Create new document
router.post('/documents', authorizeRole('admin', 'wali_kelas'), upload.single('file'), createDocument);

// Update document
router.put('/documents/:id', authorizeRole('admin', 'wali_kelas'), upload.single('file'), updateDocument);

// Delete document
router.delete('/documents/:id', authorizeRole('admin'), deleteDocument);

// Meeting Minutes Routes

// Get all meeting minutes
router.get('/meetings', authorizeRole('admin', 'wali_kelas', 'guru'), getAllMeetingMinutes);

// Get meeting minute by ID
router.get('/meetings/:id', authorizeRole('admin', 'wali_kelas', 'guru'), getMeetingMinuteById);

// Create new meeting minute
router.post('/meetings', authorizeRole('admin', 'wali_kelas'), upload.single('file'), createMeetingMinute);

// Update meeting minute
router.put('/meetings/:id', authorizeRole('admin', 'wali_kelas'), upload.single('file'), updateMeetingMinute);

// Delete meeting minute
router.delete('/meetings/:id', authorizeRole('admin'), deleteMeetingMinute);

module.exports = router;