import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.get('/google', 
  passport.authenticate('google', { 
    session: false, 
    scope: ['profile', 'email']
  })
);


router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign(
                { id: user.id.toString(), email: user.email }, 
                process.env.JWT_SECRET!, 
                { expiresIn: '24h' }
            );
    // ⚠️ REINDIRIZZAMENTO AL FRONTEND
    // Non restituiamo JSON qui, perché siamo nel browser. 
    // Facciamo un redirect fisico al tuo sito React passando il token nell'URL.
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/google-success?token=${token}`);
  }
);

export default router;