import { gql } from '@apollo/client';

const LOAD_LEAGUES = gql`   
    query LeagueInformation {
        LeagueInformation {
            id
            leagueName
            logo
            countryName
        }
    }
`;

const LOAD_LEAGUE_BY_ID = gql`   
    query SingleLeagueInformation($id: Int!) {
        SingleLeagueInformation(id: $id) {
            id
            leagueName
            logo
            countryName
        }
}
`;

const SEARCH_PLAYER_BY_NAME = gql`   
    query SearchPlayerByName( $playerName: String!) {
        SearchPlayerByName(playerName: $playerName) {
            playerID,
            playerName
            nationality
        
        } 
    }
`;

const LOAD_STANDINGS = gql`
    query StandingInformation($league: Int!, $season: Int!){
        StandingInformation(league: $league, season: $season) {
            rank,
            teamId,
            teamName,
            logo,
            points,
            matchesPlayed,
            matchesWon,
            matchesLost,
            matchesDraw,
            homeMatches,
            awayMatches,
            goalsScored,
            goalsConceded
        }
    }
`;

const LOAD_FIXTURES = gql`
    query FixtureByDateInformation($date: Date!){
        FixtureByDateInformation(matchDate: $date) {
            id,
            matchDate,
            matchTime,
            matchTimeZone,
            homeTeamName,
            homeTeamID,
            homeTeamLogo,
            awayTeamName,
            awayTeamID,
            awayTeamLogo,

        }
    }
`;

const LOAD_TOP_SCORER = gql`
    query TopScorerByLeague($league: Int!, $season: Int!){
        TopScorerByLeague(league: $league, season: $season) {
            playerID,
            playerName
            playerImage,
            teamName,
            teamLogo,
            goals
        }
    }
`;

const LOAD_TOP_ASSISTS = gql`
    query TopAssistsByLeague( $league: Int!, $season: Int!) {
        TopAssistsByLeague(league: $league, season: $season) {
            playerID
            playerName
            playerImage
            teamName
            teamLogo
            assists

        }
    }
`;


const LOAD_PLAYER_BY_ID_INFO = gql`
        query GetPlayerByID($playerId: Int!) {
            GetPlayerByID(playerId: $playerId,season:2022) {
                playerID
                playerName
                firstName
                lastName
                playerImage
                age
                Nationality
                playerHeight
                playerWeight
                playerPosition
                playerRating
                teamName
                leagueName
                season
                appearances
                lineUps
                goals
                assists
                penaltyScored
                penaltyMissed
                yellowCard
                redCard

            }
        }
`;

const LOAD_MANAGER_INFO = gql`
    query ManagerInformation($team: Int!){
        ManagerInformation(team: $team) {
            managerID,
            managerName,
            firstName,
            lastName,
            age,
            Nationality,
            managerImage,
            teamName,
            teamLogo,
            startDate,
        
        }
    }
`;

const LOAD_TEAM_INFO = gql`
query TeamInformation($teamID: Int!) {
    TeamInformation(teamID: $teamID) {
        teamID
        teamName
        teamLogo
        founded
        teamCode
        countryName
        venueName
        address
        city
        capacity
        venueImage      
    } 
}
`;

const LOAD_TOP_LEAGUES = gql`
    query TopLeaguesInformation {
        TopLeaguesInformation {
            id,
            leagueName,
            logo,
            countryName
        }
    }
`;


const LOAD_GAME_BY_ID = gql`
    query getGameById {
        getGameById {
            id,
            fixtureID,
            userID,
            awayTeam,
            homeTeam,
            betField,
            result
        }
    }
`;

const LOAD_GAME_BY_FIXTURE_ID = gql`
    query getGameByfixtureId {
        getGameByfixtureId {
            _id,
            fixtureID,
            userID,
            awayTeam,
            homeTeam,
            betField,
            result
        }
    }
`;

const CREATE_GAME = gql`
    mutation createGame($fixtureID:Int!, $userID:String!, $awayTeam: Int!, $homeTeam: Int!, $betField: Int!) {
        createGame(fixtureID: $fixtureID, userID: $userID, awayTeam:$awayTeam, homeTeam:$homeTeam, betField:$betField) {
            _id,
            fixtureID,
            userID,
            awayTeam,
            homeTeam,
            betField,
            result
        }
    }
`;
const UPDATE_GAME = gql`
    mutation updateGame($gameID:String! ) {
        updateGame(gameID:$gameID ){
            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID
        }
    }
`;

const LOAD_GAME_BY_USERID = gql`
    query getGameByUserId($id:String!) {
        getGameByUserId(id: $id) {
            _id,
            fixtureID,
            userID,
            awayTeam,
            homeTeam,
            betField,
            result
        }
    }
`;

const CREATE_USER = gql`
    mutation CreateUser (
        $username: String!,
        $password: String!,
        $dob: String,
        $phone: String,
        $email: String!, 
        $country: String,
        $profilePic: String,
        $bio: String,
        $isPremium: Boolean
    ) {
        CreateUser (
            username: $username,
            password: $password,
            dob: $dob,
            phone: $phone,
            email: $email, 
            country: $country,
            profilePic: $profilePic,
            bio: $bio,
            isPremium: $isPremium   
        ) {
            username
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
        }
    }
`;

const GET_ALL_USER = gql `
    query GetAllUsers{
        GetAllUsers{
            _id
            username
            email
        }
    }
`

const GET_USER_BY_ID = gql `
    query GetUserById ($id: ID!){
        GetUserById(id: $id){
            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID
        }
    }
`


const LOAD_FOLLOWED_PLAYERS = gql `
    query GetFollowedPlayersInfo($userId: String!) {
        GetFollowedPlayersInfo(userId: $userId){
            playerId
            playerName
            playerImage
        }
    }
`

const LOAD_FOLLOWED_TEAMS = gql `
    query GetFollowedTeamsInfo($userId: String!) {
        GetFollowedTeamsInfo(userId: $userId){
            teamId
        }
    }
`

const LOGIN = gql `
    mutation Login($username: String!, $password: String!){
        Login(username: $username, password: $password) {
            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID

        }
    }
`
const LOAD_PLAYER_FOLLOWING = gql`
mutation AddPlayerFollowing($userId:ID!,$PlayerID: ID!){
        AddPlayerFollowing(userId:$userId,PlayerID:$PlayerID){

            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID
        }

    }
`

const LOAD_TEAM_FOLLOWING = gql`
mutation AddTeamFollowing($userId:ID!,$teamID: ID!){
    AddTeamFollowing(userId:$userId,teamID:$teamID){

            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID
        }

    }
`
const LOAD_PLAYER_UNFOLLOWING = gql`
mutation DeletePlayerFollowing($userId:ID!,$PlayerID: ID!){
        DeletePlayerFollowing(userId:$userId,PlayerID:$PlayerID){

            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID
        }

    }
`

const LOAD_TEAM_UNFOLLOWING = gql`
mutation DeleteTeamFollowing($userId:ID!,$teamID: ID!){
    DeleteTeamFollowing(userId:$userId,teamID:$teamID){

            _id
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
            coins
            followingTeamID
            followingPlayerID
        }

    }
`



export default {
    LOAD_LEAGUES,
    LOAD_STANDINGS,
    LOAD_FIXTURES,
    LOAD_TOP_SCORER,
    LOAD_TOP_ASSISTS,
    LOAD_TOP_LEAGUES,
    LOAD_LEAGUE_BY_ID,
    LOAD_MANAGER_INFO,
    LOAD_GAME_BY_ID,
    LOAD_PLAYER_BY_ID_INFO,
    SEARCH_PLAYER_BY_NAME,
    LOAD_GAME_BY_USERID,
    LOAD_GAME_BY_FIXTURE_ID,
    CREATE_GAME,
    UPDATE_GAME,
    LOAD_TEAM_INFO,
    CREATE_USER,
    GET_ALL_USER,
    GET_USER_BY_ID,
    LOGIN,
    LOAD_PLAYER_FOLLOWING,
    LOAD_PLAYER_UNFOLLOWING,
    LOAD_FOLLOWED_PLAYERS,
    LOAD_FOLLOWED_TEAMS,
    LOAD_TEAM_FOLLOWING,
    LOAD_TEAM_UNFOLLOWING,
};