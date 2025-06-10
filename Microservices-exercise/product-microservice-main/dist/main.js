"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: { port: 3001 },
    });
    await app.startAllMicroservices();
    const logger = new common_1.Logger('Bootstrap');
    logger.log('✅ HTTP server on port 3000');
    logger.log('✅ Microservice TCP on port 3001');
}
bootstrap();
//# sourceMappingURL=main.js.map