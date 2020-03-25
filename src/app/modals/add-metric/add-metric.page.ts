import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-metric',
  templateUrl: './add-metric.page.html',
  styleUrls: ['./add-metric.page.scss'],
})
export class AddMetricPage implements OnInit {

  constructor(private modalController: ModalController) { }

  @Input() public name: string;

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss(this.name);
  }

}
