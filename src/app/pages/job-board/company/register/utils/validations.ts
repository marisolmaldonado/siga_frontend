import { AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";
import { JobBoardHttpService } from "src/app/services/job-board/job-board-http.service";

export class Validations{

    static validateIdentification(jobBoardHttpService:JobBoardHttpService) {
        return(control: AbstractControl)=>{
            const value = control.value;
            return jobBoardHttpService.verifyIdentification(value)
            .pipe(
                map(
                    response=>{
                        return response['data']?{notAvaibleUser:true}:null;
                    }
                )
            )

        }
        
    }
}
