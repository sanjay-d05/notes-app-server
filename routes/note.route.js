import express from 'express';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import { createNote, deleteNote, getNotes, getNotesById, updateNote } from '../controllers/note.controller.js';

const router = express.Router();

router.post('/',isAuthenticated,createNote);

router.get('/',isAuthenticated,getNotes);
router.get('/:id',isAuthenticated,getNotesById);

router.put('/:id',isAuthenticated,updateNote);

router.delete('/:id',isAuthenticated,deleteNote);


export default router;