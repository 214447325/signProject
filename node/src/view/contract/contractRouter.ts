import express from 'express'

import multer from 'multer';

import fs from 'fs';

// @ts-ignore
import PDFParser from 'pdf-parse';

import {ContractService} from "../../server/ContractService";

export const contractRouter = express.Router()

const prefix = "/contract"


// 设置存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // @ts-ignore
        cb(null, process.env.ROOT_FILE_PATH) // 确保这个文件夹已经存在
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    }
})
// 文件上传
const upload = multer({storage: storage})

contractRouter.post(`${prefix}/upload`, upload.single('file'), async (req, res) => {
    console.log('contract test')
    const contractService = new ContractService()
    // @ts-ignore
    const pdfPath = process.env.ROOT_FILE_PATH + req.file?.filename
    let str = '';
    // console.log(req)
    let _dataJson_ = null
    // @ts-ignore
    fs.readFile(pdfPath, (err, pdfBuffer) => {
        if (err) {
            console.log(err);
            _dataJson_ = {
                code: -1,
                message: '合同保存失败'
            }
            res.status(200).json(_dataJson_)
        }
        // @ts-ignore
        PDFParser(pdfBuffer).then(async  (pdfData: { text: string; }) => {
            const pages = pdfData.text.split('\n');
            for (let i = 1; i < pages.length; i++) {
                str = str + pages[i] + '<br>'
            }
            console.log(str)
            // @ts-ignore
            const original_name = Buffer.from(req.file?.originalname, "latin1").toString("utf8");
            // @ts-ignore
            let _data_ = {
                oldName: original_name,
                newName: req.file?.filename,
                text: str,
                // @ts-ignore
                path: process.env.ROOT_FILE_ADDRESS + req.file?.filename
            }
            _dataJson_ = await contractService.saveContract(_data_)
            console.log('contract ==== test')
            res.status(200).json(_dataJson_)
        });
    })


})

contractRouter.get(`${prefix}/list`, async (req, res) => {
    const contractService = new ContractService()
    let data = await contractService.getContractList()
    res.status(200).json(data)
})

contractRouter.delete(`${prefix}/delete`, async (req, res) => {
    const contractService = new ContractService()
    // @ts-ignore
    const id = req.query.id;
    // @ts-ignore
    let _dataJson_ = await contractService.deleteContract(id)

    const name = req.query.name;

    // @ts-ignore
    const filePath = process.env.ROOT_FILE_PATH + name

    // @ts-ignore
    fs.unlink(filePath, (err) => {
        if (err) {
            _dataJson_ = {
                code: -1,
                message: '合同获取失败'
            }
        }
        res.status(200).json(_dataJson_)
    })
})


contractRouter.post(`${prefix}/update`, async (req, res) => {
    console.log('contract test')
    console.log(req.body)
    const contractService = new ContractService()
    // @ts-ignore
    let _dataJson_ = await contractService.updateContract(req.body.id, req.body.htmlText)
    res.status(200).json(_dataJson_)
})

