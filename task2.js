import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline, Transform } from 'stream';

const writeCsvToTxtLineByLine = async (fromPath, toPath) => {
    try {
        const transform = new Transform({
            transform: function(chunk, encoding, callback) {
                callback(null, converter(JSON.parse(chunk.toString())));
            }
        })

        const converter = (json) =>  {
            const keys = Object.keys(json)[0].split(';');
            const values = Object.values(json)[0].split(';');
            const result = {};

            for (let i = 0; i < keys.length; i++) {
                if (values) {
                    result[keys[i]] = values[i];
                } else {
                    result[keys[i][0]] = keys[i][1];
                }
            }

            return Buffer.from(JSON.stringify(result));
        };

        await pipeline(
            csv().fromFile(fromPath),
            transform,
            fs.createWriteStream(toPath),
            err => {
                if (err) {
                    console.log('Pipeline encountered an error:', err.message);
                } else {
                    console.log('Pipeline ended');
                }
            }
        );
    } catch (err) {
       console.error(err.message);
    }
}

const csvFilePath = path.join(__dirname, 'csv', 'Book1.csv');
const txtFilePath = path.join(__dirname, 'new_file.txt');
writeCsvToTxtLineByLine(csvFilePath, txtFilePath);
