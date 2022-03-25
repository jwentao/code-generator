import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { DeployService } from "./deploy.service";
import { JsonSchema } from "../schemas/jsonSchema";
import {CreateDeployRequest, CreateDeployResponse} from '../types';

@Controller('deploy')
export class DeployController {
    constructor(private readonly deployService: DeployService) {}


    @Post('/create')
    async create(@Body() body: CreateDeployRequest): Promise<CreateDeployResponse> {
        const [err, data] = await this.deployService.create( body );
        if (!err) {
            return data;
        } else {
            throw err;
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
