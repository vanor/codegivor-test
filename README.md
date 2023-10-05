# Project
This project is a test for a software developer position at codegivor company. To run the project you will need to install node.js, npm and MongoDB on your local machine. After that, you should clone this repository or download the corresponding Zip file. Use a command line or Terminal and change the current working directory to the local project you have previously downloaded.

## Build the backend
If you've already MongoDB installed, create a database with a name that you cannot forget. Then, follow these steps:
- From the project directory, go to **server** directory.
- In that directory, create a file named **.env** and copy paste the content of **.env.example** file into it.
- Just edit the params with the name of the created database, the user and password you're using with MongoDB and the corresponding URL for database connexion. You will also have to specify a secret for JWT.
- Run the command **npm install**.
- Run the command **node index.js** to start the backend.

## Explanation of my decisions
### Code structure
I structured my code like a monorepo so that if we want to add a frontend in the future we will just add a corresponding folder at the root of the project. And inside each sub project, we have a structure similar to MVC without the views because we are building an API.
The MVC pattern is widely used to build web application and it is very modular and allow separation of concern, so that the structure of your project does not change too much when the application grows.
### Production code
In a production environment, I will use docker to manage the deployment and configuration so that it is very easy for any developer to have its own local setup and start develop without stress.

## Code review
### Issues
I can see many issues related to the code provided:
- **user** can be null or cannot possess the age attribute which can lead to a server error.
- The database can already contain a user with some unique information like email.
- We are not checking if the insert operation was successful but we send response **user added** with 200 status.

### Improvements
- Preferably throw an exception when validating incorrect inputs and write error handler middleware to prevent nesting many if conditions
- Delegate the response status code to the error handler middleware in order to reuse code.
- Use **express.Route** and write controller operations to split route declaration from operations.

## Time management
To be able to complete my tasks within a week, I will work following the planning below:
1. Fix the critical bug in the login module (monday: 8h): I'll start with this task because I think it has the highest priority. It is a production bug and it can prevent all users of the platform to do anything since they cannot sign in. I think it is not very complicated to resolve and it needs to be resolved quickly.
2. Develop the new feature requested by clients (tuesday and wednesday: 16h): after the login issue, I'll start working on the new feature which is the second task with higher proority because it is really needed by the client and the client is the king! It will take more time because we need to agree with the client, understand his need and implement a solution that fit him, so I put two days for this task but it can take 4h more.
3. Write the API documentation (thursday: 8h): I'll start writing documentation because it is important for team work and will allow other developer to properly handle things at their end. I think it is not an urgent task, but it should be done during the week to not forget what can be very important for others. Depending if you're very good at writing, it can take less or more time but I think it can be done in one day.
4. Database optimization (friday: 8h): this task is the last but I think it can take more time than documentation and it is especially why I choose to do it at the end of the week. All features are working so this task is not blocking anything, then it can be done even in weekend if you was not able to finish the others tasks before.
