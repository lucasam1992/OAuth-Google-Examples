import { Router } from 'express';

const router = Router();

import { auth, authCallback } from '../controller/authController';

router.route("/google-auth").get(auth);
router.route(`/google-auth-callback`).get(authCallback);

export default router;