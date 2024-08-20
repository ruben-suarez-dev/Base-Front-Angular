import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SignalServiceService } from '../../shared/services/signal.service';
import { PageName } from '../../shared/enums/page-names.enum';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent implements OnInit, OnDestroy {

  constructor(private signalService: SignalServiceService) {}

  currentPage!: PageName; 
  pageName = PageName;

  resizeObservable$: Observable<Event> = new Observable<Event>;
  resizeSubscription$: Subscription = new Subscription;

  asideBarCollapse = signal(false);

  ngOnInit(): void {
    this.currentPage = this.signalService.getCurrentPage;
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
          if (window.innerWidth >= 640 && this.asideBarCollapse()) {
            this.showSideBar();
          } else if (window.innerWidth < 640 && !this.asideBarCollapse()) {
            this.showSideBar();
          }
        });
      }
    }, 100);
  }

  showSideBar() {
    let sidebar = document.getElementById('logo-sidebar');
    let sidebarPosition = sidebar?.getBoundingClientRect();
    if (sidebarPosition?.left === 0) {
      this.asideBarCollapse.update((value: boolean) => true);
      sidebar?.style.setProperty("transform", "translateX(-256px)");
    } else {
      this.asideBarCollapse.update((value: boolean) => false);
      sidebar?.style.setProperty("transform", "translateX(0px)");
    }

    console.log('El valor del signal es:', this.asideBarCollapse());
  }

  changeCurrentPage(page: PageName) {
    if (this.currentPage !== page) {
      this.signalService.setCurrentPage = page;
      this.currentPage = this.signalService.getCurrentPage;
    }
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe()
  }

}
