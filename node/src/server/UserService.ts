import { Code, getRepository } from "typeorm";

import { User } from "../entity/User";

import jsonwebtoken from 'jsonwebtoken';

export class UserService {

    userRepository = getRepository(User)
    /**
     * name
     * 添加用户
     */
    public saveUser(params: any) {
        try {

            const user = new User()


            user.username = params.username

            user.password = params.password

            this.userRepository.save(user)

            return {
                code: 200,
                success: '用户添加成功'
            }
        } catch (error) {
            console.log(error)
            return {
                code: -1,
                success: '用户添加失败'
            }
        }
    }

    /**
     * login
     * 登录接口
     */
    async login(params: any) {
        try {
            let data = await this.userRepository.find({ where: { username: params.username, password: params.password } })
            console.log(data[0])
            let _d_ = new Date().getTime()
            const SECRET_KEY = '' + _d_
            const token = jsonwebtoken.sign({ userId: data[0].id }, SECRET_KEY, { expiresIn: '1h' });
            data[0]['token'] = token
            console.log(token)
            console.log(_d_)
            return {
                code: 200,
                data: data[0],
                message: '获取用户'
            }
        } catch (error) {
            console.log(error)
            return {
                code: -1,
                message: '用户不存在'
            }
        }
    }

} 
