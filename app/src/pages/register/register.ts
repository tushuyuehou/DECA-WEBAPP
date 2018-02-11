import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  deca_user = {
    uname:'',
    upwd:'',
    email:'',
    phone:'',
    gender:'1'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp():void{
    //console.error('user:'+this.user)
    let url = '/register';
    this.httpClient.post(url,{deca_user:this.deca_user}).subscribe((res)=>{
      console.error(res);
    }, (error)=>{
      console.error(error);
    })
  }
}
