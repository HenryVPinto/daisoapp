import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BusinessComponent } from './business/business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { DetailBusinessComponent } from './detail-business/detail-business.component';
import { CreateContactsComponent } from './create-contacts/create-contacts.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { BranchComponent } from './branch/branch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ExecutionComponent } from './execution/execution.component';
import { DeleteReportComponent } from './delete-report/delete-report.component';
import { PostponedReportComponent } from './postponed-report/postponed-report.component';
import { CompletedReportComponent } from './completed-report/completed-report.component';
import { WeeklyVisitScheduleComponent } from './weekly-visit-schedule/weekly-visit-schedule.component';
import { ColdVisitNotScheduledComponent } from './cold-visit-not-scheduled/cold-visit-not-scheduled.component';
import { VisitTargetSeveralComponent } from './visit-target-several/visit-target-several.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'business',
    component: BusinessComponent
  },
  {
    path: 'create-business',
    component: CreateBusinessComponent
  },
  {
    path: 'detail-business',
    component: DetailBusinessComponent
  },
  {
    path: 'create-contacts',
    component: CreateContactsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'create-branch',
    component: CreateBranchComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'edit-user/:id',
    component: CreateUserComponent
  },
  {
    path: 'edit-bussiness/:id',
    component: CreateBusinessComponent
  },
  {
    path: 'edit-contacts/:id',
    component: CreateContactsComponent
  },
  {
    path: 'execution',
    component: ExecutionComponent
  },
  {
    path: 'delete-report',
    component: DeleteReportComponent
  },
  {
    path: 'postponed-report',
    component: PostponedReportComponent
  },
  {
    path: 'completed-report',
    component: CompletedReportComponent
  },
  {
    path: 'weekly-visit-schedule',
    component: WeeklyVisitScheduleComponent
  },
  {
    path: 'cold-visit-not-scheduled',
    component: ColdVisitNotScheduledComponent
  },
  {
    path: 'visit-target-several',
    component: VisitTargetSeveralComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
