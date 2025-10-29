const db = require('../config/db');
const fs = require('fs');

// Get all administrative documents
const getAllDocuments = async (req, res) => {
  try {
    const [documents] = await db.execute(`
      SELECT * FROM administrative_documents
      ORDER BY created_at DESC
    `);
    
    res.json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get document by ID
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [documents] = await db.execute('SELECT * FROM administrative_documents WHERE id = ?', [id]);
    
    if (documents.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    res.json({ document: documents[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new administrative document
const createDocument = async (req, res) => {
  try {
    const {
      document_type,
      title,
      description,
      document_date,
      status
    } = req.body;
    
    let filePath = null;
    let fileName = null;
    
    if (req.file) {
      filePath = req.file.path;
      fileName = req.file.originalname;
    }
    
    // Insert new document
    const [result] = await db.execute(`
      INSERT INTO administrative_documents (
        document_type, title, description, file_path, file_name, document_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      document_type, title, description, filePath, fileName, document_date, status || 'pending'
    ]);
    
    res.status(201).json({
      message: 'Document created successfully',
      documentId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update administrative document
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      document_type,
      title,
      description,
      document_date,
      status
    } = req.body;
    
    // Check if document exists
    const [existing] = await db.execute('SELECT id FROM administrative_documents WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    let filePath = null;
    let fileName = null;
    
    if (req.file) {
      filePath = req.file.path;
      fileName = req.file.originalname;
    }
    
    // Update document
    await db.execute(`
      UPDATE administrative_documents SET
        document_type = ?, title = ?, description = ?, document_date = ?, status = ?
        ${req.file ? ', file_path = ?, file_name = ?' : ''}
      WHERE id = ?
    `, req.file ? 
      [document_type, title, description, document_date, status, filePath, fileName, id] :
      [document_type, title, description, document_date, status, id]
    );
    
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete administrative document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get document info
    const [documents] = await db.execute(
      'SELECT file_path FROM administrative_documents WHERE id = ?',
      [id]
    );
    
    if (documents.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    const document = documents[0];
    
    // Delete file from filesystem
    if (document.file_path && fs.existsSync(document.file_path)) {
      fs.unlinkSync(document.file_path);
    }
    
    // Delete document from database
    await db.execute('DELETE FROM administrative_documents WHERE id = ?', [id]);
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all meeting minutes
const getAllMeetingMinutes = async (req, res) => {
  try {
    const [meetings] = await db.execute(`
      SELECT * FROM meeting_minutes
      ORDER BY meeting_date DESC
    `);
    
    res.json({ meetings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get meeting minute by ID
const getMeetingMinuteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [meetings] = await db.execute('SELECT * FROM meeting_minutes WHERE id = ?', [id]);
    
    if (meetings.length === 0) {
      return res.status(404).json({ message: 'Meeting minute not found' });
    }
    
    res.json({ meeting: meetings[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new meeting minute
const createMeetingMinute = async (req, res) => {
  try {
    const {
      meeting_title,
      meeting_date,
      participants,
      agenda,
      minutes
    } = req.body;
    
    let filePath = null;
    let fileName = null;
    
    if (req.file) {
      filePath = req.file.path;
      fileName = req.file.originalname;
    }
    
    // Insert new meeting minute
    const [result] = await db.execute(`
      INSERT INTO meeting_minutes (
        meeting_title, meeting_date, participants, agenda, minutes, file_path, file_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      meeting_title, meeting_date, participants, agenda, minutes, filePath, fileName
    ]);
    
    res.status(201).json({
      message: 'Meeting minute created successfully',
      meetingId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update meeting minute
const updateMeetingMinute = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      meeting_title,
      meeting_date,
      participants,
      agenda,
      minutes
    } = req.body;
    
    // Check if meeting minute exists
    const [existing] = await db.execute('SELECT id FROM meeting_minutes WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Meeting minute not found' });
    }
    
    let filePath = null;
    let fileName = null;
    
    if (req.file) {
      filePath = req.file.path;
      fileName = req.file.originalname;
    }
    
    // Update meeting minute
    await db.execute(`
      UPDATE meeting_minutes SET
        meeting_title = ?, meeting_date = ?, participants = ?, agenda = ?, minutes = ?
        ${req.file ? ', file_path = ?, file_name = ?' : ''}
      WHERE id = ?
    `, req.file ? 
      [meeting_title, meeting_date, participants, agenda, minutes, filePath, fileName, id] :
      [meeting_title, meeting_date, participants, agenda, minutes, id]
    );
    
    res.json({ message: 'Meeting minute updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete meeting minute
const deleteMeetingMinute = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get meeting minute info
    const [meetings] = await db.execute(
      'SELECT file_path FROM meeting_minutes WHERE id = ?',
      [id]
    );
    
    if (meetings.length === 0) {
      return res.status(404).json({ message: 'Meeting minute not found' });
    }
    
    const meeting = meetings[0];
    
    // Delete file from filesystem
    if (meeting.file_path && fs.existsSync(meeting.file_path)) {
      fs.unlinkSync(meeting.file_path);
    }
    
    // Delete meeting minute from database
    await db.execute('DELETE FROM meeting_minutes WHERE id = ?', [id]);
    
    res.json({ message: 'Meeting minute deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
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
};