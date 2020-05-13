import {Cliente} from './cliente';

describe('Cliente', () => {
  it('should create an instance', () => {
    expect(new Cliente('Johnny Test',
      '1234567891',
      '3103000000',
      'test@domain.tld',
      'UNIQUEIDCLIENT',
      ['CHATUID1', 'CHATUID2'],
      ['CITAUID1', 'CITAUID2'],
      ['CITAUID1'],
      ['WANTUID1'])).toBeTruthy();
  });
});
