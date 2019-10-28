import { ValidatorFn, AbstractControl } from '@angular/forms';

export function equals(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        console.log(control.value);
        console.log(nameRe.test(control.value));
        const equals = nameRe.test(control.value);
        return equals ? null : {'equals': {value: control.value}};
    };
}