import { GreetOptions } from './greeter-types';

const Greeter = (options: GreetOptions): string => {
  return `${options.salutaion} ${options.name}!`;
};

export default Greeter;
