import { Router } from 'express';
import {
  createUser,
  findUserById,
  findUserByName,
  updateUser,
  allUsers,
} from '../../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.get('/users', allUsers);
router.get('/users/:id', findUserById);
router.get('/user/:name', findUserByName);
router.patch('/users/:id', updateUser);

export default router;
