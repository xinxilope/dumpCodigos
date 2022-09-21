const express = require("express")
const router = express.Router()
const {
	listAllUsers,
	listUser,
	updateUser,
	deleteUser,
} = require("../controllers/usuarioController")

router.route("/").get(listAllUsers)
router.route("/").post()
router.route("/:id").get(listUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser)

module.exports = router
