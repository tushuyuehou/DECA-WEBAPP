import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, ToastController} from 'ionic-angular';
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
  user = {
    uname:'',
    upwd:'',
    email:'',
    phone:'',
    gender:'1'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient:HttpClient, public alertCtrl:AlertController,public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register():void{
    //console.error('user:'+this.user)
    let url = '/register';
    this.httpClient.post(url,{user:this.user}).subscribe((res)=>{
      let status = res['status'];
      if(status === 'exist'){
        this.alertCtrl.create({
          title:'Error',
          subTitle:'用户名已存在',
          buttons:['OK']
        }).present();
      }else if(status === 'err'){
        this.toastCtrl.create({
          message:'服务器错误',
          duration:1000,
          position:'middle'
        }).present();
      }else{
        this.navCtrl.push('HomePage');
      }
    }, (error)=>{
      console.error(error);
    })
  }
}
