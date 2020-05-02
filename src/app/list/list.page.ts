import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TrackerManager } from 'src/providers/tracker-manager';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  private ctx: CanvasRenderingContext2D;
  originX: number;
  originY: number;
  centerX: number;
  centerY: number;
  saveX: number;
  saveY: number;
  trackers: any;
  lastTouchX: number;
  lastTouchY: number;
  icons: Array<{ x: number, y: number, title: string, color: string, icon: string }> = [];
  iconsAlternate: any;
  lastBubble: string;

  clickCounter: number = 0;

  constructor(private plt: Platform, private trackerManager: TrackerManager, private router: Router, private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) {
    if (!localStorage.getItem('user')) this.router.navigateByUrl('/login')

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        var state = this.router.getCurrentNavigation().extras.state;

        if (state.task == "delete") {
          this.trackerManager.deleteTracker(state.tracker);
        } else if (state.task == "update") {
          this.trackerManager.updateTracker(state.tracker);
        } else if (state.task == "create") {
          this.trackerManager.addTracker(state.tracker);
        }

        this.trackerManager.saveTrackersToLocalStorage().then(() => {
          this.trackers = this.trackerManager.getTrackers();
          this.icons = [];
          for (var ind in this.trackers) {
            this.icons.push({ x: 0, y: 0, title: this.trackers[ind].name, color: "rgb(" + Math.random() * 99 + "," + Math.random() * 99 + "," + Math.random() * 99 + ")", icon: this.trackers[ind].icon });
          }
          setTimeout(this.draw,2000);
        });
      }
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    this.originX = canvasPosition.x;
    this.originY = canvasPosition.y;
    this.canvasElement.width = this.plt.width() - 2 + '';
    this.canvasElement.height = this.plt.height() * .8 + '';
    this.centerX = this.originX + this.canvasElement.width / 2;
    this.centerY = this.originY + this.canvasElement.height / 2;
    this.ctx = this.canvasElement.getContext('2d');

    const user = JSON.parse(localStorage.getItem('user'))
    this.firestore.collection('users').doc(user.uid).get().subscribe((res) => {
        let trackers = res.data();
        let arr = []
        Object.keys(trackers).forEach((i) => { arr.push(JSON.parse(trackers[i])) })
        this.trackerManager.updateTrackersFromLocalStorage(arr).then(() => {
          this.trackers = this.trackerManager.getTrackers();
          for (var ind in this.trackers) {
            this.icons.push({ x: 0, y: 0, title: this.trackers[ind].name, color: "rgb(" + Math.random() * 99 + "," + Math.random() * 99 + "," + Math.random() * 99 + ")", icon: this.trackers[ind].icon });
          }
          this.draw();
        });
    })
  }

  onPlusClick() {
    this.clickCounter++;
    this.router.navigateByUrl("/new-item");
  }

  draw() {
    this.ctx.clearRect(this.originX, this.originY, this.canvasElement.width, this.canvasElement.height);
    for (let i = 0; i < this.icons.length; i++) {
      if (i == 0) {
        this.icons[i].x = this.centerX;
        this.icons[i].y = this.centerY;
      }
      else {
        this.icons[i].x = this.centerX + (Math.floor((i - 1) / 6) + 1) * 110 * Math.sin(i);
        this.icons[i].y = this.centerY + (Math.floor((i - 1) / 6) + 1) * 110 * Math.cos(i);
      }
      this.ctx.fillStyle = this.icons[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.icons[i].x, this.icons[i].y, 50, Math.PI * 2, 0, false);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.font='30px FontAwesome';
      //this.ctx.fillText(this.icons[i].icon, this.icons[i].x, this.icons[i].y);
      this.ctx.fillText('\uf434', this.icons[i].x, this.icons[i].y);
    }
  }

  startTouch(event) {
    this.lastTouchX = event.touches[0].pageX;
    this.lastTouchY = event.touches[0].pageY;
  }

  scroll(event) {
    this.centerX += event.touches[0].pageX - this.lastTouchX;
    this.centerY += event.touches[0].pageY - this.lastTouchY;
    this.lastTouchX = event.touches[0].pageX;
    this.lastTouchY = event.touches[0].pageY;
    this.draw();
  }

  endTouch(event) {

  }

  detect(event) {
    let canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = event.pageX - canvasPosition.x;
    this.saveY = event.pageY - canvasPosition.y;
    let buttonHit = false;
    for (let i = 0; i < this.icons.length; i++) {
      if (Math.sqrt(Math.pow(this.icons[i].x - this.saveX, 2) + Math.pow(this.icons[i].y - this.saveY, 2)) < 50) {
        this.onMetricClick(i);
        buttonHit = true;
        break;
      }
    }
  }

  // Go to log page on circle click
  onMetricClick(index: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        tracker: this.trackers[index]
      }
    }
    this.router.navigateByUrl("/new-log", navigationExtras);
  }

  onChartClick() {
    this.router.navigateByUrl("/datagraphics");
  }

  ionViewWillEnter(): void {
    // this.trackerManager.getTrackersFromLocalStorage().then((trackers) => {
    //     this.trackers = trackers;
    // });
  }

  openLogPage(tracker) {
    let navigationExtras: NavigationExtras = {
      state: {
        tracker: tracker
      }
    }
    this.router.navigate(['newLog'], navigationExtras);
  }
}
