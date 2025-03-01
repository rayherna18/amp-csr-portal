import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontendUrl = configService.get<string>('FRONTEND_URL');
  app.enableCors({
    origin: "*",
  });


  const dbUri = configService.get<string>('MONGODB_URI');
  const databaseName = 'test';

  mongoose.connect(`${dbUri}/${databaseName}`, { dbName: databaseName })
    .then(() => {
      console.log('✅ MongoDB Connected!');
    })
    .catch((err) => {
      console.error('❌ MongoDB Connection Error:', err);
    });

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
}
bootstrap();
