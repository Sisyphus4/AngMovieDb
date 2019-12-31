import { Component, OnInit, Input } from '@angular/core';
import movieDbConf from '../../../core/services/movieDbService/movieDbconfig.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../../../core/interfaces/movie.interface';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  @Input() movie: Movie;

  imgSrc: string;

  constructor(public router: Router) { }

  ngOnInit() {
    this.imgSrc = movieDbConf.imgsrc185 + this.movie.poster_path;
  }

  onClick() {
    this.router.navigate(['/movie', this.movie.id]);
  }
}
