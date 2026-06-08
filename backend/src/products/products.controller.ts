import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(
    @Param('id') id: string
  ) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(
    @Body() data: CreateProductDto
  ) {
    return this.productsService.createProduct(data);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() data: CreateProductDto
  ) {
    return this.productsService.updateProduct(
      id,
      data
    );
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') id: string
  ) {
    return this.productsService.deleteProduct(id);
  }

}