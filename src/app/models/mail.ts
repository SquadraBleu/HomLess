export class Mail {
  constructor(
    public to: string,
    public message: {
        subject: string,
        html: string
    }
){}
}
