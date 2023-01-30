import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from '../dto/product-dto/product-dto';
import { ProductEntity } from './product.entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepositoy: Repository<ProductEntity>,
  ) {}
  // get all products
  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepositoy.find();
  }

  // create one product
  async createProduct(product: ProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepositoy.create(product);
    return await this.productRepositoy.save(newProduct);
  }

  // update one producto
  async updateProduct(
    id: number,
    producto: ProductDto,
  ): Promise<ProductEntity> {
    const findProduct = await this.productRepositoy.findOne({ where: { id } });
    findProduct.name = producto.name;
    findProduct.category = producto.category;
    findProduct.description = producto.description;
    findProduct.price = producto.price;
    findProduct.image = producto.image;

    return this.productRepositoy.save(findProduct);
  }

  // delete product
  async deleteProduct(id: number) {
    return await this.productRepositoy.delete(id);
  }
}
