const db = require('../config/db');
const xlsx = require('xlsx');

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const [teachers] = await db.execute(`
      SELECT t.*, u.username, u.email 
      FROM teachers t 
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY t.full_name
    `);
    
    res.json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const [teachers] = await db.execute(`
      SELECT t.*, u.username, u.email 
      FROM teachers t 
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `, [id]);
    
    if (teachers.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    res.json({ teacher: teachers[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new teacher
const createTeacher = async (req, res) => {
  try {
    const {
      user_id,
      teacher_id,
      full_name,
      gender,
      place_of_birth,
      date_of_birth,
      religion,
      education,
      npwp,
      phone,
      address
    } = req.body;
    
    // Check if teacher_id already exists
    const [existing] = await db.execute(
      'SELECT id FROM teachers WHERE teacher_id = ?',
      [teacher_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Teacher ID already exists' });
    }
    
    // Insert new teacher
    const [result] = await db.execute(`
      INSERT INTO teachers (
        user_id, teacher_id, full_name, gender, place_of_birth, 
        date_of_birth, religion, education, npwp, phone, address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      user_id, teacher_id, full_name, gender, place_of_birth,
      date_of_birth, religion, education, npwp, phone, address
    ]);
    
    res.status(201).json({
      message: 'Teacher created successfully',
      teacherId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      teacher_id,
      full_name,
      gender,
      place_of_birth,
      date_of_birth,
      religion,
      education,
      npwp,
      phone,
      address
    } = req.body;
    
    // Check if teacher exists
    const [existing] = await db.execute('SELECT id FROM teachers WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    // Check if teacher_id already exists for another teacher
    const [duplicate] = await db.execute(
      'SELECT id FROM teachers WHERE teacher_id = ? AND id != ?',
      [teacher_id, id]
    );
    
    if (duplicate.length > 0) {
      return res.status(400).json({ message: 'Teacher ID already exists' });
    }
    
    // Update teacher
    await db.execute(`
      UPDATE teachers SET
        user_id = ?, teacher_id = ?, full_name = ?, gender = ?, place_of_birth = ?,
        date_of_birth = ?, religion = ?, education = ?, npwp = ?, phone = ?, address = ?
      WHERE id = ?
    `, [
      user_id, teacher_id, full_name, gender, place_of_birth,
      date_of_birth, religion, education, npwp, phone, address, id
    ]);
    
    res.json({ message: 'Teacher updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if teacher exists
    const [existing] = await db.execute('SELECT id FROM teachers WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    // Delete teacher
    await db.execute('DELETE FROM teachers WHERE id = ?', [id]);
    
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export teachers to Excel
const exportTeachers = async (req, res) => {
  try {
    const [teachers] = await db.execute(`
      SELECT 
        teacher_id,
        full_name,
        gender,
        place_of_birth,
        date_of_birth,
        religion,
        education,
        npwp,
        phone,
        address
      FROM teachers
      ORDER BY full_name
    `);
    
    // Create workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(teachers);
    
    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(wb, ws, 'Teachers');
    
    // Generate buffer
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    // Set headers for download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=teachers.xlsx');
    
    // Send file
    res.send(buf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Import teachers from Excel
const importTeachers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Read the Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const teachers = xlsx.utils.sheet_to_json(worksheet);
    
    // Process each teacher
    let successCount = 0;
    let errorCount = 0;
    
    for (const teacher of teachers) {
      try {
        // Check if teacher_id already exists
        const [existing] = await db.execute(
          'SELECT id FROM teachers WHERE teacher_id = ?',
          [teacher.teacher_id]
        );
        
        if (existing.length === 0) {
          // Insert new teacher
          await db.execute(`
            INSERT INTO teachers (
              teacher_id, full_name, gender, place_of_birth, 
              date_of_birth, religion, education, npwp, phone, address
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            teacher.teacher_id,
            teacher.full_name,
            teacher.gender,
            teacher.place_of_birth,
            teacher.date_of_birth,
            teacher.religion,
            teacher.education,
            teacher.npwp,
            teacher.phone,
            teacher.address
          ]);
          successCount++;
        } else {
          errorCount++;
        }
      } catch (err) {
        errorCount++;
        console.error('Error importing teacher:', err);
      }
    }
    
    res.json({
      message: `Import completed. ${successCount} teachers imported, ${errorCount} errors.`,
      successCount,
      errorCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  exportTeachers,
  importTeachers
};