import { Controller, Get, Param } from '@nestjs/common';
import {SchemaListQuery, SchemaListResponse} from '../types';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
    constructor(private readonly schemaService: SchemaService) {
    }

    @Get('list')
    async getSchemaList(@Param() query: SchemaListQuery): Promise<SchemaListResponse> {
       const [err, data] = await this.schemaService.getSchemaList();
       if (!err) {
            return data;
       } else {
           throw err;
       }
    }
}
