import {Inmueble} from './inmueble';

describe('Inmueble', () => {
  it('should create an instance', () => {
    expect(new Inmueble('TITULO DE INMUEBLE',
      'BARRIOSTR',
      100,
      20,
      1200000,
      120000000,
      2,
      'DESCRIPCION INMUEBLE',
      'CALLE 123 # 45 - 67',
      5,
      3,
      'Apartamento',
      ['TESTIMG1', 'TESTIMG2'],
      'UNIQUEIDINM',
      'Usaquen',
      'Norte',
      ['123', 'ABC'],
      'UNIQUEIDTEST', 8, 8)).toBeTruthy();
  });
});
