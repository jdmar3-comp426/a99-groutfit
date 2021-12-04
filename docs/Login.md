# The /public/login.js file contains the authentication used

Functionality
*  in the /login.html page, a user enters a username & password and presses sumbit
* Upon submission, the login function is caled in /login.js

login()
* fetches existing directory of users from /app/users
* tests to see if user exists in the databse
* if user exists, directed to /app/typingtest and is allowed to proceed

* if user does not exist, is alerted saying "user/pass combinatoin invalid, please try again or create an account below"