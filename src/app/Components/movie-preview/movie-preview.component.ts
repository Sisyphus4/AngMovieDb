import { Component, OnInit, Input } from '@angular/core';
import movieDbConf from '../../core/services/movieDbconfig.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  @Input() movie: any;

  imgSrc: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.imgSrc = movieDbConf.imgsrc185 + this.movie.poster_path;
  }

  OnClick() {
    this.router.navigate(['/movie', this.movie.id])
  }
}
