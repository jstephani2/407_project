import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-metric',
  templateUrl: './add-metric.page.html',
  styleUrls: ['./add-metric.page.scss'],
})
export class AddMetricPage implements OnInit {

  constructor(private modalController: ModalController, public alertController: AlertController, private formBuilder: FormBuilder) {
    this.trackerForm = this.formBuilder.group({
      title: ['', Validators.required],
      why: [''],
    });
   }

  trackerForm: FormGroup;

  ngOnInit() {
  }

  async createTracker() {
    await this.alertController.create({
      header: 'Tracker Created',
      message: 'Created Tracker for: <b>'+this.trackerForm.controls['title'].value+'</b>',
      buttons: [{
        text: 'OK'
      }]
    }).then(alert => alert.present());
    await this.modalController.dismiss(this.trackerForm.controls['title'].value, this.trackerForm.controls['why'].value);
  }

}
