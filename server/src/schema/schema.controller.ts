import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';
import { SchemaListQuery, SchemaListResponse, CreateSchemaRequest } from '../types';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
    constructor(private readonly schemaService: SchemaService) {
    }

    @Post('list')
    @HttpCode(200)
    async getSchemaList(@Body() body: SchemaListQuery): Promise<SchemaListResponse> {
       const [err, data] = await this.schemaService.getSchemaList();
       if (!err) {
            return data;
       } else {
           throw err;
       }
    }

    @Post('create')
    @HttpCode(200)
    async createSchema(@Body() body: CreateSchemaRequest): Promise<string> {
       const [err, data] = await this.schemaService.createSchema(body);
       if (!err) {
            return data;
       } else {
           throw err;
       }
    }
}
