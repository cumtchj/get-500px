const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express();

//跨域解决
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//静态资源
app.use(express.static(path.join(__dirname, 'public')))

//请求
app.get('/api/get-pic', (req, res) => {
    let id = decodeURIComponent(req.query.searchUrl).split(/\//g).filter(i => i.match(/\d{9}/))[0];
    let query = {
        image_size: [2048],
        expanded_user_info: true,
        include_tags: true,
        include_geo: true,
        is_following: true,
        include_equipment_info: true,
        vendor_photos: true,
        include_licensing: true,
        include_releases: true,
        liked_by: 1,
        following_sample: 100,
        ids: id
    };
    console.log(query)
    axios.get('https://api.500px.com/v1/photos', { params: {...query } })
        .then(data => {
            console.log(data.data.photos[id].images[0].url)
            res.send(data.data.photos[id].images[0].url)
        }).catch(err => {
            console.log(err)
        })
})

app.listen(7010, () => { console.log('serverstart') })