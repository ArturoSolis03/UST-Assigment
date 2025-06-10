import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getById(id: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: any;
    }>;
    create(createProductDto: any): Promise<{
        message: string;
        data: any;
    }>;
}
