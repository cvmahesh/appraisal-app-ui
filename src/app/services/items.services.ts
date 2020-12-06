import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

import {catchError, tap} from 'rxjs/operators'
import {IItems} from '../shared/interfaces/Iitems'


@Injectable({
    providedIn: 'root'
})
export class ItemService {
   
    constructor (private  _httpClient: HttpClient) {
    }

 

    getItems(id?: string):Observable<any>{

        let URL='http://localhost:8080/items/items';

        if(id ){
            //URL="http://localhost:3000/products/"+id;
            console.log("COntructing URL with ID "+id);
            URL += `/${id}`;
          }
          return this._httpClient.get(URL).pipe(catchError(this.handleError));
    }
    handleError(error :HttpErrorResponse) : any {
        throw 'http connection failure';
        console.error(error);
    }
    
    updateItem(item: IItems) {
        let URL='http://localhost:8080/items/items/'+item.id;
        console.log('UPDATE IN SERVICE  '+item.name);
        console.log('UPDATE IN SERVICE  '+item.description);
        console.log('UPDATE IN SERVICE  '+item.quantity);
        console.log('UPDATE IN SERVICE  '+URL);

        return this._httpClient.put(URL,{
            "name": item.name,
            "description": item.description,
            "quantity": item.quantity
        }).pipe(catchError(this.handleError));
    }
  
    createItems(item: IItems) {
        let URL='http://localhost:8080/items/items';
        console.log('UPDATE IN SERVICE  '+item.name);
        console.log('UPDATE IN SERVICE  '+item.description);
        console.log('UPDATE IN SERVICE  '+item.quantity);
        console.log('UPDATE IN SERVICE  '+URL);

        return this._httpClient.post(URL,{
            "name": item.name,
            "description": item.description,
            "quantity": item.quantity
        }).pipe(catchError(this.handleError));
    }

    deleteItem(item: IItems) {
        let URL='http://localhost:8080/items/items/'+item.id;
         
        console.log('UPDATE IN SERVICE  '+URL);

        return this._httpClient.delete(URL).pipe(catchError(this.handleError));
    }
}