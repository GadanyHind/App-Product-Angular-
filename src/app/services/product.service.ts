import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
//Dans le service on peut  declarer des donnees et des methodes
//Grace au service on peut partager des donnees et des traitement a l'ensemble des composants
//separation de la logique presentation et la logique applicative se fait facilement via l'utilisation des services


@Injectable({
  providedIn: 'root'//disponible dans le module principal=>pouvez l'injecter dans les autres
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public  getProducts( keyword:string="" ,page: number=1,size:number=4){
    return this.http.get(`http://localhost:8080/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
  //{observe:'response'} => return objet de type httpResponse
  }

  public  checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8080/products/${product.id}`
      ,{checked:!product.checked});

  }

  public  deleteProduct(product:Product){
    return this.http.delete<Product>(`http://localhost:8080/products/${product.id}`);

  }
  public saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:8080/products/`
      ,product);

  }

  getProductById(productId:number):Observable<Product>{
    return this.http.get<Product>('http://localhost:8080/products/${productId}');

  }

  updateProduct(product:Product) : Observable<Product>{
    return this.http.put<Product>('http://localhost:8080/products/${product.id}',product)
  }

 /* public  searchProduct(keyword:string, page:number,size:number):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8080/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }*/

}
