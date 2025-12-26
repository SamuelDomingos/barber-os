import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BarbershopModule } from './modules/barbershop/barbershop.module';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [AuthModule, BarbershopModule, UsersModule, ServicesModule],
})
export class AppModule {}
