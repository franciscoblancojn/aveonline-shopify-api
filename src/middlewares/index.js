require('module-alias/register')
const fs = require('fs');

exports.index = async (req, res, next) => {
    const {shop , session } = req.query;
    if(session){
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
            return
        });
    }else if (shop) {

        // const state = nonce();
        // // shopify callback redirect
        // const redirectURL = process.env.SHOPIFY_APP_URL + '/auth/callback';

        // // Install URL for app install
        // const shopifyURL = 'https://' + shop +
        //     '/admin/oauth/request_grant?client_id=' + process.env.SHOPIFY_API_KEY +
        //     '&scope=' + process.env.SHOPIFY_API_SCOPES +
        //     '&redirect_uri=' + redirectURL +
        //     '&state=' + state ;

        // res.cookie('state', state);
        // res.redirect(shopifyURL);
    } else {
        return res.status(400).send({
            type:"error",
            error:'Missing "Shop Name" parameter!!'
        });
    }
}