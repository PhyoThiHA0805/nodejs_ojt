const http = require('http');

const options = {
    host: 'localhost',
    port: '3000',
    path: '/index.html'  
}

const callback = (response) => {
    let body = '';
    console.log('Status Code', response.statusCode)
    response.on('data', (data) => {
        body += data;
    })
    
    response.on('end', () => { 
        console.log(body);
    })
}

req = http.request(options, callback);
req.end();