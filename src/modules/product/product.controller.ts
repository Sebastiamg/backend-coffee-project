import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ProductDto } from '../dto/product-dto/product-dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //GET ALL ITEMS
  @Get()
  getAllItems(@Res() httpResponse) {
    return this.productService
      .getProducts()
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse
          .status(httpResponse.FORBIDDEN)
          .json({ message: 'Error: getAllItems' });
      });
  }

  //CREATE ONE ITEM
  @Post()
  createItem(@Body() item: ProductDto, @Res() httpResponse) {
    return this.productService
      .createProduct(item)
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse
          .status(httpResponse.FORBIDDEN)
          .json({ message: 'Error: createItem' });
      });
  }

  //EDIT ITEM
  @Put(':id')
  updateItem(
    @Param('id') id: number,
    @Body() item: ProductDto,
    @Res() httpResponse,
  ) {
    return this.productService
      .updateProduct(id, item)
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse
          .status(httpResponse.FORBIDDEN)
          .json({ message: 'Error: createItem' });
      });
  }

  // DELETE ITEM
  @Delete(':id')
  deleteItem(@Param('id') id: number, @Res() httpResponse) {
    return this.productService
      .deleteProduct(id)
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse
          .status(httpResponse.FORBIDDEN)
          .json({ message: 'Error: createItem' });
      });
  }
}
