
import express from 'express'

const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => {
  console.log(request.query.squad)

  let slug = request.query.squad || 'squad-a-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('index', data)
  })
})

// Maak een route voor de member pagina
app.get('/member', (request, response) => {

  let slug = request.query.slug
  let memberUrl = 'https://whois.fdnd.nl/api/v1/member/' + slug

  fetchJson(memberUrl).then((data) => {
    console.log(data)
    response.render('member', data)
  })
})


app.get('/members', (request, response) => {
//   response.send('Joepie!!')
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}




/*

// Importeer express uit de node_modules map
import express from "express";

const url = "https://whois.fdnd.nl/api/v1/squad/";

// Maak een nieuwe express app aan
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/",  (req, res) => {
  res.render("landing")
})

app.get("/FDND-overzicht", async (req, res) => {
  let slug = req.query.squad || "squad-a-2022";
  let squadUrl = url + slug;

	console.log(slug)
  fetchApi(squadUrl).then((data) => {
    res.render('index', data)
  })
})


app.set("port", process.env.PORT || 8000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchApi(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}*/ 