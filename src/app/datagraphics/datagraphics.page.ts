import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-datagraphics',
  templateUrl: './datagraphics.page.html',
  styleUrls: ['./datagraphics.page.scss'],
})
export class DatagraphicsPage implements OnInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  private ctx: CanvasRenderingContext2D;
  originX: number;
  originY: number;
  centerX: number;
  centerY: number;
  bottomY: number;
  maxMetric: number = 0;
  lastDate: {d:number,m:number,y:number};
  offset: number;
  lastX: number;
  lastY: number;
  lastTouch: number;
  data: Array<{date: {d:number,m:number,y:number}, metric: number,x:number,y:number}> = [];

  constructor(private plt: Platform, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    let canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.originX = canvasPosition.x;
    this.originY = canvasPosition.y+10;
    this.canvasElement.width = this.plt.width()-2 + '';
    this.canvasElement.height = this.plt.height()*.5 + '';
    this.centerX = this.originX + this.canvasElement.width/2;
    this.centerY = this.originY + this.canvasElement.height/2;
    this.bottomY = this.originY+this.canvasElement.height-20;
    this.ctx = this.canvasElement.getContext('2d');
    for (let i = 0; i < 20; i++) {
      this.data.push({date:{d:Math.floor(Math.random()*27+1),m:Math.floor(Math.random()*11+1),y:2020},metric:Math.random()*100,x:0,y:0});
    }
    this.refresh();
    this.draw();
  }

  back() {
    this.router.navigateByUrl("");
  }

  datasort() {
    this.data.sort(function compare(a, b) {
      if (a.date.y < b.date.y) {
        return -1;
      }
      if (a.date.y > b.date.y) {
        return 1;
      }
      if (a.date.m < b.date.m) {
        return -1;
      }
      if (a.date.m > b.date.m) {
        return 1;
      }
      if (a.date.d < b.date.d) {
        return -1;
      }
      if (a.date.d > b.date.d) {
        return 1;
      }
      return 0;
    });
  }

  getDaysFromMonths(month: number, leap: boolean) {
    if (leap && month == 3) {return 60;}
    switch(month) {
      case 1:
        return 0;
      case 2:
        return 31;
      case 3:
        return 59;
      case 4:
        return 90;
      case 5:
        return 120;
      case 6:
        return 151;
      case 7:
        return 181;
      case 8:
        return 212;
      case 9:
        return 243;
      case 10:
        return 273;
      case 11:
        return 304;
      case 12:
        return 334;
    }
  }

  getDays(d: number,m: number, y: number) {
    return d+this.getDaysFromMonths(m,y%4===0)+(y%4)*365+(y-y%4)*365.25;
  }

  refresh() {
    if (this.data==null) {return;}
    this.datasort();
    this.data.forEach((databit)=>{
      if (databit.metric > this.maxMetric) {
        this.maxMetric = databit.metric;
      }
      this.lastDate = {d: databit.date.d, m: databit.date.m, y: databit.date.y};
    });
    this.offset = this.getDays(this.lastDate.d,this.lastDate.m,this.lastDate.y);
    this.data.forEach((databit)=>{
      databit.x = this.getDays(databit.date.d,databit.date.m,databit.date.y);
      databit.y = this.bottomY-((this.canvasElement.height-20)*databit.metric)/(this.maxMetric);
    })
  }

  draw() {
    this.ctx.clearRect(this.originX,this.originY-10,this.canvasElement.width,this.canvasElement.height);
    if (this.data==null) {return;}
    this.ctx.fillStyle="red";
    this.data.forEach((databit)=>{
      let x = databit.x-this.offset+this.centerX;
      let y = databit.y;
      this.ctx.fillRect(x-5,y-5,10,10);
      if (this.lastX != null) {
        this.ctx.strokeStyle = "yellow";
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(this.lastX,this.lastY);
        this.ctx.stroke();
      }
      this.lastX = x;
      this.lastY = y;
    });
    this.lastX = null;
    this.lastY = null;
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "left";
    this.ctx.fillText(Math.floor(this.maxMetric).toString(),10,this.originY);
    this.ctx.fillText(Math.floor(this.maxMetric/2).toString(),10,this.centerY);
    this.ctx.fillText("0",10,this.bottomY);
  }

  startTouch(event) {
    this.lastTouch = event.touches[0].pageX;
  }

  scroll(event) {
    this.offset += this.lastTouch-event.touches[0].pageX;
    this.lastTouch = event.touches[0].pageX;
    this.draw();
  }

  endTouch(event) {
  }

  detect(event) {

  }

}
