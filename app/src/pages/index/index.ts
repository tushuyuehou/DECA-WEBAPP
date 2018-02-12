import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  products;
  page:number = 1;
  hasMoreData:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('IndexPage 视图加载完成');
    let url = `/products/${this.page}`;
    this.httpClient.get(url).subscribe(
      res=>{
        this.products = res;
      },err=>{
        console.log(err);
      })
  }

  loadMoreData(infiniteScrollEvent):void{
    let url = `/products/${++this.page}`;
    this.httpClient.get(url).subscribe(
      res=>{
        if(res['length'] === 0){
          this.hasMoreData = false;
        }else{
          this.products = this.products.concat(res);
        }
        infiniteScrollEvent.complete();
      },err=>{
        console.error(err);
      })
  }

  productPage(productId):void{
    console.log(productId);
    this.navCtrl.push('ProductPage',{productId:productId});
  }
}
