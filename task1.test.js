import { reverse } from './task1';

test('hello world should be reversed to dlrow olleh', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
})