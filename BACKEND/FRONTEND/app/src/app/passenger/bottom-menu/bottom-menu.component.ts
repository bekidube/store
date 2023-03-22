import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onClick(){

    localStorage.removeItem("token");
    this.route.navigate(['/'])
  }

}
