const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const findDenizensByCityOperator = require('rewire')('../../../src/operators/findDenizensByCity')
const testData = {
  usersInRangeOfLondon: require('../../data/usersInRangeOfLondon.json'),
  usersLivingInLondon: require('../../data/usersLivingInLondon.json')
}

describe('operator function findDenizensByCity', () => {
  const sandbox = createSandbox()
  const CITIES = {
    LONDON: 'London'
  }
  let getUsersLivingInCity, getUserIDsInRangeOfCity, getUserFromID

  beforeEach(() => {
    getUsersLivingInCity = sandbox.stub()
    getUsersLivingInCity
      .withArgs(CITIES.LONDON)
      .resolves(testData.usersLivingInLondon)
    getUsersLivingInCity
      .resolves([])

    getUserIDsInRangeOfCity = sandbox.stub()
    getUserIDsInRangeOfCity
      .withArgs(CITIES.LONDON)
      .resolves(testData.usersInRangeOfLondon.map(({ id }) => id))
    getUserIDsInRangeOfCity
      .resolves([])

    getUserFromID = sandbox.stub()
    testData.usersInRangeOfLondon.forEach(user => {
      getUserFromID
        .withArgs(user.id)
        .resolves(user)
    })

    findDenizensByCityOperator.__set__({
      CITIES,
      getUsersLivingInCity,
      getUserIDsInRangeOfCity,
      getUserFromID
    })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should resolve an empty data object when there are no users living in London or within range of it', async () => {
    getUsersLivingInCity.reset()
    getUsersLivingInCity.withArgs(CITIES.LONDON).resolves([])
    getUserIDsInRangeOfCity.reset()
    getUserIDsInRangeOfCity.withArgs(CITIES.LONDON).resolves([])

    expect(await findDenizensByCityOperator()).to.deep.equal({ data: [] })
  })
  it('should resolve a data object that contains all the users who live in London when there are users living in London and no users in range of London', async () => {
    getUserIDsInRangeOfCity.reset()
    getUserIDsInRangeOfCity.withArgs(CITIES.LONDON).resolves([])

    expect(await findDenizensByCityOperator()).to.deep.equal({
      data: testData.usersLivingInLondon
    })
  })
  it('should resolve a data object that contains all the users in range of London when there are users in range and no users living in London', async () => {
    getUsersLivingInCity.reset()
    getUsersLivingInCity.withArgs(CITIES.LONDON).resolves([])

    expect(await findDenizensByCityOperator()).to.deep.equal({
      data: testData.usersInRangeOfLondon
    })
  })
  it('should include both users living and within range of London when both sets exist but have no overlap', async () => {
    expect(await findDenizensByCityOperator()).to.deep.equal({
      data: [...testData.usersLivingInLondon, ...testData.usersInRangeOfLondon]
    })
  })
  it('should only include a user once if they live in London and are within range', async () => {
    const someUserLivingInLondon = testData.usersLivingInLondon[0]
    const usersInRange = [...testData.usersInRangeOfLondon, someUserLivingInLondon]

    getUserIDsInRangeOfCity.reset()
    getUserIDsInRangeOfCity
      .withArgs(CITIES.LONDON)
      .resolves(usersInRange.map(({ id }) => id))
    getUserIDsInRangeOfCity
      .resolves([])

    getUserFromID.reset()
    usersInRange.forEach(user => {
      getUserFromID
        .withArgs(user.id)
        .resolves(user)
    })

    expect(await findDenizensByCityOperator()).to.deep.equal({
      data: [...testData.usersLivingInLondon, ...testData.usersInRangeOfLondon]
    })
  })
})
