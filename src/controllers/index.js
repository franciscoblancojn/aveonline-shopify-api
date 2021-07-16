require('module-alias/register')
const crypto = require('crypto');
const request = require('request-promise');
const querystring = require('querystring');
const dotenv = require('dotenv');
const functions = require('@functions/index')

const fs = require('fs');

dotenv.config();

exports.index = async (req, res, next) =>{
    fs.readFile(__dirname + '/../page/app.html', (err, html) => {
        if (err) {
            res.status(400).send({
                type:"error",
                error:`${err}`
            })
            return
        }    
        res.send(`
            <script>
                appJson = ${JSON.stringify(req.query)};
            </script>
            ${html}
        `)   
    });
}
exports.auth = async (req, res, next) =>{
    const {shop, hmac, code, state} = req.query;
    const queryMap = Object.assign({}, req.query);
    delete queryMap['signature'];
    delete queryMap['hmac'];

    const message = querystring.stringify(queryMap);
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHash = Buffer.from(crypto.createHmac('sha256', process.env.SHOPIFY_API_SECRET_KEY).update(message).digest('hex'), 'utf-8');

    var hashEquals = false;

    try {
        hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
    } catch (e) {
        hashEquals = false;
    }

    if (!hashEquals) {
        return res.status(400).send('HMAC validation failed');
    }
    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET_KEY,
        code,
    };

    request.post(accessTokenRequestUrl, {json: accessTokenPayload})
        .then((accessTokenResponse) => {
            const accessToken = accessTokenResponse.access_token;
            const shopRequestURL = 'https://' + shop + '/admin/api/2020-04/shop.json';
            const shopRequestHeaders = {'X-Shopify-Access-Token': accessToken};
            functions.saveToken(shop,accessToken)
            request.get(shopRequestURL, {headers: shopRequestHeaders})
                .then((shopResponse) => {
                    res.redirect('https://' + shop + '/admin/apps/'.process.env.NAME);
                })
                .catch((error) => {
                    res.status(error.statusCode).send(error.error.error_description);
                });
        })
        .catch((error) => {
            res.status(error.statusCode).send(error.error.error_description);
        });
}