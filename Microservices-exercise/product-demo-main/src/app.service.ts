import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCT_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createProduct(createProductDto: any) {
    try {
      const result = await firstValueFrom(
        this.client.send({ role: 'product', cmd: 'create' }, createProductDto),
      );

      return {
        message: 'Producto creado exitosamente',
        data: result,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto', error?.message);
    }
  }

  async getProductById(id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ role: 'product', cmd: 'get-by-id' }, id),
      );

      if (!result) {
        return { message: 'Producto no encontrado' };
      }

      return {
        message: 'Producto obtenido exitosamente',
        data: result,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el producto', error?.message);
    }
  }
}
