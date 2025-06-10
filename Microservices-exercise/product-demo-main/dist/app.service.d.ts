import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private readonly client;
    constructor(client: ClientProxy);
    getHello(): string;
    createProduct(createProductDto: any): Promise<{
        message: string;
        data: any;
    }>;
    getProductById(id: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: any;
    }>;
}
