import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clips.model';
import { DatePipe } from '@angular/common';
import Video from 'video.js';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class ClipComponent implements OnInit {
  id: string = '';
  clip?: IClip;

  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: videojs.Video;
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    this.route.data.subscribe((data) => {
      this.clip = data['clip'] as IClip;
      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4',
      });
    });
  }
}
