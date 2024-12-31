import { UserService } from './../../server/UserService';
import express from 'express'

export const userRouter = express.Router()

const prefix = "/api"


userRouter.get(`${prefix}/test`, async (req, res) => {
    let _json_ = {
        message: 'success',
    }
    res.status(200).json(_json_)
})

userRouter.post(`${prefix}/saveUser`, async (req, res) => {

    const userService = new UserService()

    let _data_ = req.query

    console.log(req.query)

    let data = await userService.saveUser(_data_)

    res.status(200).json(data)
})


userRouter.post(`${prefix}/login`, async (req, res) => {

    const userService = new UserService()

    let _data_ = req.query

    let data = await userService.login(_data_)

    res.status(200).json(data)
})

