import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import 'dotenv/config';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
