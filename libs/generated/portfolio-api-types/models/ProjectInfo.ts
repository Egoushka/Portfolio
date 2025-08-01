/**
 * Portfolio API
 * API for Portfolio application
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

export class ProjectInfo {
    'id'?: number;
    'title'?: string | null;
    'description'?: string | null;
    'technologies'?: Array<string> | null;
    'imageUrl'?: string | null;
    'liveUrl'?: string | null;
    'githubUrl'?: string | null;
    'createdDate'?: Date;
    'isFeatured'?: boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number",
            "format": "int32"
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string",
            "format": ""
        },
        {
            "name": "technologies",
            "baseName": "technologies",
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "imageUrl",
            "baseName": "imageUrl",
            "type": "string",
            "format": ""
        },
        {
            "name": "liveUrl",
            "baseName": "liveUrl",
            "type": "string",
            "format": ""
        },
        {
            "name": "githubUrl",
            "baseName": "githubUrl",
            "type": "string",
            "format": ""
        },
        {
            "name": "createdDate",
            "baseName": "createdDate",
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "isFeatured",
            "baseName": "isFeatured",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ProjectInfo.attributeTypeMap;
    }

    public constructor() {
    }
}
