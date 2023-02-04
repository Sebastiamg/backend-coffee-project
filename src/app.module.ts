import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './modules/auth/auth.controller';
import { RegisterEntity } from './modules/auth/entities/register.entity/register.entity';
import { AuthService } from './modules/auth/auth.service';
import { ProductService } from './modules/product/product.service';
import { ProductController } from './modules/product/product.controller';
import { ProductEntity } from './modules/product/product.entity/product.entity';
import { ProfileEntity } from './modules/auth/entities/profile.entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'diosSteve',
      database: 'prueba3Coffee',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RegisterEntity, ProductEntity, ProfileEntity]),
  ],
  controllers: [AppController, AuthController, ProductController],
  providers: [AppService, AuthService, ProductService],
})
export class AppModule {}
