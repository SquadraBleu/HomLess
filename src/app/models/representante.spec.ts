import { Representante } from './representante';

describe('Representante', () => {
  it('should create an instance', () => {
    expect( new Representante(
      '11010008291',
      'Johnny Test',
      '3103000000',
      'test@domain.tld',
      'UNIQUEIDINM',
      [],
      'UNIQUEIDREP'
    )).toBeTruthy();
  });
});
