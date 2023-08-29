type TwoElementArray<T> = [T | null, T | null];

export class PreviousValueArray<T> {
    private previousValue: T | null = null;
    private currentValue: T | null = null;

    constructor(initialValue: T) {
        this.currentValue = initialValue;
    }

    update(newValue: T) {
        this.previousValue = this.currentValue;
        this.currentValue = newValue;
    }

    getValues(): TwoElementArray<T> {
        return [this.previousValue, this.currentValue];
    }
}

