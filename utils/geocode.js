const request = require ('request')

const geoCode = (address, callback) =>   {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFsYXJyeWEiLCJhIjoiY21rZW9idjhnMDh6MTNncTBoMzlycG01ZyJ9.lU5uY87IPHZWudY310naSQ&limit=1'

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else
            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,


            })

    })
}

module.exports = geoCode