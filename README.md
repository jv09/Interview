# Interview
This project was basiaclly a web app wherein one has to register/login to access. After logging in you can add topics and questions as per your choice and practise them to improve your cp skills. 

# Dependencies used
   * [Mongoose](https://mongoosejs.com/docs/)
   * [EJS](https://ejs.co/)
   * [Express](http://expressjs.com/)
   * [Admin-bro](https://adminbro.com/section-modules.html/)
 
## Usage

Inorder to run the website locally on your computer , follow the steps given below:

* Clone this github repo.
* Open the terminal and change the directory to the downloaded folder then run the command 

```sh
 npm install
```
* The above command will install all the required packages and dependencies required for the project


Add your mongodb URI in the app.js
`module.exports = {
    MongoURI : 'mongodb+srv://<user>:password@cluster08451.am7f4.mongodb.net/<name of database>?retryWrites=true&w=majority'
}`

* The final step is to run the following command
```sh
 nodemon app
 
```
 
 `Visit http://localhost:3000`

## Welcome Page
![1](https://user-images.githubusercontent.com/70435148/108624562-aa27f480-746b-11eb-8559-b28847231c4c.png)
