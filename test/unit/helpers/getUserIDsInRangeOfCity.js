const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const getUserIDsInRangeOfCity = require('rewire')('../../../src/helpers/getUserIDsInRangeOfCity')

describe('helpers function getUserIDsInRangeOfCity', () => {
  const sandbox = createSandbox()
  const city = 'Manchester'
  const users = [
    { id: 1, latitude: 1.000001, longitude: 2.000001 },
    { id: 2, latitude: 1.000001, longitude: 2.000001 },
    { id: 5, latitude: 9.000001, longitude: 9.000001 },
    { id: 6, latitude: 1.000001, longitude: 2.000001 },
    { id: 1123, latitude: 9.000001, longitude: 9.000001 },
    { id: 98791, latitude: 1.000001, longitude: 2.000001 }
  ]
  const USERS_API = {
    BASE_URL: 'https://example.com',
    ALL_USERS_PATH: '/all-users'
  }
  let get, isInRangeOfCity, isInRangeOfCityInstance

  beforeEach(() => {
    get = sandbox.stub()
    get
      .withArgs(`${USERS_API.BASE_URL}${USERS_API.ALL_USERS_PATH}`)
      .resolves({ data: users })

    isInRangeOfCityInstance = sandbox.stub()
    isInRangeOfCityInstance
      .withArgs(users[0])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[1])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[3])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[5])
      .returns(true)

    isInRangeOfCityInstance
      .withArgs(users[2])
      .returns(false)
    isInRangeOfCityInstance
      .withArgs(users[4])
      .returns(false)

    isInRangeOfCity = sandbox.stub()
    isInRangeOfCity.withArgs(city).returns(isInRangeOfCityInstance)

    getUserIDsInRangeOfCity.__set__({
      get,
      isInRangeOfCity,
      USERS_API
    })
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should return an empty array if there are no users within range of the city', async () => {
    get
      .withArgs(`${USERS_API.BASE_URL}${USERS_API.ALL_USERS_PATH}`)
      .resolves({ data: [] })

    expect(await getUserIDsInRangeOfCity(city)).to.deep.equal([])
  })
  it('should return all of the user ids if all the users are within range of the city', async () => {
    isInRangeOfCityInstance.reset()
    isInRangeOfCityInstance
      .withArgs(users[0])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[1])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[2])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[3])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[4])
      .returns(true)
    isInRangeOfCityInstance
      .withArgs(users[5])
      .returns(true)

    expect(await getUserIDsInRangeOfCity(city)).to.deep.equal([
      1, 2, 5, 6, 1123, 98791
    ])
  })
  it('should not include user ids of users who are not within range of the city', async () => {
    expect(await getUserIDsInRangeOfCity(city)).to.deep.equal([
      1, 2, 6, 98791
    ])
  })
})
