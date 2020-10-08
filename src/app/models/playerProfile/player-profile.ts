export class PlayerProfile {
    fullName: string;
    team: string;
    gamesPlayed: string;
    minutesPerGame: string;
    pointsPerGame: string;
    assistsPerGame: string;
    photoURL: string;
    constructor(fullName: string, team: string, gamesPlayed: string, minutesPerGame: string,
                pointsPerGame: string, assistsPerGame: string, photoURL: string) {
        this.fullName = fullName;
        this.team = team;
        this.gamesPlayed = gamesPlayed;
        this.minutesPerGame = minutesPerGame;
        this.pointsPerGame = pointsPerGame;
        this.assistsPerGame = assistsPerGame;
        this.photoURL = photoURL;
    }
}
