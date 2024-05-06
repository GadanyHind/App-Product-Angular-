import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products:Array<Product>=[];
  public keyword:string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;
  //products$!:Observable<Array<Product>>;
  //par convention le variable de type observable se termine par $ (c'est pas obligatoire)
  //products!:Observable<Array<Product>>;  =>"!" dire aux compilateur ts ignore meme j'ai pas initialise le variable
  constructor(private productService:ProductService ,
              private router:Router) {
  }

  ngOnInit(): void {
   this.getProduct();
    }
    getProduct(){
    //pour ne fait pas subscribe
     //this.products$=this.productService.getProducts()
      this.productService.getProducts(this.keyword,this.currentPage,this.pageSize)
        .subscribe({
          next: resp => {
            this.products = resp.body as Product[];
            let totalProduct=parseInt(resp.headers.get('x-total-count')!);
            this.totalPages=Math.floor(totalProduct/this.pageSize);
            if (totalProduct % this.pageSize!=0){
              this.totalPages=this.totalPages+1;
            }
          },
          error : err =>{
            console.log(err);
          }
        });
    }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next : updatedProduct => {
       product.checked=!product.checked
       //this.getProduct();
          }
        })
      }

      handleDelete(product:Product){
         if (confirm("Etes vous sure?")){
          this.productService.deleteProduct(product).subscribe({
            next:value =>{
              //this.getProduct();
              //pour supp men la liste
              this.products=this.products.filter(p=>p.id!=product.id);
            }
          });
      }
  }

  /*searchProduct(){
    this.currentPage=1;
    this.totalPages=0;
     this.productService.searchProduct(this.keyword,this.currentPage,this.pageSize).subscribe({
      next:value =>{
        this.products=value;
      }
  });
  }*/

  handleGoToPage(page:number){
    this.currentPage=page;
    this.getProduct()
  }

  handleEdit(product:Product){
       this.router.navigateByUrl(`/editProduct/${product.id}`)
  }



}




