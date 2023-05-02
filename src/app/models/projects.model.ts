interface projectUser{
  _id?: string;
  name?: string;
  image?: string;
}
export class Project {
  constructor(
    public nameProject: string,
    public description?: string,
    public image?: string,
    public html?: string,
    public css?: string,
    public javaScript?: string,
    public _id?: string,
  ) {}
}
