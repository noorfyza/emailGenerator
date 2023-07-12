import { Request, Response } from 'express';
import { EmailGeneratorService } from '../services/emailGeneratorService';


export class EmailsController {
    private emailGen: EmailGeneratorService;

    constructor() {
        this.emailGen = new EmailGeneratorService();
    }

    public getEmailAddress(req: Request, res: Response): void {
        const companyName = req.query.companyName as string
        const fullName = req.query.fullName as string

        const emailAddress = this.emailGen.generateEmailAddress(companyName, fullName)
        if (emailAddress)
            res.json({ email: emailAddress });
        else
            res.status(400).json('Company pattern not found')
    }
}
