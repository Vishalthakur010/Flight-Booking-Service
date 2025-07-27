const {StatusCodes}=require('http-status-codes')
const {Booking}=require('../models')
const crudRepository = require('./crud-repository')
const { Op } = require('sequelize')
const {Enums} = require('../utils/common')
const {BOOKED, CANCELLED}= Enums.BOOKING_STATUS

class BookingRepository extends crudRepository{
    constructor(){
        super(Booking)
    }

    async createBooking(data, transaction){
        const response = await Booking.create(data, {transaction : transaction})
        return response
    }

    async get(data, transaction) {
        const response = await Booking.findByPk(data, {transaction : transaction})
        if(!response){
            throw new AppError("Not able to find the resourse", StatusCodes.NOT_FOUND)
        }
        return response
    }

    async update(id, data, transaction) {
        const response = await Booking.update(data, {
            where: {
                id: id
            }
        }, {transaction : transaction})
        return response
    }

    async cancelOldBookings(timeStamp) {
        const response = await Booking.update({ status: CANCELLED }, {
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timeStamp
                        }
                    },
                    {
                        status : {
                            [Op.ne] : BOOKED
                        }
                    },
                    {
                        status : {
                            [Op.ne] : CANCELLED
                        }
                    }
                ]
            }
        })
        return response
    }
}

module.exports=BookingRepository