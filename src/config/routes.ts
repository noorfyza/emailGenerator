import express from 'express';
import { EmailsController } from '../controllers/emailsController';

const router = express.Router();
const emailsController = new EmailsController();

router.get('/email', emailsController.getEmailAddress.bind(emailsController));

export default router;