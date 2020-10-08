export default class Team {
    public id: number;
    public name: string;
    public abbreviation: string;
    public location: string;
    constructor(id: number, name: string, abbreviation: string, location: string) {
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
        this.location = location;
    }
}
