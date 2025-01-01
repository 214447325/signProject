import {getRepository} from "typeorm";

import {Contract} from "../entity/Contract";

export class ContractService {

    contractRepository = getRepository(Contract);

    // 保存合同
    public saveContract(params: any) {

        try {

            const contract = new Contract();

            contract.oldName = params.oldName;

            contract.newName = params.newName;

            contract.text = params.text;

            contract.path = params.path;

            this.contractRepository.save(contract);

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
}