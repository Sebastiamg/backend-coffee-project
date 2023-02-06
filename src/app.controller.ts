import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly servico1: AppService) {}

  @Get()
  Saludar() {
    return this.servico1.Saludar();
  }

  @Post()
  crearItem() {
    return this.servico1.creatItem();
  }

  @Put(':id')
  putItem(@Param('id') id: number) {
    return this.servico1.putItem(id);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.servico1.deleteItem(id);
  }
}
