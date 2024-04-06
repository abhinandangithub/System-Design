const express = require('express')

const app = express();

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self';"+  // load only from own source don't trust any one
        // Refused to load the script 'http://unsecure.com/abc.js' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'default-src' is used as a fallback.
        "script-src 'self' 'nonce-randomkey' 'unsafe-inline' http://unsecure.com/abc.js;" // allow only from source http://unsecure.com/abc.js
    );
    next()
})
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.listen(3010, () => {
    console.log('app started on port 3010')
})