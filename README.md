# Company Email Generator

Pre-requisites:
- node v18 or higher

### Setup

1. Run `npm i` to install the dependencies
2. cd to /src & run: `npx ts-node server.ts`

### Usage

GET: localhost:3000/email?companyName={param1}&fullName={param2}

response format (JSON): `{email: string}`

### Example

Req: localhost:3000/email?companyName=google&fullName=noor%20faiza
Res: `{"email":"faizanoor@google.com"}`

**Note:** Currently supports known patterns present in emailGeneratorService's emailPatterns object

### TODO

read the file and contruct patterns object dynamically based on set rules of string variations.
