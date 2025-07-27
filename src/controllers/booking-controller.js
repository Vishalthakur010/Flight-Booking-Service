const { BookingService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common')
const { StatusCodes } = require('http-status-codes')

const inMemDb = {}

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        })
        SuccessResponse.data = response
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    }
    catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function makePayment(req, res) {
    try {
        const idempotencyKey = req.headers['x-idempotency-key']
        if(!idempotencyKey){
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message:'Idempotency key is missing'})
        }
        if(inMemDb[idempotencyKey]){
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message:'Cannot retry on a successfull payment'})
        }
        const response = await BookingService.makePayment({
            bookingId: req.body.bookingId,
            userId: req.body.userId,
            totalCost: req.body.totalCost
        })
        inMemDb[idempotencyKey] = idempotencyKey
        SuccessResponse.data = response
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    }
    catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createBooking,
    makePayment
}