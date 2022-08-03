const { Wallets, Gateway } = require("fabric-network")
const fs = require("fs")
const path = require("path")
const user = require("../models/usuarioModel")
const valeu = require("../models/valeuModel")
const Network = require("../addNetwork")
const { LOADIPHLPAPI } = require("dns")

// capture network variables from config.json
const configPath = path.join(process.cwd(), "config.json")
const configJSON = fs.readFileSync(configPath, "utf8")
const config = JSON.parse(configJSON)
let connection_file = config.connection_file

const ccpPath = path.join(process.cwd(), connection_file)
const ccpJSON = fs.readFileSync(ccpPath, "utf8")
const ccp = JSON.parse(ccpJSON)

const userExists = async (req, res) => {
	if (req.session.identidade) {
		const { userId } = req.body
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
			
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction("userExists", userId)
			
			console.log(response)
			
			res.status(200).json(JSON.parse(response.toString()))
		} catch (error) {
			console.log(error)
		} 
	} else {
		res.status(403).json("Usuário não está logado!")
	}
}

//creates a user on offchain db, generates a id, and then register the user on blockchain with that id
const createUser = async (req, res) => {
	//generates a random 6 number id
	const getIdNumber = () => {
		var n = Math.floor(Math.random() * 1000000)
		if (n < 100000) {
			return getIdNumber()
		} else {
			return n
		}
	}

	const payload = {
		userID: String(getIdNumber()),
		nome: req.body.nome,
		email: req.body.email,
		rh: req.body.rh,
	}
	console.log("Payload to be sent:")
	console.log(payload)

	//create user on offchain db
	await user.create(payload).then((response) => {
		console.log("1 - Create offchain db register")
		if (
			typeof response === "object" &&
			"error" in response &&
			response.error !== null
		) {
			console.log("1 - Error")
			return res.status(500).json({
				error: response.error,
			})
		} else {
			//register user on blockchain with 'rh' attribute or not
			console.log("2 - Register on network")
			Network.registerOnNetwork(payload.userID, payload.rh).then((response) => {
				//return error if error in response
				if (
					typeof response === "object" &&
					"error" in response &&
					response.error !== null
				) {
					console.log(response.error)
					res.status(500).json({
						error: response.error,
					})

					//deletes previous created user
					user.findOneAndDelete({ userID: payload.userID }).then(() => {
						console.log("2 - Error")
						console.log("2 - Delete offchain db register")
						return
					})
				} else {
					//else return success
					console.log("2 - Registered on network")
					return res.status(201).json({
						success: response.sucess,
						userID: payload.userID,
						chaves: response.chaves,
					})
				}
			})
		}
	})
}

const readUser = async (req, res) => {
	if (req.session.identidade) {
		const { userId } = req.body
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
			
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction("readUser", userId)
			
			console.log(response)
			
			res.status(200).json(JSON.parse(response.toString()))
		} catch (error) {
			console.log(error)
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const deleteUser = async (req, res) => {
	const userID = req.body.userID

	if (req.session.identidade) {
		try {
			const umUsuario = await user.findOneAndDelete({ userID: userID })
			if (!umUsuario) {
				return res
					.status(404)
					.json({ msg: `Nao existe um usuario com o id: ${userID}` })
			}
			console.log("1 - Deleted from offchain db")
		} catch (error) {
			res.status(500).json({ msg: error })
		}

		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()

			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})

			const network = await gateway.getNetwork("mychannel")

			const contract = await network.getContract("smart-contract")

			await contract.submitTransaction("deleteUser", userID)
			console.log("2 - Deleted from blockchain")

			await gateway.disconnect()

			res.status(200).json({ success: true })
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const sendValue = async (req, res) => {
	if (req.session.identidade) {
		const { userId2, value, message } = req.body
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
			
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction(
				"sendPoints",
				req.session.identidade,
				userId2,
				value
				)
				
				
			const payload = {
				userIdSend: req.session.identidade,
				userIdReceived: userId2,
				message: message
			}
			const sendValeu = await valeu.create(payload)
			
			res.status(200).json(JSON.parse(response.toString(), sendValeu))
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const startCycle = async (req, res) => {
	if (req.session.identidade) {
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
			
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction("startCycle")
			
			res.status(200).json(JSON.parse(response.toString()))
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const redeemPoints = async (req, res) => {
	if (req.session.identidade) {
		const { value } = req.body
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
			
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction(
				"redeemPoints",
				req.session.identidade,
				value
				)
			res.status(200).json(JSON.parse(response.toString()))
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const endCycle = async (req, res) => {
	if (req.session.identidade) {
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
				
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction("endCycle")
			
			res.status(200).json(JSON.parse(response.toString()))
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const getHistory = async (req, res) => {
	if (req.session.identidade) {
		try {
			const walletPath = path.join(process.cwd(), "wallet")
			const wallet = await Wallets.newFileSystemWallet(walletPath)

			const gateway = new Gateway()
			await gateway.connect(ccp, {
				wallet,
				identity: req.session.identidade,
				discovery: { enabled: true, asLocalhost: true },
			})
			
			const network = await gateway.getNetwork("mychannel")
			
			const contract = await network.getContract("smart-contract")
			
			const response = await contract.submitTransaction("TxHistory")
			
			res.status(200).json(JSON.parse(response.toString()))
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		return res.status(403).json("Usuário não está logado!")
	}
}

const loginUser =  async (req, res) => {
	try {
		const { nome, email } = req.body;
		const userFind = await user.findOne({ email: email })
		if (!userFind) {
			return res
				.status(404)
				.json({ msg: `Nao existe um usuario com o id: ${usuarioId}` })
		}
		var aux = {...userFind}
		if(aux._doc.nome = nome && aux._doc.email == email){
			req.session.identidade = aux._doc.userID;
			res.status(200).json({ msg: `Usuario ${nome} logado com sucesso!` });
		}
	} catch (error) {
		res.status(400).json({ msg: error })	
	}
}


const logoutUser = async (req, res) => {
	try{
		if(req.session.identidade){
			req.session.identidade = false;
			res.status(200).json({ msg: "Usuario efetuou logout com sucesso!" });
		}else {
			res.status(400).json({ msg: "Não existe usuario logado no momento!" });
		}


	} catch (error) {
		res.status(500).json(error);
	}
}

module.exports = {
	userExists,
	createUser,
	readUser,
	deleteUser,
	sendValue,
	startCycle,
	redeemPoints,
	endCycle,
	getHistory,
	loginUser,
	logoutUser
}
