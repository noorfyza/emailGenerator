import { EmailGeneratorService } from './emailGeneratorService';


describe('EmailGeneratorService', () => {

    let emailGenerator;
    beforeEach(() => {
        emailGenerator = new EmailGeneratorService();
    });

    it('should generate email address based on config', () => {
        expect(emailGenerator.generateEmailAddress('babbel', 'John Doe')).toBe('jdoe@babbel.com');
        expect(emailGenerator.generateEmailAddress('google', 'Jane Smith')).toBe('smithjane@google.com');
        expect(emailGenerator.generateEmailAddress('example', 'Chris tale')).toBeNull();
    });

    it('should handle cases just with first name', () => {

        const emailGenerator = new EmailGeneratorService();

        expect(emailGenerator.generateEmailAddress('google', 'Tommy')).toBe('tommy@google.com');
    });
});