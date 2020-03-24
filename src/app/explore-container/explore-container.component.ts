import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Platform, IonContent } from '@ionic/angular';

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
  icons: Array<{x: number, y: number, text: string}> = [];

  clickCounter : number = 0;

  constructor(private plt: Platform) { }

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

  animate(): void {
    this.ctx.clearRect(this.originX, this.originY, this.canvasElement.width,this.canvasElement.height);
    for (let i = 0; i < this.icons.length; i++) {
      if (i == 0) {
        this.icons[i].x = this.centerX;
        this.icons[i].y = this.centerY;
      }
      else {
        this.icons[i].x = this.centerX + (Math.floor((i-1)/6)+1)*60*Math.sin(i);
        this.icons[i].y = this.centerY + (Math.floor((i-1)/6)+1)*60*Math.cos(i);
      }
      this.ctx.fillStyle = this.icons[i].text;
      this.ctx.beginPath();
      this.ctx.arc(this.icons[i].x,this.icons[i].y,25,Math.PI*2,0,false);
      this.ctx.closePath();
      this.ctx.fill();
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
 
  startDrawing(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
    let buttonHit = false;
    for (let i = 0; i < this.icons.length; i++) {
      if (Math.sqrt(Math.pow(this.icons[i].x-this.saveX,2)+Math.pow(this.icons[i].y-this.saveY,2)) < 25) {
        console.log(i);
        buttonHit = true;
        break;
      }
    }
    if (!buttonHit) {
      this.icons.push({x:this.saveX,y:this.saveY,text:'rgb(' + Math.random()*99 + ',' + Math.random()*99+','+Math.random()*99+')'});
    }
    this.animate();
  }

  onStartClick() {
    console.log('add');
    this.clickCounter++;
  }

  onChartClick() {
    console.log('chart');
  }

}
