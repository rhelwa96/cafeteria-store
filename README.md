# Cafeteria Management
Cafeteria system is build for order drink instant . Mostly internal use for  Company/Organization employees, cafeteria staff,and Human Resourse (HR) users. Project objective is to order drinks instantly and bills will be deducted from employees salary based on HR custom dates.

## General role,
Each role would need to login in order to view pages that presented in roles.
Registered users will be able to request forget password.
Currently, Ive applied alert/messagebox instead of sending mail for this demo. 

## For the Employee role,
User would order drink wheather single item or multiple item (similar to Cart idea). After user ordered, it will redirect to an history page, he/she could view previous order such item name, price, status, and date/time.

## For the Cafeteria role, 
User would be able to view list of orders, each order would have details such as item name, employee name, department, floor no. and desk no. Once the order is complete, it update employee History page that status is completed.

## For the HR role, 
User would be able to choose applicable start and end date . After that, one could export excel with 3 columns which Employee Name, Employee ID and Sum total bill as per selected dates.

## For Technical view, 
This project are split into to parts Backend (server/API) & Frontend (Client) [Setup Documentation](/backend/READ.md) Readme link.

### Backend (server/API)
Node.js, Express.js written by Typescipt
PostgresSQL

### Frontend (Client)
React.js written by Javascript
UI library: AntDesign

*Redux will be soon add it








 