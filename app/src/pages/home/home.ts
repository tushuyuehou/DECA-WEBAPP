import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {
    uname:'',
    upwd:''
  }

  constructor(public navCtrl: NavController,public httpClient:HttpClient,public alertCtrl:AlertController) {

  }

  registerPage():void{
    this.navCtrl.push('RegisterPage');
  }

  login():void{
    let url = '/login';
    this.httpClient.post(url,{user:this.user}).subscribe(
      res=>{
        let status = res['status'];
        if(status ==='ok'){
          this.navCtrl.push('IndexPage');
        }else {
          this.alertCtrl.create({
            title:'错误',
            subTitle:'用户名或者密码错误',
            buttons:['OK']
          }).present();
        }

      },err=>{
        console.error(err);
      })
  }
}
