import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComplaintService } from 'src/app/service/complaint.service';
import { JwtService } from 'src/app/service/jwt.service';
import { PassengerService } from 'src/app/service/passenger.service';

@Component({
  selector: 'app-lodgecomplains',
  templateUrl: './lodgecomplains.component.html',
  styleUrls: ['./lodgecomplains.component.scss']
})
export class LodgecomplainsComponent implements OnInit {

  form:FormGroup= new FormGroup(
    {
      complain: new FormControl('')
    }
  );
  
  
  user = {
    id: '',
    fullname:'',
    email:'',
    amount:''
  
  }
  submitted = false;
  
    constructor(private http:HttpClient,
      private complaintService:ComplaintService,
      private jwtService : JwtService,
      private Passenger:PassengerService,
      private toast : NgToastService,
      private router: Router, 
      private spinner: NgxSpinnerService,
      private formBuilder: FormBuilder) { }
  
  
  ngOnInit(): void {



    this.form = this.formBuilder.group(
      {
        
      
        complain: [
          '',
          [
            Validators.required,
          ]
        ],
        
        
      },
      
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  
  onComplaintCreate(value:any)
  {
    this.submitted = true;
    

this.user= this.jwtService.getDetails(localStorage.getItem('token')).data.rows[0];
let id=this.user.id;

var complain_data={
  user_id:id,
  complains:value.complain
}

if(value.complain=='')
{



}else{
  this.spinner.show();

  this.http.post('http://localhost:3001/postComplains',complain_data, {responseType:'text'}).subscribe((res)=>
 {
  setTimeout(()=>this.spinner.hide(),600)
  setTimeout(()=>this.toast.success({detail:"Success",summary:'Complain submitted successfully.', duration:2000}),700)
  

  setTimeout(()=> this.router.navigate(['/complains']),1600)
  
 });
}



}
}
