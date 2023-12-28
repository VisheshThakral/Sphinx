import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { SphinxModalService } from 'src/app/services/sphinx-modal.service';
import { SphinxService } from 'src/app/services/sphinx.service';

@Component({
  selector: 'app-sphinx-modal',
  templateUrl: './sphinx-modal.component.html',
  styleUrls: ['./sphinx-modal.component.css'],
  providers: [SphinxService],
})
export class SphinxModalComponent {
  content: string = '';
  constructor(
    private sphinxService: SphinxService,
    private loadingService: LoadingService,
    private sphinxModalService: SphinxModalService
  ) {}

  postSphinx() {
    this.loadingService.showLoader();
    this.sphinxService.postSphinx(this.content).subscribe(() => {
      this.loadingService.hideLoader();
      this.closeModal();
      window.location.reload()
    });
  }

  closeModal() {
    this.sphinxModalService.closeTweetModal();
  }
}
