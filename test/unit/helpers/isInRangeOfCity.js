const expect = require('../../helpers/expect')
const isInRangeOfCity = require('rewire')('../../../src/helpers/isInRangeOfCity')

describe('helper function isInRangeOfCity', () => {
  const city = 'Glasgow'

  const MAX_RANGE = 80467.2 // 50 miles in metres
  const CITY_COORDINATES = {
    [city]: { latitude: 55.860916, longitude: -4.251433 }
  }
  beforeEach(() => {
    isInRangeOfCity.__set__({
      MAX_RANGE, CITY_COORDINATES
    })
  })
  it('should return true if the latitude and longitude are the same as the city centre', () => {
    const rangeResult = isInRangeOfCity(city)(CITY_COORDINATES[city])

    expect(rangeResult).to.equal(true)
  })
  it('should return true if the latitude is the same as the city centre and the longitude is just within the max range', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: CITY_COORDINATES[city].latitude,
      longitude: -2.973414
    })
    expect(rangeResult).to.equal(true)
  })
  it('should return false if the latitude is the same as the city centre and the longitude is just outside the max range', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: CITY_COORDINATES[city].latitude,
      longitude: -2.914860
    })
    expect(rangeResult).to.equal(false)
  })
  it('should return true if the latitude is the same as the city centre and the longitude is just within the max range (negative)', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: CITY_COORDINATES[city].latitude,
      longitude: -5.434793
    })
    expect(rangeResult).to.equal(true)
  })
  it('should return false if the latitude is the same as the city centre and the longitude is just outside the max range (negative)', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: CITY_COORDINATES[city].latitude,
      longitude: -5.653593
    })
    expect(rangeResult).to.equal(false)
  })
  it('should return true if the longitude is the same as the city centre and the latitude is just within the max range', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: 56.552272,
      longitude: CITY_COORDINATES[city].longitude
    })
    expect(rangeResult).to.equal(true)
  })
  it('should return false if the longitude is the same as the city centre and the latitude is just outside the max range', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: 56.602519,
      longitude: CITY_COORDINATES[city].longitude
    })
    expect(rangeResult).to.equal(false)
  })
  it('should return true if the longitude is the same as the city centre and the latitude is just within the max range (negative)', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: 55.144324,
      longitude: CITY_COORDINATES[city].longitude
    })
    expect(rangeResult).to.equal(true)
  })
  it('should return false if the longitude is the same as the city centre and the latitude is just outside the max range (negative)', () => {
    const rangeResult = isInRangeOfCity(city)({
      latitude: 55.106433,
      longitude: CITY_COORDINATES[city].longitude
    })
    expect(rangeResult).to.equal(false)
  })
  it('should return false for the corners, i.e. when the latitude and longitude are both just within the max range', () => {
    expect(
      isInRangeOfCity(city)({ latitude: 56.552272, longitude: -2.973414 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 56.552272, longitude: -5.434793 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 55.144324, longitude: -5.434793 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 55.144324, longitude: -2.973414 })
    ).to.equal(false)
  })
  it('should return true for test cases within the radius', () => {
    expect(
      isInRangeOfCity(city)({ latitude: 55.368445, longitude: -4.313178 })
    ).to.equal(true)
    expect(
      isInRangeOfCity(city)({ latitude: 55.837537, longitude: -3.367877 })
    ).to.equal(true)
    expect(
      isInRangeOfCity(city)({ latitude: 56.244214, longitude: -5.032361 })
    ).to.equal(true)
  })
  it('should return false for test cases outside the radius', () => {
    expect(
      isInRangeOfCity(city)({ latitude: 56.417551, longitude: -5.465500 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 56.486177, longitude: -3.250695 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 55.115563, longitude: -3.301491 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 43.609051, longitude: -101.709265 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: -9.581861, longitude: -28.586628 })
    ).to.equal(false)
    expect(
      isInRangeOfCity(city)({ latitude: 64.716870, longitude: 114.850098 })
    ).to.equal(false)
  })
})
