const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const getUserFromID = require('rewire')('../../../src/helpers/getUserFromID')

describe('helper function getUserFromID', () => {
  const sandbox = createSandbox()
  const USERS_API = {
    BASE_URL: 'https://example.com',
    USER_PATH: '/user/{id}'
  }
  let get

  beforeEach(() => {
    get = sandbox.stub()
    getUserFromID.__set__({ get, USERS_API })
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should throw an error if the user does not exist', done => {
    const incorrectUserID = 10000
    const errorFromGet = new Error('Request failed with status code 404')
    get.reset()
    get
      .withArgs('https://example.com/user/10000')
      .rejects(errorFromGet)

    getUserFromID(incorrectUserID)
      .then(() => done(new Error('should throw an error')))
      .catch(error => {
        expect(error).to.deep.equal(errorFromGet)
        done()
      })
      .catch(done)
  })
  it('should return the data for a given user id', async () => {
    const validUserId = 12
    const data = { id: validUserId, name: 'Kevin' }
    get.reset()
    get
      .withArgs('https://example.com/user/12')
      .resolves({ data })

    expect(await getUserFromID(validUserId)).to.deep.equal(data)
  })
})
