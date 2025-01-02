import {getRepository} from "typeorm";

import {Contract} from "../entity/Contract";

export class ContractService {

    contractRepository = getRepository(Contract);

    // 保存合同
    async saveContract(params: any) {

        try {

            const contract = new Contract();

            contract.oldName = params.oldName;

            contract.newName = params.newName;

            contract.text = params.text;

            contract.path = params.path;

            contract.html_text = params.text;

            await this.contractRepository.save(contract);

            return {
                code: 200,
                data: contract,
                message: '合同保存成功'
            }
        } catch (e) {
            console.log(e)
            return {
                code: -1,
                message: '合同保存失败'
            }
        }

    }

    async getContractList() {
        try {
            let data = await this.contractRepository.find()
            return {
                code: 200,
                data: data,
                message: '合同保存成功'
            }
        } catch (e) {
            console.log(e)
            return {
                code: -1,
                message: '合同获取失败'
            }
        }

    }

    async deleteContract(id: string) {
        try {
            console.log(id)
            // @ts-ignore
            await this.contractRepository.delete(id)
            return {
                code: 200,
                message: '合同删除成功'
            }
        } catch (e) {
            console.log(e)
            return {
                code: -1,
                message: '合同删除失败'
            }
        }
    }

    async updateContract(id: string, htmlText: any) {

        try {
            console.log(id)
            // @ts-ignore
            let data = await this.contractRepository.findOne({ where: { id: id } })
            // @ts-ignore
            data?.html_text = htmlText
            // @ts-ignore
            await this.contractRepository.save(data);
            console.log(data)
            return {
                code: 200,
                message: '合同修改成功'
            }
        } catch (e) {
            console.log(e)
            return {
                code: -1,
                message: '合同修改失败'
            }
        }
    }
}