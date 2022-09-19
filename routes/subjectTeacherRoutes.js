const express = require('express');

const router = express.Router();

const subjectTeacherController = require('../controllers/subjectTeacherController');

router.get('/', subjectTeacherController.getAllSubjectTeachers);
router.get('/:id', subjectTeacherController.getSubjectTeacherById);
router.post('/', subjectTeacherController.createSubjectTeacher);
router.put('/:id', subjectTeacherController.updateSubjectTeacher);
router.delete('/:id', subjectTeacherController.deleteSubjectTeacher);

module.exports = router;
