import { Chat } from './chat';

describe('Chat', () => {
  it('should create an instance', () => {
    expect(new Chat('UNICIDCLIENTE', 'UNICIDINMOBILIARIA', 'UNICIDINMUEBLE', 'UNICIDREPRESENTANTE', false,'')).toBeTruthy();
  });
});
