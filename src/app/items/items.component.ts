import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router'
import {IItems} from '../shared/interfaces/Iitems'
import { ItemService } from '../services/items.services';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {


  filterItems: IItems[]; 
  isError : boolean = false; 
  items: IItems[]=[];

  constructor(private _route:ActivatedRoute, private _itemService : ItemService, private router : Router){ 

    console.log('Welcome to Items constructor');

  }

  ngOnInit(): void {
      console.log('Welcome to Items');
  
    //this.products= this._productService.getProductList();
    this._itemService.getItems().subscribe( (res: IItems[] )=> {
      this.items = res;
      this.filterItems = this.items ; 
    }
    ,(err) => {
      console.log('Error Captured!');
      if(err.status==404){
      //   errMessage ='404 found > ';
      }
      this.isError= true; 
    }
    ) 
    
    }




}
