import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

import {catchError, tap} from 'rxjs/operators'
import {IItems} from '../shared/interfaces/Iitems'
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
   
    constructor (private  _httpClient: HttpClient) {
        console.log(environment.production); // Logs false for default environment
    }

    URL=environment.apiUrl;

    getItems(id?: string):Observable<any>{

       // let URL='http://localhost:8080/items/items';
       let URL = this.URL;
       console.log('getItems IN SERVICE URL:  '+URL);
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
        //let URL='http://localhost:8080/items/items/'+item.id;
        let URL = this.URL+'/'+item.id;

        console.log('UPDATE IN SERVICE  '+item.name);
        console.log('UPDATE IN SERVICE  '+item.description);
        console.log('UPDATE IN SERVICE  '+item.quantity);
        console.log('UPDATE IN SERVICE URL:  '+URL);

        return this._httpClient.put(URL,{
            "name": item.name,
            "description": item.description,
            "quantity": item.quantity
        }).pipe(catchError(this.handleError));
    }
  
    createItems(item: IItems) {
       //let URL='http://localhost:8080/items/items';
       let URL = this.URL;
        console.log('UPDATE IN SERVICE  '+item.name);
        console.log('UPDATE IN SERVICE  '+item.description);
        console.log('UPDATE IN SERVICE  '+item.quantity);
        console.log('createItems IN SERVICE  URL: '+URL);

        return this._httpClient.post(URL,{
            "name": item.name,
            "description": item.description,
            "quantity": item.quantity
        }).pipe(catchError(this.handleError));
    }

    deleteItem(item: IItems) {
        //let URL='http://localhost:8080/items/items/'+item.id;
        let URL = this.URL+item.id;
        console.log('deleteItem IN SERVICE URL:  '+URL);

        return this._httpClient.delete(URL).pipe(catchError(this.handleError));
    }
}