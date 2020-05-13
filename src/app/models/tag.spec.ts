import { Tag } from './tag';

describe('Tag', () => {
  it('should create an instance', () => {
    expect(new Tag("TAGNAME",
      ["UNIQUEIDINM1", "UNIQUEIDINM2"],
      "UNIQUEIDTAG")).toBeTruthy();
  });
});
