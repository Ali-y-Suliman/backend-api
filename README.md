# backend-api

# Before run the project: npm i

# run the project by:
npm start

# To check the email if working:
email: test.assesment@outlook.com
password: QQqq99!!

# Info about the DB:
1- We have two tables:
 1.1- accounts( id: string, first_name: string, last_name: string, email: string, phone: string, password: string, birthday: string, created_at: string, last_modified: string)
 1.2- users ( id: string, email: string, isAdmin: boolean, password: string ) 
 
# How to work with the APIs:
1- create the previous two tables

2- To create the first admin: 
    a. comment the line: 18 in the file: index.ts
    b. using postman -> http://localhost:4005/users, and the body will be -> {"email": "any email", "password": "any password", "isAdmin": true }

3- Uncomment the previous line.

4- sign in using the admin user you creat using postman: 
    api: http://localhost:4005/login
    body: {"email": "any email", "password": "any password"} you created before
    return: token, you have to use it for the other APIs.
    
5- Now you can create users using the admin user, by inserting the token in the header.
   api: http://localhost:4005/users
   
6- Create Account: you can do it by using the admin user only, any normal user can't.
   api: http://localhost:4005/accounts
   body: ex: { "first_name": "Ali", "last_name": "Suliman", "email": "ali.s@gmail.com", "phone": "+971 55223355", "password": "MMjj99!!", "birthday": "1995-01-01" }
   Note: when a user creat new account, an email will be sent from (test.assesment@outlook.com) to (test.assesment@outlook.com).

7- Admin user: can use all the apis (delete, update, post)
   Normal user: can only fetch
 
 
