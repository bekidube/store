import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';
import { PassengerService } from 'src/app/service/passenger.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(private jwtService : JwtService,private Passenger:PassengerService,private http:HttpClient) { }

  init:any
  single:any
  wallet:any
  positives:any


  user = {
    id: '',
    fullname:'',
    email:'',
    amount:''
  }
  points:any;
  transactions:any;


  ngOnInit(): void {

    this.user= this.jwtService.getDetails(localStorage.getItem('token')).data.rows[0];
    this.init = this.user.fullname.charAt(0).toUpperCase();   //display one character of fullname
    this.single=this.user.fullname.split(' ').at(0);   //find space on fullname
    let id=this.user.id


    this.Passenger.getUserUsedTokens(id).subscribe((next:any) => {

      this.points=next[0].points;
      if(this.points==null)
      {
        
        this.positives='0.00';
        

      }else
      {

        this.positives=this.points;

      }

      
    
  })


  this.Passenger. getUserTransaction(id).subscribe((next:any) => {

         this.transactions=next;
 
})


 
}

}
