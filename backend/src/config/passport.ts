import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);
        let email = null;
        if (profile.emails?.[0] && profile.emails?.[0].value) {
          email = profile.emails?.[0].value;
        } else {
          return done(new Error("Google non ha trovato l'email"), undefined);
        }

        let user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (user) {
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id },
            });
          }

          return done(null, user);
        } else {
          return done(new Error("l'utente deve prima registrarsi"));
        }
      } catch (error) {
        console.error(error);
        return done(error, undefined);
      }
    },
  ),
);

export default passport;
