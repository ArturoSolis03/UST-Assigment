import { Repository } from 'typeorm';
import { ProductEntity } from './product-entity';
import { CreateProductDto } from './product.dto';
export declare class AppService {
    private productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    getHello(): string;
    createProduct(productDto: CreateProductDto): Promise<CreateProductDto & ProductEntity>;
    getProductById(id: number): Promise<ProductEntity | null>;
}
