import { AppService } from './app.service';
import { CreateProductDto } from './product.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createProduct(data: CreateProductDto): Promise<CreateProductDto & import("./product-entity").ProductEntity>;
    getById(id: number): Promise<import("./product-entity").ProductEntity | null>;
}
