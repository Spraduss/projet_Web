import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AssociationsService } from './associations.service';

@Module({
    providers: [AssociationsService],
    imports: [UsersModule]
})
export class AssociationsModule {}
