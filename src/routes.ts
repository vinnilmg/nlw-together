import { Router } from 'express';
import { UserController } from './controller/UserController';
import { TagController } from './controller/TagController';
import { AutenticaUserController } from './controller/AutenticaUserController';
import { ComplimentController } from './controller/ComplimentController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { ensureAdmin } from './middleware/ensureAdmin';

const router = Router();

const userController = new UserController();
const tagController = new TagController();
const autenticaUserController = new AutenticaUserController();
const complimentController = new ComplimentController();

router.post('/user', userController.handle);
router.post('/login', autenticaUserController.handle);

router.use(ensureAuthenticated); // todas rotas abaixo
router.post('/tag', ensureAdmin, tagController.handle);
router.post('/compliment', complimentController.handle);
router.get('/user/compliments/send', userController.listUserSendCompliments);
router.get('/user/compliments/receive', userController.listUserReceiverCompliments);
router.get('/user', userController.listUsers);
router.get('/tag', tagController.listTags);


export { router };