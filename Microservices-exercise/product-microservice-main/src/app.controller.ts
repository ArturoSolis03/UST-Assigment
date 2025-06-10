import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto } from './product.dto';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ role: 'product', cmd: 'create' })
  async createProduct(data: CreateProductDto) {
    return this.appService.createProduct(data);
  }

  @MessagePattern({ role: 'product', cmd: 'get-by-id' })
  async getById(id: number) {
    return this.appService.getProductById(id);
  }
}
