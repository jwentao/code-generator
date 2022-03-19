import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { DeployService } from "./deploy.service";
import { JsonSchema } from "../schemas/jsonSchema";

@Controller('deploy')
export class DeployController {
    constructor(private readonly deployService: DeployService) {}


    @Get('/create')
    async create(): Promise<string> {
        try {
            await this.deployService.create();
            return 'success';
        } catch (e) {
            throw new HttpException('插入异常', 401);
        }
    }

    @Get('/findAll')
    async findAll(): Promise<{ total: number, list: JsonSchema[] }> {
        try {
            return await this.deployService.findAll();
        } catch (e) {
            throw e;
        }
    }

    @Post('/find')
    async find(@Body() body: { id: string }): Promise<JsonSchema[]> {
        return await this.deployService.find({ id: body.id });
    }

    @Post('/updateRouter')
    async updateRouter(@Body() body) {
        const [err, data] = await this.deployService.updateRouter(body);
        if (err) {
            return err.message;
        } else {
            return data;
        }
    }
}
