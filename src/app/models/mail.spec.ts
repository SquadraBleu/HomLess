import {Mail} from './mail';

describe('Mail', () => {
  it('should create an instance', () => {
    expect(new Mail('test@domain.tld',
      {
        subject: 'UN LUGAR PARA TI',
        html: 'TESTHTML'
      })).toBeTruthy();
  });
});
