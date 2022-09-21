const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema({
	userID: { type: String, required: true },
	nome: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true },
	rh: { type: Boolean, required: true },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Usuario", UsuarioSchema)
