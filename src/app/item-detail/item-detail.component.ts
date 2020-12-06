import { Component, OnInit } from '@angular/core';
import {IItems} from '../shared/interfaces/Iitems'
import { ItemService } from '../services/items.services';
import { ActivatedRoute,Router} from '@angular/router'

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  providers: [ItemService]
})
export class ItemDetailComponent implements OnInit {

  private itemId: string = '';
  isError: boolean = false; 
  item : IItems={name:'',description:'', id:'0',quantity:0,__v:0 ,_id:'' };
  
  constructor(private _route:ActivatedRoute, private _itemService : ItemService, private router : Router) { 

    // this._itemService =  new ItemService(this.httpClient);
    console.log('Item Service');

    console.log(this._route.snapshot.paramMap.get('id'));
    let id = this._route.snapshot.paramMap.get('id');
    if(id){
      this.itemId=id;
      console.log('ID PRINTING '+this.itemId);
    }else{
     // this.errorMessage="Invalid Product Id"
    }
  }

  ngOnInit(): void {
    this.isError = false;
   
    this._itemService.getItems(this.itemId).subscribe(
       (result : IItems) => {
          this.item = result;
       }

    );;
  }

  updateItem(): void {

    console.log('UPDATE   ');
    this._itemService.updateItem(this.item).subscribe(
      (result : IItems) => {
        this.item = result;
        console.log('Update Success   ');
     }

    );
  }

}
