import { Request, Response } from 'express';
import { EmailGeneratorService } from '../services/emailGeneratorService';
import { EmailsController } from './emailsController';

describe('EmailsController', () => {
  let emailsController: EmailsController;
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    emailsController = new EmailsController();
    mockRequest = {
      query: {
        companyName: 'example',
        fullName: 'John Doe',
      },
    } as unknown as Request;
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  describe('getEmailAddress', () => {
    it('should generate and return an email address', () => {
      const mockGeneratedEmail = 'john.doe@example.com';
      jest
        .spyOn(EmailGeneratorService.prototype, 'generateEmailAddress')
        .mockReturnValue(mockGeneratedEmail);

      emailsController.getEmailAddress(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({ email: mockGeneratedEmail });
    });

    it('should handle a missing company pattern', () => {
      jest.spyOn(EmailGeneratorService.prototype, 'generateEmailAddress').mockReturnValue(null);

      emailsController.getEmailAddress(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith('Company pattern not found');
    });
  });
});
