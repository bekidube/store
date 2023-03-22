const express = require('express')
const bodyParser = require('body-parser')
const router = express()
// require("../database/dotenv");
const cors = require('cors');
const http = require('http')

//routes for passenger
const register = require("../controllers/passenger/register")
const login = require("../controllers/passenger/login")




//routes for inspector
// const proof = require("../controllers/inspector/proof")
// const comp_info = require("../controllers/inspector/company")
// const tokens = require("../controllers/inspector/tokens")
// const status = require("../controllers/inspector/status")
// const suspend = require("../controllers/inspector/suspended")
// const trip = require("../controllers/inspector/trip")
// const report = require("../controllers/inspector/report")

//code for uploading files
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: 'dhtppljex',
  api_key: '259573781321246',
  api_secret: '1O8o4GDLf82SMhjj8yL9kPJRrSE',
});

const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
  folder: "DEV",
},
});

const upload = multer({ storage: storage });

router.post("/newUpload", upload.single("file"), async (req, res) => {
  return res.json({ file: req.file.path});
});

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const port = process.env.PORT || 3001;

var corsOptions = {
  origin:"http://localhost:4200"
}

router.use(cors(corsOptions));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
  next();
});

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

router.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

   //routes for registering
router.post('/register', register.registerUser)
 //routes for logging in
 router.post('/login', login.passengerLogin)



router.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })