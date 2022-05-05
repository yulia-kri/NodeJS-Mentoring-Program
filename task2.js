import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const writeCsvToTxtLineByLine = (fromPath, toPath) => {
    try {
        const writeStream = fs.createWriteStream(toPath);
        csv()
            .fromFile(fromPath)
            .subscribe()
            .pipe(writeStream);
    } catch (err) {
        console.error(err.message);
    }
}

const csvFilePath = path.join(__dirname, 'csv', 'Book1.csv');
const txtFilePath = path.join(__dirname, 'new_file.txt');
writeCsvToTxtLineByLine(csvFilePath, txtFilePath);
