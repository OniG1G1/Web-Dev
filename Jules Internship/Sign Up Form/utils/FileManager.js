const fs = require('fs');

class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    save(data) {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, jsonData, 'utf8');
    }

    load() {
        if (!fs.existsSync(this.filePath)) return [];
        const rawData = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(rawData);
    }
}

module.exports = FileManager;
