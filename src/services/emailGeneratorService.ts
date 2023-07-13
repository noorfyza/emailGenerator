import { ConfigReader } from "../utils/configReader";

export class EmailGeneratorService {
    private configReader: ConfigReader
    private emailConfig: { [key: string]: string }

    private emailPatterns: { [key: string]: string } = {}

    constructor() {
        this.configReader = new ConfigReader();
        this.emailConfig = this.configReader.getConfig()
        this.buildEmailPatternsFromConfig()
        console.log(this.emailPatterns)
    }

    private buildEmailPatternsFromConfig() {
        Object.entries(this.emailConfig)
            .forEach(([fullName, emailAddress]) => {
                const isValidEmailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)

                if (isValidEmailAddress) {
                    const [domain, emailPattern] = this.determinePatternFrom(fullName, emailAddress)
                    const companyName = domain.split('.')[0]
                    this.emailPatterns[companyName] = emailPattern + '@' + domain
                }
                else {
                    throw new Error(`the email address ${emailAddress} is invalid`)
                }

            })
    }

    generateEmailAddress(companyName: string, fullName: string): string | null {
        const [firstName = '', lastName = ''] = fullName.split(' ');

        const normalizedCompanyName = companyName.replace(/\s/g, '').toLowerCase();

        if (this.emailPatterns.hasOwnProperty(normalizedCompanyName)) {
            const emailPattern = this.emailPatterns[normalizedCompanyName];
            const emailAddress = emailPattern
                .replace('{firstNameChar}', firstName[0]?.toLowerCase() || '')
                .replace('{lastNameChar}', lastName[0]?.toLowerCase() || '')
                .replace('{firstName}', firstName.toLowerCase())
                .replace('{lastName}', lastName.toLowerCase() || '');

            return emailAddress;
        }

        return null;
    }

    private determinePatternFrom(fullName: string, emailAddress: string): [string, string] {

        const [firstName = '', lastName = ''] = fullName.split(' ')
        const [firstNameChar, lastNameChar] = [firstName[0], lastName[0]]
        let [address = '', domain = ''] = emailAddress.split('@')
        let emailPattern = address.toLowerCase().replace(firstName.toLowerCase(), '{firstName}')
        if (lastName)
            emailPattern = emailPattern.replace(lastName.toLowerCase(), '{lastName}')

        const partitionedEmailPattern = emailPattern.match(/\{*[^{}]+\}*/g)

        partitionedEmailPattern?.forEach((subPattern, index) => {
            partitionedEmailPattern[index] =
                subPattern.startsWith('{') ?
                    subPattern :
                    this.replaceInitialWithPattern(subPattern, firstNameChar, lastNameChar)
        })


        return [domain, partitionedEmailPattern?.join('') || ''];
    }

    private replaceInitialWithPattern(subString: string, firstNameChar: string, lastNameChar: string): string {
        if (firstNameChar.toLowerCase() == subString)
            return '{firstNameChar}'
        else if (lastNameChar.toLowerCase() == subString)
            return '{lastNameChar}'
        else
            return subString
    }
}
