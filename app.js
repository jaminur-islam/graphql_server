const { default: axios } = require("axios");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

let message = "this is a  message";

const schema = buildSchema(`
 
type User {
  name: String
  age : Int
  class: String
 
}



type User1 {
  userId : Int
  id  : Int
  title: String
  body: String
}

type Query {
  hello : String 
  send(name: String , age: String): String
  getUser : User!
  getUserList : [User]
  getAllUser(name: String) : [User1]
}




input userInput { 
  name: String
  age: Int 
}

input newUserInput {
  name : String
  age: Int
  class: String
}

type Mutation {
 setMessage(newMessage: String): String
 createUser(user: userInput) : User
 crateNewUser(newUser: newUserInput ) : User
}



`);

const root = {
  hello: () => {
    return "hello would";
  },
  send: (args) => {
    console.log(args);
    return `${args.name},hey how is life your age ${args.age}`;
  },

  getUser: () => {
    return { name: "sagor" };
  },

  getUserList: () => {
    return [
      { name: "sagor", age: 20 },
      { name: "shimul", age: 22 },
      { name: "Nazim uddin", age: 23 },
    ];
  },

  getAllUser: async (args) => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  },

  // ============================= Mutation start =================================//
  setMessage: (args) => {
    message = args.newMessage;
    return message;
  },

  createUser: ({ user }) => {
    return user;
  },

  crateNewUser: ({ newUser }) => {
    return newUser;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => {
  console.log("server running port 4000");
});

// https://www.youtube.com/watch?v=dJjP0SbdIt0
// https://www.youtube.com/watch?v=xUQ-hNRHCgs
