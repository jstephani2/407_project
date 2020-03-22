import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

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
  saveX: number;
  saveY: number;
  icons: Array<{x: number, y: number, text: string}> = [];

  drawing = false;

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
    this.ctx = this.canvasElement.getContext('2d');
  }

  animate(): void {
    this.ctx.clearRect(this.originX, this.originY, this.canvasElement.width,this.canvasElement.height);
    this.icons.forEach((icon)=>{
      this.ctx.fillStyle = icon.text;
      this.ctx.beginPath();
      this.ctx.arc(icon.x--,icon.y--,10,Math.PI*2,0,false);
      this.ctx.closePath();
      this.ctx.fill();
    })
    console.log('yo');
    requestAnimationFrame(this.animate.bind(this));
  }

  moved() {

  }
 
  startDrawing(ev) {
    this.drawing = true;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
    this.icons.push({x:this.saveX,y:this.saveY,text:'blue'});

    this.ctx.fillStyle = '#9e2956';
    this.ctx.beginPath();
    this.ctx.arc(this.saveX,this.saveY,10,Math.PI*2,0,false);
    this.ctx.closePath();
    this.ctx.fill();
    this.animate();
  }
 
  endDrawing() {
    this.drawing = false;
  }

  onStartClick() {
    console.log('add');
    this.clickCounter++;
  }

  onChartClick() {
    console.log('chart');
  }

}
