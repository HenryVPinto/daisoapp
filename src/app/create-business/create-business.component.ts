import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertConstants } from '../utils/alert-constants';
import { Account } from '../models/Account';
import { BussinesService } from '../business/business.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.less'],

})
export class CreateBusinessComponent implements OnInit {
  @BlockUI('account-view') accountLoader: NgBlockUI;

  private alert = AlertConstants;
  private account = new Account();
  private id = '';
  private buttonTitle = 'Crear Empresa';
  public isCollapsed = true;

  constructor(
    private bussinesService: BussinesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.buttonTitle = 'Guardar Cambios';
      this.getAccount();
    }
  }

  private getAccount() {
    this.accountLoader.start('Obteniendo información...');
    this.bussinesService.get(this.id)
      .subscribe(
        result => {
          this.accountLoader.stop();
          this.verifyGetAccountResponse(result);
        },
        err => {
          this.accountLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyGetAccountResponse(response) {
    const result = response.result;
    const error = response.error;
    if (result === undefined || result.error === 1 || error === 1) {
      const message = result ? result.message : error ? response.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.account = response.record;
    }
  }

  private verify() {
    if (this.id) {
      this.editAccount();
    } else {
      this.createAccount();
    }
  }

  private createAccount() {
    this.accountLoader.start('Guardando...');
    this.bussinesService.create(this.account)
      .subscribe(
        result => {
          this.accountLoader.stop();
          this.verifyCreateAccountResponse(result);
        },
        err => {
          this.accountLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyCreateAccountResponse(response) {
    const result = response.result;
    const records = response.records;
    if (result === undefined || result.error === 1 || records[0].error === 1) {
      const message = result ? result.message : records ? records[0].messageError : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Empresa creada exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
      this.account = new Account();
    }
  }

  private editAccount() {
    this.accountLoader.start('Guardando...');
    this.account.id = this.id;
    this.account.owner = 1;
    this.bussinesService.edit(this.account)
      .subscribe(
        result => {
          this.accountLoader.stop();
          this.verifyEditAccountResponse(result);
        },
        err => {
          this.accountLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyEditAccountResponse(response) {
    const error = response.error;
    if (error === 1) {
      const message = response.message || 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Usuario editado exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
    }
  }

  private showAlert(
    message,
    type,
    buttonColor
  ) {
    swal({
      title: this.alert.INFORMATION_TITLE,
      text: message,
      type: type,
      confirmButtonText: this.alert.DONE_BUTTON_LABEL,
      confirmButtonColor: buttonColor,
    });
  }

}
