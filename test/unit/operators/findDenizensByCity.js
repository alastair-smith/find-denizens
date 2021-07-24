const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const findDenizensByCityOperator = require('rewire')('../../../src/operators/findDenizensByCity')
const testData = {
  usersLivingInLondon: require('../../data/usersLivingInLondon.json')
}

describe('operator function findDenizensByCity', () => {
  const sandbox = createSandbox()
  const CITIES = {
    LONDON: 'London'
  }
  let getUsersLivingInCity

  beforeEach(() => {
    getUsersLivingInCity = sandbox.stub()
    getUsersLivingInCity
      .withArgs(CITIES.LONDON)
      .resolves(testData.usersLivingInLondon)
    getUsersLivingInCity
      .resolves([])

    findDenizensByCityOperator.__set__({
      getUsersLivingInCity
    })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should resolve an empty data object when there are no users living in London or within range of it', async () => {
    getUsersLivingInCity.reset()
    getUsersLivingInCity.withArgs(CITIES.LONDON).resolves([])

    expect(await findDenizensByCityOperator()).to.deep.equal({ data: [] })
  })
  it('should resolve a data object that contains all the users who live in London when there are users living in London and no users in range of London', async () => {
    expect(await findDenizensByCityOperator()).to.deep.equal({
      data: testData.usersLivingInLondon
    })
  })
})
