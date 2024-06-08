# Finance-Tracker

Tech Stack Used - 

Express.js in backend and mongodb as database

This Application contains Rest API for managing daily expense and saving.

Main Endpoints- 

1. /v1/user/login - for user login , will generate token that will pass in each request for transaction api ( POST Method)
2. /v1/user/register - for user registration  ( POST Method)
3. /v1/transaction- for adding transcation ( POST Method)
4. /v1/transactions - for getting all transcations of particular user ( GET Method)
5. /v1/transaction/${transactionId} -  for getting  one transcations of particular user ( GET Method)
6. /v1/transaction/${transactionId} - for updating one transcations of particular user ( PUT Method)
7. /transaction/summary/:period - for getting  summary and analytics( GET Method)


This application is using local mongodb url - mongodb://localhost/financial_tracker, so mongodb would require to run this application on local machine.



