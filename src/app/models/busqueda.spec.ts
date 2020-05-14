import {Busqueda} from './busqueda';

describe('Busqueda', () => {
  it('should create an instance', () => {
    expect(new Busqueda('AAAA',
      'BusquedaDescription',
      'Casa',
      10,
      100,
      1,
      2,
      'Norte',
      'Usaquen',
      100000000000,
      500000000000,
      2000000,
      5000000,
      true,
      'IDCCC',
      ['123', 'ABC'],
      'test@domain.tld')).toBeTruthy();
  });
});
