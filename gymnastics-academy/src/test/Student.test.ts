import Student from '../main/student/Student'
import Address from '../main/Address'
import PhoneNumber from '../main/shared/PhoneNumber'

test('cannot create student with name invalid', () => {
  expect(
    () =>
      new Student(
        '',
        new Date(),
        170,
        200,
        PhoneNumber.of(94, 999999999),
        new Address({
          zip: 10000000,
          street: 'rua',
          number: 128,
          neighborhood: 'bairro',
          city: 'parauapebas',
          state: 'pa',
        })
      )
  ).toThrow()
})

test('cannot create student with birthDate invalid', () => {
  expect(
    () =>
      new Student(
        'Emmanoel',
        new Date('2022-09-12'),
        170,
        84,
        PhoneNumber.of(94, 999999999),
        new Address({
          zip: 10000000,
          street: 'rua',
          number: 128,
          neighborhood: 'bairro',
          city: 'parauapebas',
          state: 'pa',
        })
      )
  ).toThrow()
})

test('cannot create student with height invalid', () => {
  expect(
    () =>
      new Student(
        'Emmanoel',
        new Date(),
        0,
        84,
        PhoneNumber.of(94, 999999999),
        new Address({
          zip: 10000000,
          street: 'rua',
          number: 128,
          neighborhood: 'bairro',
          city: 'parauapebas',
          state: 'pa',
        })
      )
  ).toThrow()
})

test('cannot create student with weight invalid', () => {
  expect(
    () =>
      new Student(
        'Emmanoel',
        new Date(),
        170,
        0,
        PhoneNumber.of(94, 999999999),
        new Address({
          zip: 10000000,
          street: 'rua',
          number: 128,
          neighborhood: 'bairro',
          city: 'parauapebas',
          state: 'pa',
        })
      )
  ).toThrow()
})

test('cannot create student with invalid data', () => {
  expect(
    () =>
      new Student(
        'name',
        new Date(),
        170,
        84,
        PhoneNumber.of(94, 999999999),
        new Address({
          zip: 10000000,
          street: 'rua',
          number: 128,
          neighborhood: 'bairro',
          city: 'parauapebas',
          state: 'pa',
        })
      )
  ).toThrow()
})

test('must add a phone number', () => {
  const student = new Student(
    'name',
    new Date(),
    170,
    84,
    PhoneNumber.of(94, 999999999),
    new Address({
      zip: 10000000,
      street: 'rua',
      number: 128,
      neighborhood: 'bairro',
      city: 'parauapebas',
      state: 'pa',
    })
  )

  student.addPhoneNumber(94, 999999999)

  expect(student.phoneNumbers.length).toEqual(2)
})
