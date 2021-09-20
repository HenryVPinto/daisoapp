import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BusinessComponent } from './business/business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { DetailBusinessComponent } from './detail-business/detail-business.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CreateContactsComponent } from './create-contacts/create-contacts.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { BranchComponent } from './branch/branch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginService } from './login/login.service';
import { LocalStorageService, Ng2Webstorage } from 'ngx-webstorage';
import { BlockUIModule } from 'ng-block-ui';
import { UserService } from './users/user.service';
import { BussinesService } from './business/business.service';
import { ContactsService } from './contacts/contacts.service';
import { ExecutionComponent } from './execution/execution.component';
import { DeleteReportComponent } from './delete-report/delete-report.component';
import { PostponedReportComponent } from './postponed-report/postponed-report.component';
import { CompletedReportComponent } from './completed-report/completed-report.component';
import { WeeklyVisitScheduleComponent } from './weekly-visit-schedule/weekly-visit-schedule.component';
import { ColdVisitNotScheduledComponent } from './cold-visit-not-scheduled/cold-visit-not-scheduled.component';
import { VisitTargetSeveralComponent } from './visit-target-several/visit-target-several.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ContactsComponent,
    BusinessComponent,
    CreateBusinessComponent,
    DetailBusinessComponent,
    CreateContactsComponent,
    UsersComponent,
    CreateUserComponent,
    CreateBranchComponent,
    BranchComponent,
    CalendarComponent,
    ExecutionComponent,
    DeleteReportComponent,
    PostponedReportComponent,
    CompletedReportComponent,
    WeeklyVisitScheduleComponent,
    ColdVisitNotScheduledComponent,
    VisitTargetSeveralComponent
  ],
  imports: [
    BlockUIModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    Ng2Webstorage,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
  ],
  providers: [
    LoginService,
    LocalStorageService,
    UserService,
    BussinesService,
    ContactsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
