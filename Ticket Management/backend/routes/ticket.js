const express = require('express')
const { createTicket, getData, deleteData, getsingleData, updatesingleData } = require('../controllers/ticketController')
const router = express.Router()

router.route('/ticket').post(createTicket)
router.route('/getdata').get(getData)
router.route('/deletedata/:id').delete(deleteData)
router.route('/getsingledata/:id').get(getsingleData)
router.route('/updatesingledata/:id').put(updatesingleData)


module.exports=router 