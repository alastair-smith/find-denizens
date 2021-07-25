const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const getUsersLivingInCity = require('rewire')('../../../src/helpers/getUsersLivingInCity')

describe('helpers function getUsersLivingInCity', () => {
  const sandbox = createSandbox()

  const cityName = 'Leeds'
  const users = [
    { id: 1, name: 'Ken' },
    { id: 2, name: 'Tracy' }
  ]
  const USERS_API = {
    BASE_URL: 'https://example.com',
    USERS_LIVING_IN_CITY_PATH: '/city/{city}/users'
  }
  const errorInGet = new Error('some error in the GET request')
  let get
  beforeEach(() => {
    get = sandbox.stub()
    get
      .withArgs('https://example.com/city/Leeds/users')
      .resolves({ data: users })

    getUsersLivingInCity.__set__({
      get,
      USERS_API
    })
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should return an empty array when no users live in the provided city', async () => {
    get.reset()
    get
      .withArgs('https://example.com/city/Leeds/users')
      .resolves({ data: [] })

    expect(await getUsersLivingInCity(cityName)).to.deep.equal([])
  })
  it('should return the list of users who live in the city, including the city name', async () => {
    const expectedUsers = [
      { id: 1, name: 'Ken', city: 'Leeds' },
      { id: 2, name: 'Tracy', city: 'Leeds' }
    ]

    expect(await getUsersLivingInCity(cityName)).to.deep.equal(expectedUsers)
  })
  it('should throw any errors from the data retrieval up to the caller', done => {
    get.reset()
    get
      .withArgs('https://example.com/city/Leeds/users')
      .rejects(errorInGet)

    getUsersLivingInCity(cityName)
      .then(() => done(new Error('should throw an error')))
      .catch(error => {
        expect(error).to.deep.equal(errorInGet)
        done()
      })
      .catch(done)
  })
})
