import { FormGroup } from "@angular/forms";


export class BaseComponent{
    public showLoading: boolean = false;



    constructor(){}


    public onShowLoading() {
        this.showLoading = !this.showLoading;
    }

    public onValidator(form: FormGroup){
        return form.valid;
    }



}
