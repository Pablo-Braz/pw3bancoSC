import express from 'express';
import * as usuario from '../controllers/usuario.js';


const router = express.Router();

router.post('/usuario/login',usuario.login);
router.post('/usuario/logout',usuario.logout);

export default router;
