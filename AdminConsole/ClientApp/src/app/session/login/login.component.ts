import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input } from 'src/app/models/input.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  showLoading: boolean = false;
  errorMesg: string = "";
  loginFileds:Input[] = [
    {
      fieldId : "username",
      label:"Username",
      fieldValue:'',
      type:'text',
      isValid:true,
      errorMesg:'Enter Username',
      required:true
    },
    {
      fieldId : "password",
      label:"Password",
      fieldValue:'',
      type:'password',
      isValid:true,
      errorMesg:'Enter Password',
      required:true
    }
  ];

  constructor(private auth: AuthService, private helper: HelperService, private route: Router) {
    this.auth.validateSession().then((data) => { this.route.navigate(["/home/dashboard"]) }, (e) => { })
  }
  
  ngOnInit(): void {
  }
  
  onSubmit() {
    if (this.helper.isFormValid(this.loginFileds)) {
      this.showLoading = true;
      this.auth.loginUser(this.loginFileds[0].fieldValue, this.loginFileds[1].fieldValue).then((data) => {
        console.log(data);
        this.showLoading = false;
        if (data && data.isSucess) {
          this.route.navigate(["/home/dashboard"]);
        }
        else {
          this.errorMesg = data.message;
        }
      }, (error) => { });
    }
  }

}
