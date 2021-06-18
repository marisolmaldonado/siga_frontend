import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'months'
})
export class MonthsPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
        switch (value) {
            case '01':
            case '1':
                return 'ENERO';

            case '02':
            case '2':
                return 'FEBRERO';

            case '03':
            case '3':
                return 'MARZO';

            case '04':
            case '4':
                return 'ABRIL';

            case '05':
            case '5':
                return 'MAYO';

            case '06':
            case '6':
                return 'JUNIO';

            case '07':
            case '7':
                return 'JULIO';

            case '08':
            case '8':
                return 'AGOSTO';

            case '09':
            case '9':
                return 'SEPTIEMBRE';

            case '10':
                return 'OCTUBRE';

            case '11':
                return 'NOVIEMBRE';

            case '12':
                return 'DICIEMBRE';

            default:
                return 'SN';
        }
    }

}
