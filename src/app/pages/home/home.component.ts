import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit } from '@angular/core';



@Component({
  selector: 'app-individuos',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements  OnInit
{


    selectedClient: any;
    currentDate: any;

        constructor(){
        this.currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
      }

     ngOnInit() {  }
  }
