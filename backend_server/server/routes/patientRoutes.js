const express = require('express');
const multer = require('multer');
const path = require('path');
const patientController = require('../controllers/patientController');
const protect = require('../middleware/auth');

const router = express.Router();

// Multer config for profile pics
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'uploads'));
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname) || '.jpg';
		const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
		cb(null, `${Date.now()}_${base}${ext}`);
	}
});
const upload = multer({ storage });

router.use(protect); // Apply authentication middleware to all patient routes
router.get('/', patientController.getAllPatients);
router.post('/', upload.single('profilePic'), patientController.addPatient);
router.get('/:id', patientController.getPatientById);
router.patch('/:id', upload.single('profilePic'), patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;