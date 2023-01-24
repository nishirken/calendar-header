export type Subscription = { unsubscribe: VoidFunction };

export class Observable<T> {
    private _value: T;
    public value: T;
    private subs: Set<(val: T) => void> = new Set();

    constructor(value: T) {
        this._value = value;
        this.value = value;
        Object.defineProperty(this, 'value', {
            enumerable: true,
            configurable: false,
            set(v: T) {
                this._value = v;
                this.subs.forEach((sub: (v: T) => void) => sub(this._value));

                
            },
            get() { return this._value; }
        })
    }

    subscribe(cb: (val: T) => void): Subscription {
        this.subs.add(cb);
        return { unsubscribe: () => this.subs.delete(cb) };
    }
}