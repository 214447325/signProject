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
    console.log(req.file?.originalname)

    // @ts-ignore
    fs.readFile(pdfPath, (err, pdfBuffer) => {
        if (err) {
            console.log(err);
            return;
        }
        // @ts-ignore
        return PDFParser(pdfBuffer).then((pdfData: { text: string; }) => {
            const pages = pdfData.text.split('\n\n');
            for (let i = 1; i < pages.length; i++) {
                str = str + pages[i]
            }
            console.log(str)
            let _data_ = {
                oldName: req.file?.originalname,
                newName: req.file?.filename,
                text: str,
                // @ts-ignore
                path: process.env.ROOT_FILE_ADDRESS + req.file?.filename
            }
            let _dataJson_ = contractService.saveContract(_data_)
            res.status(200).json(_dataJson_)
        });
    })
})

contractRouter.get(`${prefix}/list`, async (req, res) => {
    console.log('contract list')
    const contractService = new ContractService()
    let data = await contractService.getContractList()
    res.status(200).json(data)
})