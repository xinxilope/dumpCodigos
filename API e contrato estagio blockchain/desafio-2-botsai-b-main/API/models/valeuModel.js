const mongoose = require("mongoose")

const ValeuSchema = new mongoose.Schema({
	userIdSend: { type: String, required: true },
	userIdReceived: { type: String, required: true },
    message: { type: String, required: true },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Valeu", ValeuSchema)
