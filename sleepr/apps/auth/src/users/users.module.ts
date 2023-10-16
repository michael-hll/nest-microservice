import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { User } from './entities/user.entity.ts/user.entity';
import { LoggerModule } from 'nestjs-pino/LoggerModule';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([User]),  
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
