import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sphinx } from 'src/app/models/sphinx.model';

@Component({
  selector: 'app-sphinx-details',
  templateUrl: './sphinx-details.component.html',
  styleUrls: ['./sphinx-details.component.css']
})
export class SphinxDetailsComponent implements OnInit {
  sphinx: Sphinx;
  sphinxId: string = ''
  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.sphinxId = this.activatedRoute.snapshot.params['id'];
    
  }
}
