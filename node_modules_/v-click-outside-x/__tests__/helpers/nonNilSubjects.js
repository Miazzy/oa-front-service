import noop from './noop';

export default function nonNilSubjects() {
  return [1, true, '', [], {}, new Date(), /abc/, noop];
}
