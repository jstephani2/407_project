import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Platform, IonContent, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TrackerManager } from 'src/providers/tracker-manager';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  private ctx: CanvasRenderingContext2D;
  originX: number;
  originY: number;
  centerX: number;
  centerY: number;
  saveX: number;
  saveY: number;
  icons: Array<{x: number, y: number, title: string, why:string, color:string}> = [];
  lastBubble: string;

  clickCounter : number = 0;

  constructor(private plt: Platform, private trackerManager: TrackerManager, private router: Router) { }

  ngOnInit() {}

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.originX = canvasPosition.x;
    this.originY = canvasPosition.y;
    this.canvasElement.width = this.plt.width()-2 + '';
    this.canvasElement.height = this.plt.height()*.8 + '';
    this.centerX = this.originX + this.canvasElement.width/2;
    this.centerY = this.originY + this.canvasElement.height/2;
    this.ctx = this.canvasElement.getContext('2d');
  }

  onPlusClick() {
    this.clickCounter++;
    this.router.navigateByUrl("/new-item");
  }

  
  // var tracker = {
  //   name: this.trackerName,
  //   reason: this.trackerWhy,
  //   qualMeasures: this.qualitativeMeasures,
  //   quantMeasures: this.quantitativeMeasures,
  //   goal: this.goal,
  //   icon: this.icon
  // }

  addedMetric() {
    let t = this.trackerManager.getTrackersFromLocalStorage();
    if (t!=null && t[-1] !== this.lastBubble) {
      t = t[-1];
      console.log(t[0]);
      this.lastBubble = t[0];
      this.icons.push({x: 0,y: 0,title: t[0],why: t[1],color:"#0fff00"});
    }
  }

  animate(): void {
    this.addedMetric();
    this.ctx.clearRect(this.originX, this.originY, this.canvasElement.width,this.canvasElement.height);
    for (let i = 0; i < this.icons.length; i++) {
      if (i == 0) {
        this.icons[i].x = this.centerX;
        this.icons[i].y = this.centerY;
      }
      else {
        this.icons[i].x = this.centerX + (Math.floor((i-1)/6)+1)*110*Math.sin(i);
        this.icons[i].y = this.centerY + (Math.floor((i-1)/6)+1)*110*Math.cos(i);
      }
      this.ctx.fillStyle = this.icons[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.icons[i].x,this.icons[i].y,50,Math.PI*2,0,false);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.icons[i].title,this.icons[i].x,this.icons[i].y,96);
      if (this.icons[i].x - this.canvasElement.width > 0) {
        let expansion = this.icons[i].x - this.canvasElement.width;
        this.canvasElement.width += expansion*4;
        this.canvasElement.height += expansion*4;
        this.centerX = this.originX + this.canvasElement.width/2;
        this.centerY = this.originY + this.canvasElement.height/2;
        i=0;
      }
    }
    requestAnimationFrame(this.animate.bind(this));
  }
 
  detect(event) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.saveX = event.pageX - canvasPosition.x;
    this.saveY = event.pageY - canvasPosition.y;
    let buttonHit = false;
    for (let i = 0; i < this.icons.length; i++) {
      if (Math.sqrt(Math.pow(this.icons[i].x-this.saveX,2)+Math.pow(this.icons[i].y-this.saveY,2)) < 50) {
        console.log(this.icons[i].title);
        this.onMetricClick();
        buttonHit = true;
        break;
      }
    }
    this.animate();
  }

  onMetricClick() {
    this.router.navigateByUrl("/new-log");
  }

  onChartClick() {
    console.log('chart');
  }

}
