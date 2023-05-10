const mongoCollections = require('../config/mongoCollections');
const validation = require('../helpers');
const axios = require("axios");
const users = mongoCollections.users;
const games = mongoCollections.games;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const redis = require("redis");
const client = redis.createClient();

(async () => {
  await client.connect();
})();

const getAllUsers = async () => {
    
  const userscollection = await users();
  const users_data = await userscollection.find({}).toArray();
  if(users_data.length===0) throw {error:'No users found', statusCode:404};
  
  return users_data;
};

const getUserById = async (userId) => {
  if(validation.valid_id(userId,"ID"));
  userId = userId.trim();
  const userscollection = await users();
  const users_data = await userscollection.findOne({_id: new ObjectId(userId)});
  if(users_data === null) throw {error:'No user found with '+userId, statusCode:404};

  return users_data; 
};

const deleteUser = async (userId) => {
  if(validation.valid_id(userId,"ID"));
  userId = userId.trim();
  let getuser = await getUserById(userId);
  if(getuser !== null){
      const userscollection = await users();
      const user_removed = await userscollection.deleteOne({_id: new ObjectId(userId)});
      if(user_removed.deletedCount === 0 ) throw {error:'Internal Server Error ', statusCode:500};
          return await getAllUsers(userId);
      }
      else{
          throw {error:'User not found', statusCode:404};
      }
};

const createUser = async (
  username,
  password,
  dob, 
  phone, 
  email, 
  country, 
  profilePic, 
  bio
) => {


if(validation.createUser_validations(username,password));
const hashed_password = await bcrypt.hash(password, saltRounds);
if(validation.phone_check(phone));
const check = await validation.email_check(email);
if(check){
  if(!check.result){

    throw check.failReason
  }
}

const dateObj = new Date(dob);

// format the date in the "MM/dd/yyyy" format
const formattedDate = dateObj.toLocaleDateString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

if(validation.dateformat(formattedDate));
// if(validation.string(bio,"Bio"));
if(validation.string(country,"Country"));
let createuser = {
  username:username.trim().toLowerCase(),
  password: hashed_password,
  dob:dob.trim() || "Not Provided", 
  phone:phone.trim(), 
  email:email.trim(), 
  country:country.trim(), 
  profilePic:profilePic || "Not Provided", 
  bio:bio.trim() || "Not Provided", 
  isPremium:false,
  coins:0,
  followingTeamID:[],
  followingPlayerID:[]
};

const userscollection = await users();
const users_all = await userscollection.find({}, {projection: {_id: 1, username: 1}}).toArray();
if(users_all.length===0){
  //do nothing
}
else{
  users_all.forEach(element => {
    if(element.username.toLowerCase() === username.trim().toLowerCase()){
      throw {error:'Username already exists !',statusCode:400}
    }
  });
}

const insert_user = await userscollection.insertOne(createuser);
if(!insert_user.insertedId || !insert_user.acknowledged) throw {error:'Unable to create user', statusCode:500};
const created = insert_user.insertedId.toString();
// return (created)
const data = await getUserById(created);

return data;
};

const checkUser = async (username, password) => 
{ 
  if(validation.createUser_validations(username,password));
  let compare_password = false;
  const userscollection = await users();
  const users_data = await userscollection.findOne({username:username.trim().toLowerCase()});
  if(users_data.length===0) throw {error:"Either the username or password is invalid",statusCode:400};
  compare_password = await bcrypt.compare(password, users_data.password);
  if(compare_password){
    return getUserById(users_data._id.toString());
  }
  else{
    throw {error:"Either the username or password is invalid",statusCode:400};
  }
};

const addTeamFollowing = async (userId,teamID) => {

  console.log(teamID);

  let key_exists = await client.exists(userId +"_TeamFollowing");
  let index;
  if(key_exists){
    index = await client.rPush(userId +"_TeamFollowing", JSON.stringify(teamID))    
  }

  else{
    index = await client.lPush(userId +"_TeamFollowing",JSON.stringify(teamID))   
  }
    
  if(index){
    const data_pushed = await client.lIndex(userId +"_TeamFollowing", index-1)
    console.log(JSON.parse(data_pushed));
  }
  else{
      console.log("cannot add to redis");
  }


  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:400};
  else{
    if(exists.followingTeamID.includes(teamID)) throw {error:"Team Already exist in following list", statusCode:400};
    const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $push: { followingTeamID: teamID } })
    if (users_data.modifiedCount === 0) throw {error:'Cannot Add the team to following list ', statusCode:500};
    const data = await getUserById(userId);
    return data;
  }

};
const addPlayerFollowing = async (userId,playerID) => {


  let key_exists = await client.exists(userId +"_PlayerFollowing");
  let index;
  if(key_exists){
    index = await client.rPush(userId +"_PlayerFollowing", JSON.stringify(playerID))    
  }

  else{
    index = await client.lPush(userId +"_PlayerFollowing",JSON.stringify(playerID))   
  }
    
  if(index){
    const data_pushed = await client.lIndex(userId +"_PlayerFollowing", index-1)
    console.log(JSON.parse(data_pushed));
  }
  else{
      console.log("cannot add to redis");
  }

  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:404};
  if(exists.followingPlayerID.includes(playerID)) throw {error:"PLayer Already exist in following list", statusCode:400};
  const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $push: { followingPlayerID: playerID } })
  if (users_data.modifiedCount === 0) throw {error:'Cannot Add the player to following list ', statusCode:500};
  const data = await getUserById(userId);
  return data;
};

const deleteTeamFollowing = async (userId,teamID) => {

  let key = await client.exists(userId +"_TeamFollowing");
  let removed
  const length = await client.lLen(userId +"_TeamFollowing")
      for(let i=0; i<length; i++){
          const result = await client.lIndex(userId +"_TeamFollowing", i)
          let data = JSON.parse(result)
          // console.log(data)
          if(data ===teamID){
              removed = await client.lRem(userId +"_TeamFollowing",0,result)
          }
          else{
              removed=null
          }
     }

  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:404};
  else{
    const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $pull: { followingTeamID: teamID } })
    if (users_data.modifiedCount === 0) throw {error:'Cannot remove the team from following list ', statusCode:500};
    const data = await getUserById(userId);
    return data;
  }

};
const deletePlayerFollowing = async (userId,playerID) => {

  let key = await client.exists(userId +"_PlayerFollowing");
  let removed
  const length = await client.lLen(userId +"_PlayerFollowing")
      for(let i=0; i<length; i++){
          const result = await client.lIndex(userId +"_PlayerFollowing", i)
          let data = JSON.parse(result)
          // console.log(data)
          if(data ===playerID){
              removed = await client.lRem(userId +"_PlayerFollowing",0,result)
          }
          else{
              removed=null
          }
     }

  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:404};
  const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $pull: { followingPlayerID: playerID } })
  if (users_data.modifiedCount === 0) throw {error:'Cannot remove the player from following list ', statusCode:500};
  const data = await getUserById(userId);
  return data;
};

const createGame = async (fixtureID, userID, awayTeam, homeTeam, betField) => {
 
  const gamesCollection = await games();
  let creategame = {
    fixtureID:fixtureID,
    userID:userID,
    awayTeam:awayTeam,
    homeTeam:homeTeam,
    betField:betField,
    result:0
  };

  const insert_game = await gamesCollection.insertOne(creategame);
  if(!insert_game.insertedId || !insert_game.acknowledged) throw {error:'Unable to bet on the game', statusCode:500};
  const created = insert_game.insertedId.toString();
  const data = await getGameById(created.toString());
  
  return data;

};

const getGameByUserId = async (userId) => {
 
  const gamesCollection = await games();
  const game_data = await gamesCollection.find({userID: userId}).toArray();;
  if(game_data === null) throw {error:'No game found with '+userId, statusCode:404};
  
  return game_data; 
};

const getGameById = async (gameId) => {
  if(validation.valid_id(gameId,"ID"));
  // userId = userId.trim();
  const gamesCollection = await games();
  const game_data = await gamesCollection.findOne({_id: new ObjectId(gameId)});
  if(game_data === null) throw {error:'No game found with '+userId, statusCode:404};

  return game_data; 
};

const getGameByfixtureId = async (fixtureID) => {
  if(validation.valid_id(fixtureID,"ID"));
  fixtureID = fixtureID.trim();
  const gamesCollection = await games();
  const game_data = await gamesCollection.findOne({fixtureID: fixtureID});
  if(game_data === null) throw {error:'No game found with '+fixtureID, statusCode:404};

  return game_data; 
};

const updateGame = async (userID) => {
  // console.log(userID)
  if(validation.valid_id(userID,"ID"));
  userID = userID.trim();
  const gamesCollection = await games();
  const userscollection = await users();
  let userData = await getUserById(userID.toString());
  const games_obj = await getGameByUserId(userID);
 console.log(userData.coins)
if(userData.coins >=200){
    console.log("hi")
  await userscollection.updateOne({_id: new ObjectId(userID)},{$set : { isPremium : true}} );
}

  if(games_obj.length===0){
    throw {error:'No games to score ', statusCode:200}
  }
  for (const x of games_obj) {
     
  if(userData.coins >=200){
      
    await userscollection.updateOne({_id: new ObjectId(userID)},{$set : { isPremium : true}} );
  }
    if (x.result===0){

    const API_KEY = '3df39a1cbamsh63f95b9f20d493ep18c3d2jsnaa9a8f6d3181';
    const API_HOST = 'api-football-v1.p.rapidapi.com';
    const config = {
      headers:{
        'X-RapidAPI-Host' : API_HOST,
        'X-RapidAPI-Key' : API_KEY
      }
    };
  
    const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/fixtures?id="+ x.fixtureID, config);   
  
    if(data.response[0].fixture.status.short !== 'FT'){
      console.log("gameResult")
      throw {error:'The Match is not declared yet, the result will be declare once the match is over! ', statusCode:200}
  
    }
  
    let gameResult;
  
    if(data.response[0].score.fulltime.home > data.response[0].score.fulltime.away){
      gameResult = 1;
    }  
    else if(data.response[0].score.fulltime.home < data.response[0].score.fulltime.away){
      gameResult = 2;
    } 
    else{
      gameResult= 3;
    }
    // console.log(gameResult)
   
    const game_data = await gamesCollection.updateOne({fixtureID: x.fixtureID},{$set : { result : gameResult}} );
    
    
    if (game_data.modifiedCount === 0) throw {error:'Cannot Update Result ', statusCode:500};
  
     userData = await getUserById(userID.toString());
    
    if(gameResult===3){
       await userscollection.updateOne({_id: new ObjectId(userID)},{$set : { coins : userData.coins + 50}} );
      
    }
    else if(gameResult===1){
   
     if(data.response[0].teams.home.id===x.betField){
      console.log("Innnn")
       console.log(await userscollection.updateOne({_id: new ObjectId(userID)},{$set : { coins : userData.coins + 100}} ));
      }
    }
    else if(gameResult===2){
      if(data.response[0].teams.away.id===x.betField){
        console.log("OUTT")
         await userscollection.updateOne({_id: new ObjectId(userID)},{$set : { coins : userData.coins + 100}} );
       }
     }
   
    
    
  }
  if(userData.coins >=200){
    
     await userscollection.updateOne({_id: new ObjectId(userID)},{$set : { isPremium : true}} );
   }
        
}
 
return await getUserById(userID.toString());
};

  module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    createUser,
    checkUser,
    addTeamFollowing,
    addPlayerFollowing,
    deleteTeamFollowing,
    deletePlayerFollowing,
    createGame,
    getGameByUserId,
    getGameByfixtureId,
    updateGame,
    getGameByUserId,
    getGameById
  };