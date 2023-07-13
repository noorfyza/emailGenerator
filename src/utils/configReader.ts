import { readFile } from 'fs/promises';

export class ConfigReader {
    readonly CONFIG_FILE_PATH = '../assets/sampleEmails.json'
    // private fileContent;
    private configJSON: { [key: string]: string } = {}
    constructor() {
        this.configJSON = require(this.CONFIG_FILE_PATH)
    }

    getConfig(): { [key: string]: string } {
        return this.generateEntriesUniqueByDomain(this.configJSON)
    }

    private generateEntriesUniqueByDomain(config: { [key: string]: string }) {
        const emailsWithUnqiueDomain: string[] = []
        const filteredConfig: { [key: string]: string } = {}

        Object.entries(config).forEach(([fullName, email]) => {
            const [_id, domain] = email.split('@')

            if (!emailsWithUnqiueDomain.includes(domain)) {
                emailsWithUnqiueDomain.push(email)
                filteredConfig[fullName] = email
            }
        })

        return filteredConfig
    }
}