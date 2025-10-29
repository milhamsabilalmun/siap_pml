const db = require('../config/db');
const xlsx = require('xlsx');
const fs = require('fs');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const [students] = await db.execute(`
      SELECT * FROM students
      ORDER BY full_name
    `);
    
    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [students] = await db.execute('SELECT * FROM students WHERE id = ?', [id]);
    
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ student: students[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    const {
      student_id,
      full_name,
      gender,
      place_of_birth,
      date_of_birth,
      religion,
      class: studentClass,
      parent_name,
      parent_phone,
      address
    } = req.body;
    
    // Check if student_id already exists
    const [existing] = await db.execute(
      'SELECT id FROM students WHERE student_id = ?',
      [student_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }
    
    // Insert new student
    const [result] = await db.execute(`
      INSERT INTO students (
        student_id, full_name, gender, place_of_birth, 
        date_of_birth, religion, class, parent_name, parent_phone, address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      student_id, full_name, gender, place_of_birth,
      date_of_birth, religion, studentClass, parent_name, parent_phone, address
    ]);
    
    res.status(201).json({
      message: 'Student created successfully',
      studentId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_id,
      full_name,
      gender,
      place_of_birth,
      date_of_birth,
      religion,
      class: studentClass,
      parent_name,
      parent_phone,
      address
    } = req.body;
    
    // Check if student exists
    const [existing] = await db.execute('SELECT id FROM students WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if student_id already exists for another student
    const [duplicate] = await db.execute(
      'SELECT id FROM students WHERE student_id = ? AND id != ?',
      [student_id, id]
    );
    
    if (duplicate.length > 0) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }
    
    // Update student
    await db.execute(`
      UPDATE students SET
        student_id = ?, full_name = ?, gender = ?, place_of_birth = ?,
        date_of_birth = ?, religion = ?, class = ?, parent_name = ?, 
        parent_phone = ?, address = ?
      WHERE id = ?
    `, [
      student_id, full_name, gender, place_of_birth,
      date_of_birth, religion, studentClass, parent_name, 
      parent_phone, address, id
    ]);
    
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if student exists
    const [existing] = await db.execute('SELECT id FROM students WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Delete student documents first
    const [documents] = await db.execute('SELECT file_path FROM student_documents WHERE student_id = ?', [id]);
    
    // Delete files from filesystem
    for (const doc of documents) {
      if (doc.file_path && fs.existsSync(doc.file_path)) {
        fs.unlinkSync(doc.file_path);
      }
    }
    
    // Delete documents from database
    await db.execute('DELETE FROM student_documents WHERE student_id = ?', [id]);
    
    // Delete student
    await db.execute('DELETE FROM students WHERE id = ?', [id]);
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get student documents
const getStudentDocuments = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Check if student exists
    const [students] = await db.execute('SELECT id FROM students WHERE id = ?', [studentId]);
    
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const [documents] = await db.execute(
      'SELECT * FROM student_documents WHERE student_id = ?',
      [studentId]
    );
    
    res.json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Upload student document
const uploadStudentDocument = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { documentType } = req.body;
    
    // Check if student exists
    const [students] = await db.execute('SELECT id FROM students WHERE id = ?', [studentId]);
    
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Insert document record
    const [result] = await db.execute(`
      INSERT INTO student_documents (student_id, document_type, file_path, file_name)
      VALUES (?, ?, ?, ?)
    `, [studentId, documentType, req.file.path, req.file.originalname]);
    
    res.status(201).json({
      message: 'Document uploaded successfully',
      documentId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete student document
const deleteStudentDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    
    // Get document info
    const [documents] = await db.execute(
      'SELECT file_path FROM student_documents WHERE id = ?',
      [documentId]
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
    await db.execute('DELETE FROM student_documents WHERE id = ?', [documentId]);
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export students to Excel
const exportStudents = async (req, res) => {
  try {
    const [students] = await db.execute(`
      SELECT 
        student_id,
        full_name,
        gender,
        place_of_birth,
        date_of_birth,
        religion,
        class,
        parent_name,
        parent_phone,
        address
      FROM students
      ORDER BY full_name
    `);
    
    // Create workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(students);
    
    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(wb, ws, 'Students');
    
    // Generate buffer
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    // Set headers for download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
    
    // Send file
    res.send(buf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Import students from Excel
const importStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Read the Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const students = xlsx.utils.sheet_to_json(worksheet);
    
    // Process each student
    let successCount = 0;
    let errorCount = 0;
    
    for (const student of students) {
      try {
        // Check if student_id already exists
        const [existing] = await db.execute(
          'SELECT id FROM students WHERE student_id = ?',
          [student.student_id]
        );
        
        if (existing.length === 0) {
          // Insert new student
          await db.execute(`
            INSERT INTO students (
              student_id, full_name, gender, place_of_birth, 
              date_of_birth, religion, class, parent_name, parent_phone, address
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            student.student_id,
            student.full_name,
            student.gender,
            student.place_of_birth,
            student.date_of_birth,
            student.religion,
            student.class,
            student.parent_name,
            student.parent_phone,
            student.address
          ]);
          successCount++;
        } else {
          errorCount++;
        }
      } catch (err) {
        errorCount++;
        console.error('Error importing student:', err);
      }
    }
    
    res.json({
      message: `Import completed. ${successCount} students imported, ${errorCount} errors.`,
      successCount,
      errorCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
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
};