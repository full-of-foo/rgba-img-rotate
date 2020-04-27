import {GreetOptions} from '../src/greeter-types'
import Greeter from '../src/index'

test('My Greeter', () => {
  const opts = {salutaion: 'Hello', name: 'Carl'} as GreetOptions
  expect(Greeter(opts)).toBe('Hello Carl')
})
