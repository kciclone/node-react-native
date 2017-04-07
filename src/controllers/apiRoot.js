import express from 'express';
import { getApiVersion } from '../services/versionService';

const router = express.Router();
const apiVersion = getApiVersion();

router.get('/api/', (req, res) => {
    res.json({ apiVersion });
});

export default router;