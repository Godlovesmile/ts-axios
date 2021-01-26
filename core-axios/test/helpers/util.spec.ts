import { isDate } from '../../src/helpers/utils'

describe('helpers:util', () => {
    describe('isXX', () => {
        test('should validate Date', () => {
            expect(isDate(new Date())).toBeTruthy()
            expect(isDate(Date())).toBeFalsy()
        })
    })
})