import { JsonSchemaDocument } from '../schemas/jsonSchema';

export interface SchemaListQuery {
    pageSize?: number,
    pageNum?: number
}

export interface SchemaListResponse {
    total: number,
    list: SchemaListItem[]
}

export interface SchemaListItem {
    id: string,
    createUser: string,
    createTime: Date
}

export interface CreateSchemaRequest {
    config: object
}

export interface CreateAndDeploySchemaRequest extends CreateSchemaRequest {
    code: string,
    name: string
}

interface MANGO_TIMESTAMPS_TYPE {
    createTime: Date,
    updateTIme: Date
}
