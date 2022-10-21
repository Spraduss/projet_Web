import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService, UsersService],
  exports: [AssociationsService]
})
export class AssociationsModule {}
