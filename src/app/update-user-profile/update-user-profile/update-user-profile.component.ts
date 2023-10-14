import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
let {required, pattern, email}=Validators
@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent {
  loading:boolean=false;
  msg:string=''
  constructor(private _authService:AuthService, private toastr:ToastrService, private _Router:Router){

  }
  updateForm:FormGroup=new FormGroup({
    name:new FormControl(null,[required]),
    email: new FormControl(null,[required,email]),
    phone: new FormControl(null,[required,pattern(/^01[1250][0-9]{8}$/)])
  })
  handleUpdateForm(form:FormGroup){
    this.loading=true;
    this._authService.updateLoggedUserData(form.value).subscribe({
      next:(data)=>{
        this.toastr.success(data.message,'Success');
        this.loading=false;
        this._Router.navigate(['/profile'])
      },
      error:(err)=>{
        console.log(err);
        this.msg=err.error.message;
      }
    })
    
  }
}
