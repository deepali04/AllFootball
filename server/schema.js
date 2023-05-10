const { gql } = require("apollo-server");

const typeDefs = gql`

  type User
  {
    _id: ID!
    username: String!
    password: String
    dob: String
    phone: String
    email: String!
    country: String
    profilePic: String
    bio: String
    isPremium: Boolean
    coins: Int
    followingTeamID : [String]
    followingPlayerID: [String]
  }

  type League {
    id: Int!
    leagueName: String
    logo: String
    countryName: String
  }

  type SingleLeague {
    id: Int!
    leagueName: String
    logo: String
    countryName: String
  }

  type PlayersForFixture {
    id: Int!
    playerName: String
    jerseyNumber: Int
    position: String
  }

  type TeamsForFixture {
    id: Int!
    teamName: String
    logo: String
  }

  type TableStandings {
    rank: Int
    teamName: String
    logo: String
    points: Int
    matchesPlayed: Int
    matchesWon: Int
    matchesLost: Int
    matchesDraw: Int
    homeMatches: Int
    awayMatches: Int
    goalsScored: Int
    goalsConceded: Int
    teamId: Int
  }

  type FixtureByDate {
    id: Int!
    matchDate: Date
    matchTime: String
    matchTimeZone: String
    homeTeamName: String
    homeTeamID: String
    homeTeamLogo: String
    awayTeamName: String
    awayTeamID: String
    awayTeamLogo: String
  }
 
  type LeagueTopScorer {
    playerID: Int!
    playerName: String
    playerImage: String
    teamName: String
    teamLogo: String
    goals: Int  
  }

  type LeagueTopAssists {
    playerID: Int!
    playerName: String
    playerImage: String
    teamName: String
    teamLogo: String
    assists: Int 
  }

  type PlayerByID {
    playerID: Int!
    playerName: String
    firstName: String
    lastName: String
    age: Int
    Nationality: String
    playerImage: String
    playerHeight: String
    playerWeight: String
    playerPosition: String
    playerRating: String
    teamName: String
    leagueName: String
    season: String
    appearances: Int
    lineUps: Int
    goals: Int
    assists: Int
    penaltyScored: Int
    penaltyMissed: Int  
    yellowCard: Int
    redCard: Int 
  }

  type TeamManager {
    managerID: Int!
    managerName: String
    firstName: String
    lastName: String
    age: Int
    Nationality: String
    managerImage: String
    teamName: String
    teamLogo: String
    startDate: String   
  }

  type FixtureLineUps {
    team1: TeamsForFixture
    team2: TeamsForFixture
    managerID: Int
    managerName: String
    managerImage: String
    formation: String
    startElevenTeam1: [PlayersForFixture]
    startElevenTeam2: [PlayersForFixture]
    substitutesTeam1: [PlayersForFixture]
    substitutesTeam2: [PlayersForFixture]
  }

  type TeamInfo {
    teamID : Int
    teamName: String
    teamLogo: String
    founded: Int
    teamCode: String
    countryName: String
    venueName: String
    address: String
    city: String
    capacity: Int
    venueImage: String
  }

  type searchedPlayers {
    playerID: Int!
    playerName: String
    nationality: String
  }

  type Game {
    _id: String!
    fixtureID: Int!
    userID: String
    awayTeam: Int
    homeTeam: Int
    betField: Int
    result: Int
  }


  type FollowedPlayers {
    playerId: Int
    playerName: String
    playerImage: String
  }

  type FollowedTeams {
    teamId: Int
  }

   scalar Date

  type Query {
    LeagueInformation: [League]
    SingleLeagueInformation(id: Int!): SingleLeague
    TopLeaguesInformation: [League]
    StandingInformation(league: Int!, season: Int!): [TableStandings]
    FixtureByDateInformation(matchDate: Date!) : [FixtureByDate]
    TopScorerByLeague(league: Int!, season: Int!): [LeagueTopScorer]
    TopAssistsByLeague(league: Int!, season: Int!): [LeagueTopAssists]
    ManagerInformation(team: Int!) : TeamManager 
    GetPlayerByID(playerId: Int!, season: Int!) : PlayerByID 
    SearchPlayerByName(playerName: String!) : [searchedPlayers]
    getGameByfixtureId(fixtureID:Int!): Game
    getGameById(GameID:Int!):Game
    getGameByUserId(id:String!):[Game]
    TeamInformation(teamID: Int!): TeamInfo
    GetUserById(id: ID!): User
    GetAllUsers: [User] 
    GetFollowedPlayersInfo(userId: String) : [FollowedPlayers]
    GetFollowedTeamsInfo(userId: String) : [FollowedTeams]
  }

  type Mutation {
    createGame(fixtureID:Int!, userID:String!, awayTeam: Int!, homeTeam: Int!, betField: Int!): Game
    updateGame(gameID:String! ): User 
    CreateUser(username:String!,password:String!, dob:String, phone:String, email:String!, country:String, profilePic:String, bio:String, isPremium:Boolean): User
    Login(username:String!,password:String!): User
    DeleteUser(id: ID!): [User]
    AddTeamFollowing(userId:ID!,teamID: ID!) : User
    AddPlayerFollowing(userId:ID!,PlayerID: ID!) : User
    DeleteTeamFollowing(userId:ID!,teamID: ID!) : User
    DeletePlayerFollowing(userId:ID!,PlayerID: ID!) : User
  }

`;

module.exports = typeDefs;
