import { Request, Response } from 'express';
import { uid } from '../../../../src/common/middleware/uid.middleware';

describe('Uid Middleware Validation', () => {
  beforeEach(() => { });
  describe('uid middleware validation', () => {
    it('should return true if validation of CI is successfull', async () => {
      const mockRequest = <Request>{
        params: {},
        query: {},
        body: {},
        headers: {
          authorization: "Bearer test",
        }
      };

      const mockResponse = <Response>{};
      const next: Function = (() => { });

      uid(mockRequest, mockResponse, next);
    });
  });
});