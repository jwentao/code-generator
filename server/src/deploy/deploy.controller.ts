import { Controller, Get } from '@nestjs/common';
import { DeployService } from "./deploy.service";

@Controller('deploy')
export class DeployController {
    constructor(private readonly deployService: DeployService) {}


    @Get('/create')
    async create(): Promise<string> {
        await this.deployService.create();
        return 'success';
    }
}
