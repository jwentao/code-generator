import { JsonSchemaDocument } from '../schemas/jsonSchema';

export interface SchemaListQuery {
    pageSize?: number,
    pageNum?: number
}

export interface SchemaListResponse {
    total: number,
    list: JsonSchemaDocument[]
}

export interface CreateSchemaRequest {
    config: object
}
