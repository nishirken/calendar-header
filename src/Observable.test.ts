import { Observable } from "./Observable";

describe('Observable', () => {
    test('Returns value', () => {
        const o = new Observable(1);
        o.value = 2;
        expect(o.value).toBe(2);
    });

    test('Calls subscriptions', () => {
        const o = new Observable(1);
        const f = jest.fn();
        const g = jest.fn();
        o.subscribe(f);
        o.subscribe(g);
        o.value = 2;
        expect(f).toHaveBeenCalledWith(2);
        expect(g).toHaveBeenCalledWith(2);
    });

    test('Unsubscribes', () => {
        const o = new Observable(1);
        const f = jest.fn();
        const sub = o.subscribe(f);
        sub.unsubscribe();
        o.value = 2;
        expect(f).not.toHaveBeenCalled();
    });

    test('Works with objects', () => {
        const o = new Observable({a: 1});
        const f = jest.fn();
        o.subscribe(f);
        o.value = {a: 2};
        expect(f).toHaveBeenCalledWith({a: 2});
    });

    test.skip('Works with nested objects', () => {
        const o1 = new Observable({a: 1});
        const o2 = new Observable({a: {b: [1]}});
        const f = jest.fn();
        const g = jest.fn();
        o1.subscribe(f);
        o1.value.a = 3;
        o2.subscribe(g);
        o2.value.a.b.push(2);
        expect(f).toHaveBeenCalledWith({a: 3});
        expect(g).toHaveBeenCalledWith({a: {b: [1, 2]}});
    });
});