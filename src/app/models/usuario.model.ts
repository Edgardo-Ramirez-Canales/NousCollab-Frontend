export class Usuario {
  constructor(
    public name: string,
    public email: string,
    public image?: string,
    public role?: string,
    public isActives?: string,
    public availableProjects?: number,
    public _id?:string,
  ) {}
}
