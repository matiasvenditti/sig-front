import { ValidatorFn, AbstractControl } from '@angular/forms';

export function equals(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const equals = nameRe.test(control.value);
        return equals ? null : {'equals': {value: control.value}};
    };
}