# rent-a-driver

## Description

Rent-A-Driver is a web application that connects transporters/drivers with prospective dealers who would want to deliver bulky goods to different places right from their current location.  
It is made with user-friendliness in mind and is simple and yet a powerful tool.

These are the core functionalities of our website:
1) A driver can be able to view all the dealers who have booked them currently.
2) A dealer can sort through the drivers based on their preferred routes and location of choice.
3) A dealer can book and cancel the drivers based on his convenience.
4) In case a user forgets a password, they can log in via the OTP sent through their email.
5) Two separate logins for dealer and driver.


## Install and build
- Install all the required packages with  

    ```
    npm install
    ```
- Add a `.env` file in the root folder with the following fields set:
    ```
    - MONGO_URI
    - SECRET_KEY
    - MAIL_ID
    - MAIL_PASSWORD
    ```

- To run the web app locally:

    ```
    npm run dev
    ```

## Tech Stack: -
1) Node, Express as Backend
2) Bootstrap, HTML, CSS and EJS as Frontend
3) MongoDB (MongoDB Atlas) as Database
4) Git, GitHub as VCS
5) Heroku for hosting.

## Team:
 ```ruby
 Ponduru Pranav Sai
 Chirugudu Noah Sujiv Raj
 Binesh Munukurthi
 Abhijeet Mahapatra
 ```