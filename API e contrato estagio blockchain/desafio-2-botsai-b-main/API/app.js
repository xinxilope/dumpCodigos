const express = require("express")
const { add } = require("nodemon/lib/rules")
const connectDB = require("./db/connect")
require("dotenv").config()
const session = require('express-session');
const bodyParser = require('body-parser');

const block = require("./routes/blockchainRoute")
const users = require("./routes/usuarioRoute")
const addNetwork = require("./addNetwork")
//inicia o express
const app = express()

// session
app.use(session({ secret: "ajdosifjaosidfj" }));
app.use(bodyParser.urlencoded({ extended:true }));

//middleware
app.use(express.json())

//routes
app.use("/usuario", users)
app.use("/block", block)

//registra usuario na blockchain diretamente
app.post("/testes", async (req, res) => {
	let userId = req.body.userId
	let rh = true

	await addNetwork.registerOnNetwork(userId, rh).then((response) => {
		//return error if error in response
		if (
			typeof response === "object" &&
			"error" in response &&
			response.error !== null
		) {
			res.json({
				error: response.error,
			})
		} else {
			//else return success
			res.json({
				success: response,
			})
		}
	})

	console.log(`userId: ${userId} -`)
})
//port
const port = 3000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(3000, console.log(`servidor rodando na porta ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start()
