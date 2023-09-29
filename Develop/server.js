const express = require("express");
const routes = require("./routes");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

// let user = {
//   username: "Joe",
//   password: "pass123",
// };

// fs.writeFile("data.txt", JSON.stringify(user));

// const user = new User({
//   username: "Joe",
//   password: "pass123",
// });
// user.save();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
