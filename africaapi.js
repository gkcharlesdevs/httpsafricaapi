const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

const credentials = {
  apiKey: process.env.AFRICA_API_KEY, // use your sandbox app API key for development in the test environment

  username: process.env.AFRICA_API_USERNAME, // use 'sandbox' for development in the test environment
};

const Africastalking = require("africastalking")(credentials);

// Initialize a service e.g. SMS

const sms = Africastalking.SMS;

// Use the service

const options = {
  to: process.env.AFRICA_API_MESSAGE_TO.split(","), // in config.env enter the phone numbers in the format +23407030000000,+23407030000000,..
  from: process.env.AFRICA_API_MESSAGE_FROM,
  message: "I'm a lumberjack and its ok, I work all night and sleep all day",
};

// Send message and capture the response or error

sms

  .send(options)

  .then((response) => {
    console.log(response);
  })

  .catch((error) => {
    console.log(error);
  });
