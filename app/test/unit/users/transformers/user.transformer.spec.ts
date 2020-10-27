import { mockUser } from '../../../../test/mock-user';
import { Document } from '../../../../src/entity/Document';
import { User } from '../../../../src/entity/User';
import { UserTransformer } from '../../../../src/users/transformers/user.transformer';

describe('UserTransformer', () => {
  let userTransformer: UserTransformer;

  beforeEach(() => {
    userTransformer = new UserTransformer();
  });
  describe('User transformer validation', () => {
    it('should return user transformed', async () => {
      const expectedResult = mockUser.userResponseOldVersionTrasnform[0];
      const userAndDocument = mockUser.userAndDocumentWithAdditionalInfo[0];
      const user = new User();
      Object.assign(user, userAndDocument.userReturned);
      const document = new Document();
      Object.assign(document, userAndDocument.documentReturned);
      const response = userTransformer.transformUserAndDocument({ userReturned: user, documentReturned: document }, "test", "test");
      expect(response).toEqual(expectedResult);
    });
  });
});