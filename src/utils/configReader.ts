import { readFile } from 'fs/promises';

export class ConfigReader {
    readonly CONFIG_FILE_PATH = '../assets/sampleEmails.json'
    private fileContent;
    private configJSON;
    constructor() {
        this.fileContent = readFile(this.CONFIG_FILE_PATH, 'utf-8')
        this.configJSON = JSON.parse(this.fileContent)
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