import PhoneNumber from '../main/shared/PhoneNumber'

test('cannot create PhoneNumber with ddd invalid', () => {
  expect(() => PhoneNumber.of(0, 999999999)).toThrow()
})

test('cannot create PhoneNumber with number invalid', () => {
  expect(() => PhoneNumber.of(94, 9)).toThrow()
  expect(() => PhoneNumber.of(94, 9999999999))
})
