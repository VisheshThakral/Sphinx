import { Component, Input } from '@angular/core';
import { Sphinx } from '../../../models/sphinx.model';

@Component({
  selector: 'app-sphinx',
  templateUrl: './sphinx.component.html',
  styleUrls: ['./sphinx.component.css']
})
export class SphinxComponent {
  @Input() sphinx: Sphinx;

  updateSphinxLikes () {
    console.log(this.sphinx._id)
  }
}
