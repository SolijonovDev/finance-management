import { convertAndSortDates } from './dataExtractor';

describe('validation -1', () => {
  test('convert and sort dates test 1', () => {
    expect(convertAndSortDates([], [])).toEqual([]);
  });

  test('convert and sort dates test 2', () => {
    expect(convertAndSortDates([1707718265000], [1707545503000])).toEqual([
      '02/10/2024',
      '02/12/2024',
    ]);
  });

  test('convert and sort dates test 3', () => {
    expect(
      convertAndSortDates([1707718265000, 1707545503000], [1707545503000, 1707718265000]),
    ).toEqual(['02/10/2024', '02/12/2024']);
  });
});
