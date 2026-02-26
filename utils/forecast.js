const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=c19970ede5e8858c88198647ae0af507&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const { temperature: temp, weather_descriptions, feelslike: feelsLike } = body.current
            const descr = weather_descriptions[0]
            callback(null, 'It is currently ' + temp + ' degrees outside and ' + descr + '. ' +
                'It feels like ' + feelsLike + ' degrees out.')
        }
    })
}

module.exports = forecast
