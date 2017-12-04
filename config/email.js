var nodemailer = require('nodemailer');

var SendMail = function(firstName, emailAddress, confirmationNumber, dateTimeZoneDeparture, type){

  var transporter = nodemailer.createTransport('smtps://' + process.env.GOOGLE_ID + '%40gmail.com:' + process.env.GOOGLE_SECRET + '@smtp.gmail.com');

  var textNewSuccess = "Hi " + firstName + ",\n\nYour trip has been registerd with Southwest-Checkin. We will automatically check you in exactly 24 hours before your departure. You will receive a status update when this occurs.\n\nConfirmation Number: " + confirmationNumber + "\nDeparture: " + dateTimeZoneDeparture + "\n\nCheers Big Ears!"
  var textCheckinSuccess = "Hi " + firstName + ",\n\nSouthwest-Checkin has automatically checked you in to your flight. You should also receive a confirmation from Southwest Airlines.\n\nConfirmation Number: " + confirmationNumber
  var textCheckinError = "Hi " + firstName + ",\n\nSouthwest-Checkinh has failed to check you in automatically. Please manualy check in at southwest.com.\n\nConfirmation Number: " + confirmationNumber

  if(type === "newSuccess"){
    var mailOptions = {
      from: "Southwest-Checkin <johnseyfertfake@gmail.com>",
      to: emailAddress,
      subject: 'Success ✔ - Your trip has been registered (' + confirmationNumber + ')' ,
      text: textNewSuccess,
    };
  } else if (type === "checkinSuccess"){
    var mailOptions = {
      from: "Southwest-Checkin <johnseyfertfake@gmail.com>", 
      to: emailAddress,
      subject: 'Success ✔ - You have been checked in for your trip (' + confirmationNumber + ')' ,
      text: textCheckinSuccess,
    };
  } else if (type === "checkinError"){
    var mailOptions = {
      from: "Southwest-Checkin <johnseyfertfake@gmail.com>",
      to: emailAddress,
      subject: 'Error - CheckIn Failed (' + confirmationNumber + ')' ,
      text: textCheckinError,
    };
  }
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log('in error', error);
      }
      console.log('Message sent: ' + info.response);
  });
}

module.exports = SendMail;


