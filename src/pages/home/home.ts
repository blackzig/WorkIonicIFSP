import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any
  public base64Image: string

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.photos = []
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera
      .getPicture(options)
      .then((ImageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + ImageData
        this.photos.push(this.base64Image)
        this.photos.reverse()
      })
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Tem certeza que deseja apagar essa foto?",
      message: "",
      buttons: [{
        text: 'Não',
        handler: () => {

        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.photos.splice(index, 1)
        }
      }]
    })
    confirm.present()
    
  }

}
