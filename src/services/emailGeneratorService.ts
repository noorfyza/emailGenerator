// import { ConfigReader } from "../utils/configReader";

export class EmailGeneratorService {
    // configReader: ConfigReader
    emailPatterns: { [key: string]: string } = {
        babbel: '{firstNameChar}{lastName}@babbel.com',
        linkedin: '{firstName}{lastName}@linkedin.com',
        google: '{lastName}{firstName}@google.com',
        amazon: '{lastName}{firstNameChar}@amazon.com',
    }

    constructor() {
        // this.configReader = new ConfigReader();
    }

    generateEmailAddress(companyName: string, fullName: string): string | null {
        const [firstName, lastName] = fullName.split(' ');

        const normalizedCompanyName = companyName.replace(/\s/g, '').toLowerCase();

        if (this.emailPatterns.hasOwnProperty(normalizedCompanyName)) {
            const emailPattern = this.emailPatterns[normalizedCompanyName];
            const emailAddress = emailPattern
                .replace('{firstNameChar}', firstName[0].toLowerCase())
                .replace('{lastNameChar}', lastName[0].toLowerCase())
                .replace('{firstName}', firstName.toLowerCase())
                .replace('{lastName}', lastName.toLowerCase());

            return emailAddress;
        }

        return null;
    }
}