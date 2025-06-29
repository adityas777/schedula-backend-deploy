import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(cfg: ConfigService, private authService: AuthService) {
    super({
      clientID: cfg.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: cfg.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: cfg.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    try {
      const user = await this.authService.googleLogin({ ...profile, role: req.query.role });
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
