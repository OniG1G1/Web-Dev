const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    /*
    const url = req.url;

    if (url === '/' || url === '/index.html' || url === '/now') {
        servePage(new Date());
    } else if (url === '/yesterday') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        servePage(yesterday);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page not found');
    }
    */
    const url = req.url;
    const date = new Date();
    let dateMsg;

    if (url !== '/' && url !== '/index.html' && url !== '/now' && url !== '/yesterday' && url !== '/tomorrow') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page not found');
        return;
    }

    switch (url) {
        case '/yesterday':
            date.setDate(date.getDate() - 1);
            dateMsg = "Yesterday was " + getWeekday(date.getDay()) + ".";
            break;
        case '/tomorrow':
            date.setDate(date.getDate() + 1);
            dateMsg = "Tomorrow will be " + getWeekday(date.getDay()) + ".";
            break;
        default:
            dateMsg = "Today is " + getWeekday(date.getDay());
    }

    servePage(dateMsg)

    // helper function to serve HTML with the given date
    function servePage(datemsg) {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading HTML file');
                return;
            }

            const pageWithDate = data.replace('{{dateMessage}}', datemsg);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(pageWithDate);
        });
    }

    function getWeekday(numDay) {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[numDay];
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
