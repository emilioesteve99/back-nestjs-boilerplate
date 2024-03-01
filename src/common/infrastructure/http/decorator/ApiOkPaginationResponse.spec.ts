import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { Mock } from 'vitest';

import { ApiOkPaginationResponse } from './ApiOkPaginationResponse';
import { PaginationHttp } from '../model/PaginationHttp';

vi.mock('@nestjs/common', async () => {
  const nestJsCommon: object = await vi.importActual('@nestjs/common');
  const applyDecoratorsMock: Mock = vi.fn();

  return {
    ...nestJsCommon,
    applyDecorators: applyDecoratorsMock,
  };
});

vi.mock('@nestjs/swagger', async () => {
  const nestJsSwagger: object = await vi.importActual('@nestjs/swagger');
  const ApiExtraModelsMock: Mock = vi.fn();
  const ApiOkResponseMock: Mock = vi.fn();
  const getSchemaPathMock: Mock = vi.fn();

  return {
    ...nestJsSwagger,
    ApiExtraModels: ApiExtraModelsMock,
    ApiOkResponse: ApiOkResponseMock,
    getSchemaPath: getSchemaPathMock,
  };
});

class HttpModelTest {
  foo: any;
}

describe(ApiOkPaginationResponse.name, () => {
  describe('when called', () => {
    let apiOkPaginationResponseOptionsFixture: { description: string; type: Type };
    let apiExtraModelsMockReturnFixture: any;
    let getSchemaPathMockReturnFixture: string;
    let apiOkResponseMockOptionsFixture: ApiResponseOptions;
    let apiOkResponseMockReturnFixture: MethodDecorator & ClassDecorator;

    beforeAll(() => {
      apiOkPaginationResponseOptionsFixture = { description: 'description', type: HttpModelTest };
      apiExtraModelsMockReturnFixture = undefined;
      getSchemaPathMockReturnFixture = 'schemaPath';
      apiOkResponseMockOptionsFixture = {
        description: apiOkPaginationResponseOptionsFixture.description,
        schema: {
          allOf: [
            { $ref: getSchemaPathMockReturnFixture },
            {
              properties: {
                items: {
                  items: { $ref: getSchemaPathMockReturnFixture },
                  type: 'array',
                },
              },
            },
          ],
        },
      };
      apiOkResponseMockReturnFixture = () => undefined;

      (ApiExtraModels as Mock).mockReturnValueOnce(apiExtraModelsMockReturnFixture);
      (getSchemaPath as Mock)
        .mockReturnValueOnce(getSchemaPathMockReturnFixture)
        .mockReturnValueOnce(getSchemaPathMockReturnFixture);
      (ApiOkResponse as Mock).mockReturnValueOnce(apiOkResponseMockReturnFixture);

      ApiOkPaginationResponse(apiOkPaginationResponseOptionsFixture);
    });

    afterAll(() => {
      vi.clearAllMocks();
    });

    it('should call ApiExtraModels()', () => {
      expect(ApiExtraModels).toHaveBeenCalledOnce();
      expect(ApiExtraModels).toHaveBeenCalledWith(PaginationHttp, apiOkPaginationResponseOptionsFixture.type);
    });

    it('should call getSchemaPath()', () => {
      expect(getSchemaPath).toHaveBeenCalledTimes(2);
      expect(getSchemaPath).toHaveBeenNthCalledWith(1, PaginationHttp);
      expect(getSchemaPath).toHaveBeenNthCalledWith(2, apiOkPaginationResponseOptionsFixture.type);
    });

    it('should call ApiOkResponse()', () => {
      expect(ApiOkResponse).toHaveBeenCalledOnce();
      expect(ApiOkResponse).toHaveBeenCalledWith(apiOkResponseMockOptionsFixture);
    });

    it('should call applyDecorators()', () => {
      expect(applyDecorators).toHaveBeenCalledOnce();
      expect(applyDecorators).toHaveBeenCalledWith(apiExtraModelsMockReturnFixture, apiOkResponseMockReturnFixture);
    });
  });
});
