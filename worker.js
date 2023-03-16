const https = require("https");
const dotenv = require('dotenv');

dotenv.config();

setInterval(() => {
    https.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', (res) => {
        let rawData = '';
        res.on('data', chunk => {
            rawData += chunk;
        });
        res.on('end', () => {
            JSON.parse(rawData).forEach(item => {
                if (item.cc === 'USD') {
                    let data = '';
                    const request = https.request({
                        hostname: 'www.google-analytics.com',
                        path: `/mp/collect?api_secret=${process.env.API_SECRET}&measurement_id=${process.env.MEASUREMENT_ID}`,
                        method: 'POST'
                    }, (res) => {
                        res.on('data', (chunk) => {
                            data += chunk;
                        });
                        res.on('end', () => {
                            console.log(data);
                            console.log(`-SENT ${item.rate}-`);
                        });
                    });
                    request.write(JSON.stringify({
                        client_id: 'C92C0BABDC764D8674BCEA14A55D867D',
                        events: [{
                            name: 'usd_exchange',
                            params: {
                                value: item.rate
                            }
                        }]
                    }));
                    request.end();
                }
            });
        });
    });
}, 10000);