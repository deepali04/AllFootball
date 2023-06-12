const {ObjectId} = require('mongodb');

const string = function error_handling_for_string(input_string, input_name){
  if(!input_string) throw 'Please provide ' + input_name;
  if (typeof(input_string) !== 'string' || typeof(input_string) ==='undefined') throw input_name +' must be a string';
      if (input_string.trim().length === 0)
        throw input_name +' cannot be an empty string or string with just spaces';
}

const valid_id = function error_handling_for_id(input_id,input_para){
    if (!input_id) throw 'You must provide an ' + input_para;
    if (typeof(input_id) !== 'string' || typeof(input_id)==='undefined') throw input_para +' must be a string';
    if (input_id.trim().length === 0)
      throw input_para +' cannot be an empty string or just spaces';
    
    if (!ObjectId.isValid(input_id.trim())) throw 'Invalid object '+ input_para; 
}
const createUser_validations = function createUser_validations(input_username, input_password){

    let format = /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let spaces = /(.*\s{1,}.*)|(^\s+.*)|(.*\s+$)/g;
    let password_format = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g;
    input_username = input_username.trim();
    if (!input_username || !input_password) throw 'You must provide username and password ';
    if (typeof(input_username) !== 'string' || typeof(input_username)==='undefined') throw 'Username must be a string';
    if (typeof(input_password) !== 'string' || typeof(input_password)==='undefined') throw 'Password must be a string';
    if (input_username.length < 4) throw 'Username should be at least 4 characters long.';
    if(format.test(input_username)) throw 'Please enter valid username .i.e without special characters or spaces';
    if (input_password.length < 6 || input_password > 10) throw 'Password should be at least 6 and maximum 10 characters long';
    if(spaces.test(input_password)) throw 'Password cannot contain spaces';
    if(!password_format.test(input_password)) throw 'Password should contain at least one uppercase character, at least one number and at least one special character';

}
const dateformat = function error_handling_for_dateformat(date){
  const dateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  if (!dateRegex.test(date)) {
    throw 'Please enter a valid date';
  }
 
  const today = new Date();
  const dateObj = new Date(date);
  let age = today.getFullYear() - dateObj.getFullYear();
  const monthDiff = today.getMonth() - dateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
    age--;
  }

  if (age < 18) {
    throw 'User must be at least 18 years old!';
  }
}

const email_check = function email_check(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw "Please provide a valid email ID!"
  }
}

const phone_check = function phone_handling (phone)
{
  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(phone)) {
    throw "Please provide a valid phone Number!"
  }
}


module.exports = {  
    valid_id,
    createUser_validations,
    dateformat,
    email_check,
    phone_check,
    string
   
};