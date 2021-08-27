import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get("JWT_SECRET"),
        signOptions: {expiresIn: "10000s"},
      })
    })
  ],
  providers: [AuthService, JWTStrategy, JWTAuthGuard],
  exports: [AuthService]
})
export class AuthModule {}
