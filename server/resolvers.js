const moment = require('moment');
const axios = require("axios");
// const redis = require("redis");
const uuid = require("uuid");
const { result } = require('lodash');
const data = require("./data");
const user = data.users;
const redis = require("redis");
const client = redis.createClient();

(async () => {
  await client.connect();
})();

const API_KEY = '3df39a1cbamsh63f95b9f20d493ep18c3d2jsnaa9a8f6d3181';
const API_HOST = 'api-football-v1.p.rapidapi.com';
const config = {
  headers:{
    'X-RapidAPI-Host' : API_HOST,
    'X-RapidAPI-Key' : API_KEY
  }
};

module.exports = { 
  Query: {
    LeagueInformation : async () => {
      //const desiredLeagues=['World', 'germany', 'england', 'france','spain', 'italy']
      let leagueList=[];           
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/leagues", config);

      data.response.forEach(league => {
        let singleLeague = {
          id : league.league.id,
          leagueName : league.league.name,
          logo :  league.league.logo,
          countryName : league.country.name
        } 
           
      leagueList.push(singleLeague);       
      });
      //console.log(leagueList.slice(0,7)); 
      // console.log(leagueList.slice(0,7)); 
      return leagueList;
    },

    SingleLeagueInformation : async (_, args) => {        
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/leagues?id=" + args.id, config);

      let finalData = data.response[0];

      let singleLeague = {
        id : finalData.league.id,
        leagueName : finalData.league.name,
        logo :  finalData.league.logo,
        countryName : finalData.country.name
      } 
      return singleLeague;
    },

    TopLeaguesInformation : async () => {

      const desiredLeagues=[39, 79, 61, 135, 140]; 
      const nationalLeagues = [1, 2, 3, 4, 9, 45, 46];
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/leagues", config);

      let leagueList=[]; 
      //const topLeagues = data.response.filter(league => desiredLeagues.includes(league.country.name));
      const topLeagues = data.response.filter(league => desiredLeagues.includes(league.league.id));

      //console.log(topLeagues);
      topLeagues.forEach(league => {
        let singleLeague = {
          id : league.league.id,
          leagueName : league.league.name,
          logo :  league.league.logo,
          countryName : league.country.name
        } 

        leagueList.push(singleLeague);
      })
        return leagueList;   
    },


    StandingInformation : async (_, args) => {
      let standingsList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/standings?league="+ args.league +"&season="+args.season, config);

      let responseData= data.response[0];
      let temp = responseData.league.standings[0]

      temp.forEach(standing => {
        let singleTeam = {
          rank: standing.rank,
          teamName: standing.team.name,
          logo: standing.team.logo,
          points: standing.points,
          matchesPlayed: standing.all.played,
          matchesWon: standing.all.win,
          matchesLost: standing.all.lose,
          matchesDraw: standing.all.draw,
          homeMatches: standing.home.played,
          awayMatches: standing.away.played,
          goalsScored: standing.all.goals.for,
          goalsConceded: standing.all.goals.against,
          teamId: standing.team.id
        }         
        standingsList.push(singleTeam);        
      });               
      return standingsList;
    },


    FixtureByDateInformation : async (_, args) => {

      let fixtureList=[]
      const desiredLeagues =[39, 79, 61, 135, 140]; 


      const runApiForLeague = async (leagueId) => {
      const parsedDate = moment.utc(args.matchDate);
      const formattedDate = parsedDate.format('YYYY-MM-DD');

      const { data } = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&date=${formattedDate}&season=2022`, config);   

      data.response.forEach(element => {

        const matchTimeUTC = new Date(parseInt(element.fixture.timestamp) * 1000);
        //console.log(matchTimeUTC)
        const matchTimeEST = new Date(matchTimeUTC.toLocaleString("en-US", {timeZone: "America/New_York"}));
        let matchTimeESTString = matchTimeEST.toLocaleTimeString("en-US", {hour12: false});
        matchTimeESTString = matchTimeESTString.slice(0,5) + " ET"; 
        let singleFixture= {
          id: element.fixture.id,
          matchDate : formattedDate,
          matchTime : matchTimeESTString,
          matchTimeZone : element.fixture.timezone,
          homeTeamName : element.teams.home.name,
          homeTeamID : element.teams.home.id,
          homeTeamLogo: element.teams.home.logo,
          awayTeamName : element.teams.away.name,
          awayTeamID: element.teams.away.id,
          awayTeamLogo: element.teams.away.logo,
        } 
        fixtureList.push(singleFixture);     
      });      
      };

      const runApiForAllLeagues = async () => {
        for (const leagueId of desiredLeagues) {
          await runApiForLeague(leagueId);
        }
      };
      await runApiForAllLeagues();           
      return fixtureList;
    },


    TopScorerByLeague : async (_, args) => {
      let topScorersList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league="+ args.league +"&season="+args.season, config);

      data.response.forEach(player => {
        let singlePlayer = {
          playerID: player.player.id,   
          playerName: player.player.name,
          playerImage: player.player.photo,
          teamName: player.statistics[0].team.name,
          teamLogo: player.statistics[0].team.logo,
          goals:  player.statistics[0].goals.total,
        }          
        topScorersList.push(singlePlayer);       
      });           
      return topScorersList;
    },

    GetPlayerByID : async (_, args) => {
      console.log(args.playerId); 
      const {data} = await axios.get("https://api-football-v1.p.rapidapi.com/v3/players?id="+ args.playerId+"&season="+ args.season, config);
      
      if(data.response.length===0){
        return null;
      }

      let singlePlayerData = data.response[0];
        let singlePlayer = {
          playerID: singlePlayerData.player.id,
          playerName: singlePlayerData.player.name,
          firstName: singlePlayerData.player.firstname,
          lastName: singlePlayerData.player.lastname,
          age: singlePlayerData.player.age,
          Nationality: singlePlayerData.player.nationality,
          playerImage: singlePlayerData.player.photo,
          playerHeight: singlePlayerData.player.height,
          playerWeight: singlePlayerData.player.weight,
          playerPosition: singlePlayerData.statistics[0].games.position,
          playerRating: singlePlayerData.statistics[0].games.rating,
          teamName: singlePlayerData.statistics[0].team.name,
          leagueName : singlePlayerData.statistics[0].league.name,
          season : singlePlayerData.statistics[0].league.season,
          appearances: singlePlayerData.statistics[0].games.appearences,
          lineUps: singlePlayerData.statistics[0].games.lineups,
          goals:  singlePlayerData.statistics[0].goals.total,
          assists: singlePlayerData.statistics[0].goals.assists,
          penaltyScored: singlePlayerData.statistics[0].penalty.scored,
          penaltyMissed: singlePlayerData.statistics[0].penalty.missed,
          yellowCard: singlePlayerData.statistics[0].cards.yellow,
          redCard: singlePlayerData.statistics[0].cards.red
        }                
      return singlePlayer;
    },

    TopAssistsByLeague : async (_, args) => {
      let topScorersList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/players/topassists?league="+ args.league +"&season="+ args.season, config);

      data.response.forEach(player => {
        let singlePlayer = {
          playerID: player.player.id,   
          playerName: player.player.name,
          playerImage: player.player.photo,
          teamName: player.statistics[0].team.name,
          teamLogo: player.statistics[0].team.logo,
          assists:  player.statistics[0].goals.assists,
        }          
        topScorersList.push(singlePlayer);       
      });

      //console.log(topScorersList.slice(0,2));            
      return topScorersList;
    },

    SearchPlayerByName : async (_, args) => {
      let searchedPlayers=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v2/players/search/"+ args.playerName, config);

      let playersData= data.api.players;
      playersData.forEach(player => {
        let singlePlayer = {
          playerID: player.player_id,   
          playerName: player.player_name,
          nationality: player.nationality
        }          
        searchedPlayers.push(singlePlayer); 
      });
      searchedPlayers.sort((a, b) => a.playerID - b.playerID);          
      return searchedPlayers;
    },


    ManagerInformation : async (_, args) => {
        const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/coachs?team="+ args.team, config);
        
        let responseData= data.response[0];
        let singleManager={
          managerID: responseData.id,
          managerName: responseData.name,
          firstName: responseData.firstname,
          lastName: responseData.lastname,
          age: responseData.age,
          Nationality: responseData.nationality,
          managerImage: responseData.photo,
          teamName: responseData.career[0].team.name,
          teamLogo: responseData.career[0].team.logo,
          startDate: responseData.career[0].start
        }            
      return singleManager;
    },


    TeamInformation : async (_, args) => {
      console.log("heyyyyy")
      console.log(args)
      console.log(args.teamID)
 
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/teams?id="+ args.teamID, config);

      let responseData= data.response[0];
      let singleTeam={
        teamID : responseData.team.id,
        teamName: responseData.team.name,
        teamLogo: responseData.team.logo,
        founded: responseData.team.founded,
        teamCode: responseData.team.code,
        countryName: responseData.team.country,
        venueName: responseData.venue.name,
        address: responseData.venue.address,
        city: responseData.venue.city,
        capacity: responseData.venue.capacity,
        venueImage: responseData.venue.image
      }  
      console.log(singleTeam);          
    return singleTeam;
  },


    getGameByUserId : async (_, args) => {
      const gameData = await user.getGameByUserId(args.id);
      if(gameData.errors){    
          return gameData.errors[0].message
      }
      return gameData
  },

  GetAllUsers: async () => {     
    const user_list = await user.getAllUsers();
    if(user_list.errors){
        return user_list.errors[0].message
    }
    else{
        return (user_list);
    }
  },

  GetUserById: async (_, args) => {
    const oneUser = await user.getUserById(args.id);
    if(oneUser.errors){
    
        return oneUser.errors[0].message
    }
    else{
        return (oneUser);
    }
    
  },


  GetFollowedPlayersInfo: async (_, args) => {

    let key_exists = await client.exists(args.userId +"_PlayerFollowing");
    let index;
    let newArray=[];
    if(key_exists){
      console.log("helllo");
      //index = await client.get(args.userId +"_PlayerFollowing")  ;
      // return JSON.stringify(index); 
      // console.log(index)
      const length = await client.lLen(args.userId +"_PlayerFollowing");
      //console.log(length);
      for(let i=0; i<length; i++){
          const result = await client.lIndex(args.userId +"_PlayerFollowing", i);
          // console.log(result)
          // console.log(JSON.parse(result))
          

          let tempPlayerId= parseInt(JSON.parse(result))

          const {data} = await axios.get("https://api-football-v1.p.rapidapi.com/v3/players?id="+ tempPlayerId+"&season=2022" , config);  

          console.log(data.response[0]);



          let newObject= {playerId: tempPlayerId, playerName: data.response[0].player.name, playerImage: data.response[0].player.photo}
          newArray.push(newObject);        
      }
      console.log(newArray)
      if(newArray.length!== 0) {
          return newArray;
      } else{
          return [0];
      }
    }
    
    else return [0];   
  },

  GetFollowedTeamsInfo: async (_, args) => {

    let key_exists = await client.exists(args.userId +"_TeamFollowing");
    let index;
    let newArray=[];
    if(key_exists){
      console.log("helllo");
      const length = await client.lLen(args.userId +"_TeamFollowing");
      for(let i=0; i<length; i++){
          const result = await client.lIndex(args.userId +"_TeamFollowing", i);
          //console.log(typeof(result))
          console.log(typeof(parseInt(JSON.parse(result))));
          let newObject= {teamID: parseInt(JSON.parse(result))}
          newArray.push({teamID: parseInt(JSON.parse(result))});        
      }

      newArray.forEach(element => {
        console.log(element.teamID)
        console.log(typeof(element.teamID))
      });
      
      if(newArray.length!== 0) {
          return newArray;
      } else{
          return [0];
      }
    }
    
    else return [0];   
  }

},

Mutation:{
  createGame: async (_, args) => {

      const game = await user.createGame(args.fixtureID, args.userID, args.awayTeam, args.homeTeam, args.betField);
      if(game.errors){
        return game.errors[0].message
      }
      else{
        return game;
      }       
  },


  updateGame: async (_, args) => {   

    const updatedGame = await user.updateGame(args.gameID);
    if(updatedGame.errors){
      return updatedGame.errors[0].message
    }
    else{
      return (updatedGame);
    }       
  },

  // CreateUser: async (_, args) => {
  //   console.log("Create User args")
  //   console.log(args)
  //         const oneUser = await user.createUser(
  //             args.username,
  //             args.password,
  //             args.dob,
  //             args.phone, 
  //             args.email, 
  //             args.country, 
  //             args.profilePic, 
  //             args.bio, 
  //             args.isPremium );
          
  //         if(oneUser.errors){
  //                 return oneUser.errors[0].message
  //         }
  //         else{
  //             return (oneUser);
  //         }
  // },

  CreateUser: async (_, args) => {
    console.log("Create User args")
    console.log(args)
          const oneUser = await user.createUser(
              args.username,
              args.password,
              args.dob,
              args.phone, 
              args.email, 
              args.country, 
              args.profilePic, 
              args.bio, 
              args.isPremium );
          
          if(oneUser.errors){
                  return oneUser.errors[0].message
          }
          else{
              return (oneUser);
          }
  },

  DeleteUser: async(_,args)=>{
      const deleteone = await user.deleteUser(args.id);
          if(deleteone.errors){
          
              return deleteone.errors[0].message
          }
          else{
              return (deleteone);
          }
  },

  Login: async(_,args)=>{
    console.log("heyyyyyyyyyy");
    // let session_exists = await client.exists("session");
    // if(session_exists) {
    //     let get_user = JSON.parse(await client.get("session"));
    //     return "Already LoggedIn as " + get_user.username + "please logout to login again";
    //   // res.status(403).json({"error":`Already LoggedIn as ${get_user.username}. please logout to login again`});
    // }
    console.log("Login Args")
    console.log(args)
    const loggedIn = await user.checkUser(args.username,args.password);
    if(loggedIn.errors){     
        return loggedIn.errors[0].message
    }
    else{
      // let session = await client.set(
      //   "session",
      //   JSON.stringify(loggedIn)
      // );
      return (loggedIn);
    }
  },

  AddTeamFollowing: async(_,args)=>{
    const addTeam = await user.addTeamFollowing(args.userId,args.teamID);
        if(addTeam.errors){
        
            return addTeam.errors[0].message
        }
        else{
            return (addTeam);
        }
  },

  AddPlayerFollowing: async(_,args)=>{
      const addPlayer = await user.addPlayerFollowing(args.userId,args.PlayerID);
          if(addPlayer.errors){
          
              return addPlayer.errors[0].message
          }
          else{
              return (addPlayer);
          }
  },

  DeleteTeamFollowing: async(_,args)=>{
      const deleteTeam = await user.deleteTeamFollowing(args.userId,args.teamID);
          if(deleteTeam.errors){
          
              return deleteTeam.errors[0].message
          }
          else{
              return (deleteTeam);
          }
  },

  DeletePlayerFollowing: async(_,args)=>{
      const deletePlayer = await user.deletePlayerFollowing(args.userId,args.PlayerID);
          if(deletePlayer.errors){
          
              return deletePlayer.errors[0].message
          }
          else{
              return (deletePlayer);
          }
  },


  
},

}
