
import queries from '../queries'

describe('Queries utils', () => {
  it('should parse/format a queries string', () => {
    const queriesObject = queries('a=1&b=2&c=3').toObject()

    expect(queriesObject).toEqual({
      a: '1',
      b: '2',
      c: '3'
    })
  })

  it('should parse/format a queries object', () => {
    const queriesString = queries({
      a: '1',
      b: '2',
      c: '3'
    }).toString()

    expect(queriesString).toEqual('a=1&b=2&c=3')
  })

  it('should parse/format empty params', () => {
    const queriesObject = queries('a=1&b&c=3').toObject()

    expect(queriesObject).toEqual({
      a: '1',
      b: '',
      c: '3'
    })
  })

  it('should parse/format a badly formatted queries string', () => {
    const queriesObject = queries('a=1&&c=3').toObject()

    expect(queriesObject).toEqual({
      a: '1',
      c: '3'
    })
  })

  it('should parse/format a null queries object', () => {
    const queriesString = queries({
      a: '1',
      b: null,
      c: '3'
    }).toString()

    expect(queriesString).toEqual('a=1&c=3')
  })

  it('should throw an error if type is not supported', () => {
    expect(() => {
      queries(12345)
    }).toThrow()
  })
})
