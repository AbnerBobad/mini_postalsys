import express from "express";
import route from "./routes/routes";
import path from "path";

const app = express();
const PORT = 4000;

app.use(express.json()); //parse Json body 
app.use(express.urlencoded({ extended: true})); //parse urlencoded body

app.use(express.static(path.join(__dirname, "public"))); //service static files from the public directory

//express view engine
app.set('view engine', 'ejs');

//set the views directory 
app.set(
  'views',
  path.join(__dirname, './public/view')
)

app.use('/', route); // define the routes

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
