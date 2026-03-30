import { ReadingTimePipe } from './reading-time.pipe';

describe('ReadingTimePipe', () => {
  let pipe: ReadingTimePipe;

  beforeEach(() => {
    pipe = new ReadingTimePipe();
  });

  it('should return "< 1 min de lectura" for 0 minutes', () => {
    expect(pipe.transform(0)).toBe('< 1 min de lectura');
  });

  it('should return "< 1 min de lectura" for undefined/null-ish values', () => {
    expect(pipe.transform(0)).toBe('< 1 min de lectura');
  });

  it('should return "1 min de lectura" for 1 minute', () => {
    expect(pipe.transform(1)).toBe('1 min de lectura');
  });

  it('should return "5 min de lectura" for 5 minutes', () => {
    expect(pipe.transform(5)).toBe('5 min de lectura');
  });

  it('should return "12 min de lectura" for 12 minutes', () => {
    expect(pipe.transform(12)).toBe('12 min de lectura');
  });
});
