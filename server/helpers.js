//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const {ObjectId} = require('mongodb');
const validator = require("node-deep-email-validator");
const validatePhoneNumber = require('validate-phone-number-node-js');




const string = function error_handling_for_string(input_string,input_name){
  if(!input_string) throw 'Please provide ' + input_name;
  if (typeof(input_string) !== 'string' || typeof(input_string) ==='undefined') throw input_name +' must be a string';
      if (input_string.trim().length === 0)
        throw input_name +' cannot be an empty string or string with just spaces';
}
const valid_id = function error_handling_for_id(input_id,input_para){
    if (!input_id) throw 'You must provide an ' +input_para;
    if (typeof(input_id) !== 'string' || typeof(input_id)==='undefined') throw input_para+' must be a string';
    if (input_id.trim().length === 0)
      throw input_para+' cannot be an empty string or just spaces';
    
    if (!ObjectId.isValid(input_id.trim())) throw 'Invalid object '+input_para;
}
const createUser_validations = function createUser_validations(input_username,input_password){
    let format = /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let spaces = /(.*\s{1,}.*)|(^\s+.*)|(.*\s+$)/g;
    let password_format = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g;
    input_username = input_username.trim();
    if (!input_username || !input_password) throw 'You must provide username and password ';
    if (typeof(input_username) !== 'string' || typeof(input_username)==='undefined') throw 'Username must be a string';
    if (typeof(input_password) !== 'string' || typeof(input_password)==='undefined') throw 'Password must be a string';
    if (input_username.length < 4) throw 'Username should be at least 4 characters long.';
    // if(spaces.test(input_username)) throw 'Username cannot contain spaces';
    if(format.test(input_username)) throw 'Please enter valid username .i.e without special characters or spaces';
    if (input_password.length < 6 || input_password > 10) throw 'Password should be at least 6 and maximum 10 characters long.';
    if(spaces.test(input_password)) throw 'Password cannot contain spaces';
    if(!password_format.test(input_password)) throw 'Password should contain at least one uppercase character, at least one number and at least one special character';

}
const dateformat = function error_handling_for_dateformat(input_as_string){
  console.log(input_as_string)
  let date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if(input_as_string.trim().match(date_regex)===null){
      throw 'Please enter valid date format .i.e mm/dd/yyyy';
  }
  let date_arr = input_as_string.trim().split('/');
  if(parseInt(date_arr[0])>12) throw 'Please enter valid month';
  let no_of_days = [31,28,31,30,31,30,31,31,30,31,30,31];
  if(parseInt(date_arr[0])===1 || parseInt(date_arr[0]) >=2){
    if(parseInt(date_arr[1])>no_of_days[parseInt(date_arr[0])-1]){
      throw 'Please enter a valid date';
    }
  }
  else{
    throw 'Please enter a valid date';
  }
  let max_year = new Date().getFullYear();    
  let min_year = 2005;
  let user_year = parseInt(date_arr[2]);
  if((user_year >= min_year || user_year >= max_year)) throw 'User must be 18 years old';
}
const email_check = async function email_check(email){
  try{
    const valid = await validator(email); //{ result: Boolean, failReason: String || null }
    if(valid.result){
      //do nothing
    }
    else{
      // console.log(valid)
      return valid
    }
  }catch(e){
    if(e){
      return e;
    }
  }
  
}

const phone_check = function phone_handling (phone)
{
  
    const phone_valid =  validatePhoneNumber.validate(phone); 
    if(!phone_valid) throw "Please provide a valid phone number"
}


module.exports = {
   
    valid_id,
    createUser_validations,
    dateformat,
    email_check,
    phone_check,
    string
   
};