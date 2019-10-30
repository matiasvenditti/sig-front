import { ValidatorFn, AbstractControl } from '@angular/forms';

export function greaterThanToday(date: Date): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        return date < control.value ? null : {'invalidDate': {value: control.value}};
    };
}