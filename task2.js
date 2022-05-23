import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const writeCsvToTxtLineByLine = async (fromPath, toPath) => {
    const keyToRemove = 'Amount';
    const readStream = fs.createReadStream(fromPath);
    const writeStream  =  fs.createWriteStream(toPath, 'utf8');
    const transform = csv({downstreamFormat: 'line'})
        .subscribe((item) => {
            Object.entries(item).forEach(([key, value]) => {
                delete item[key];
                if(key !== keyToRemove) {
                    item[key.toLowerCase()] = value;
                }
            })
    });

    pipeline(readStream, transform, writeStream, (err) =>{
        if (err) {
            console.error('Error:', err.message)
        }
    });
}

const csvFilePath = path.join(__dirname, 'csv', 'book.csv');
const txtFilePath = path.join(__dirname, 'new_file.txt');
writeCsvToTxtLineByLine(csvFilePath, txtFilePath);
