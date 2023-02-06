import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Saludar() {
    return 'hola hola';
  }

  creatItem() {
    return 'ESTOY CREANDO UN PRODUCTO';
  }

  putItem(id: number) {
    return 'Actualizando Producto con ID: ' + id;
  }

  deleteItem(id: number) {
    return 'ID: ' + id;
  }
}
