import Team from '../team/team';

export default class Player {
    public name: string;
    public lastName: string;
    public team: Team;
    constructor(name: string, lastName: string, team: Team) {
        this.name = name;
        this.lastName = lastName;
        this.team = team;
    }
}
