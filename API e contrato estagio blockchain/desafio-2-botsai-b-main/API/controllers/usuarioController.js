const user = require("../models/usuarioModel")
const Network = require("../addNetwork")

const listAllUsers = async (req, res) => {
	try {
		const allUsers = await user.find()
		res.status(200).json(allUsers)
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const listUser = async (req, res) => {
	try {
		const { id: userId } = req.params
		const oneUser = await user.findOne({ _id: userId })
		if (!oneUser) {
			return res
				.status(404)
				.json({ msg: `Nao existe um user com o id: ${userId}` })
		}
		res.status(200).json(oneUser)
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const updateUser = async (req, res) => {
	try {
		const { id: userId } = req.params
		const oneUser = await user.findOneAndUpdate(
			{ _id: userId },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		)
		if (!oneUser) {
			return res
				.status(404)
				.json({ msg: `Nao existe um user com o id: ${userId}` })
		}
		res.status(200).json(oneUser)
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const deleteUser = async (req, res) => {
	try {
		const { id: userId } = req.params
		const oneUser = await user.findOneAndDelete({ userID: userId })
		if (!oneUser) {
			return res
				.status(404)
				.json({ msg: `Nao existe um user com o id: ${userId}` })
		}
		res.status(204).json({ msg: "deletado com sucesso!" })
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

module.exports = {
	listAllUsers,
	listUser,
	updateUser,
	deleteUser,
}
