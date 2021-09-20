import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-weekly-visit-schedule',
  templateUrl: './weekly-visit-schedule.component.html',
  styleUrls: ['./weekly-visit-schedule.component.less'],
  providers: [NgbModalConfig, NgbModal]
})
export class WeeklyVisitScheduleComponent implements OnInit {

    open(content) {
      this.modalService.open(content);
    }
    constructor(config: NgbModalConfig, private modalService: NgbModal) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit() {
  }

}
