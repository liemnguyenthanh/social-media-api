import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

/**
 * A custom NestJS interceptor for serializing Mongoose documents into DTO.
 * @param classToIntercept The class to intercept and serialize.
 * @returns A custom interceptor class.
 */
export default function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    /**
     * Changes a plain object to an instance of the specified class.
     * @param document The plain object (Mongoose document).
     * @returns An instance of the specified class.
     */
    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }
      return plainToClass(classToIntercept, document.toJSON(), {
        excludePrefixes: ['__v']
      });
    }

    /**
     * Prepares the response for serialization.
     * @param response The response object to prepare.
     * @returns The prepared response object.
     */
    private prepareResponse(
      response:
        | PlainLiteralObject
        | PlainLiteralObject[]
        | { items: PlainLiteralObject[]; count: number },
    ) {
      if (!Array.isArray(response) && response?.items) {
        const items = this.prepareResponse(response.items);
        return {
          count: response.count,
          items,
        };
      }

      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(response);
    }

    /**
     * Serializes the response.
     * @param response The response object to serialize.
     * @param options The serialization options.
     * @returns The serialized response.
     */
    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}
