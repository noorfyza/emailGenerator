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

    readFileAndGetPattern(companyName: string): string {
        const fs = require('fs');
        var response:any;
        fs.readFile('./assets/sampleEmails.json', 'utf8', (err: any,data: any) => {
            if(err){
                console.error(err);
                return;
            }
        
            const jsonData = JSON.parse(data);
            const inputString = companyName+'.com';
            console.log(inputString);

            var matchingPairs = Object.entries(jsonData).filter(([key, value]) => {
                console.log(`value is = ${value}`);
                console.log(`Keyy is = ${key}`);
                let val = String(value).split('@')[1];
                return val === inputString;
            });
            response = matchingPairs.length>0 ? matchingPairs[0] : "null";
            console.log(`First response is :    ${response}`);
        });

        console.log(`Response is : ${response}`);
        return response;
    }

    generateEmailAddress(companyName: string, fullName: string): string | null {
        let [firstName, lastName] = fullName.split(' ');
        lastName ||= ' ';
        const normalizedCompanyName = companyName.replace(/\s/g, '').toLowerCase();
        const findPattern = this.readFileAndGetPattern(companyName)

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