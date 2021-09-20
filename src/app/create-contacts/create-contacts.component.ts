import { Component, OnInit } from '@angular/core';
import { BussinesService } from '../business/business.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { AlertConstants } from '../utils/alert-constants';
import { Contact } from '../models/Contact';
import { UserService } from '../users/user.service';
import { ContactsService } from '../contacts/contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contacts',
  templateUrl: './create-contacts.component.html',
  styleUrls: ['./create-contacts.component.less']
})
export class CreateContactsComponent implements OnInit {
  @BlockUI('contact-view') contactLoader: NgBlockUI;

  private accounts = [];
  private users = [];
  private alert = AlertConstants;
  private contact = new Contact();
  private id = '';
  private buttonTitle = 'Crear Empresa';

  constructor(
    private bussinesService: BussinesService,
    private usersService: UserService,
    private contactsService: ContactsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.getUsers();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.buttonTitle = 'Guardar Cambios';
      this.getContact();
    }
  }

  private getContact() {
    this.contactLoader.start('Obteniendo información...');
    this.contactsService.get(this.id)
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyGetContactResponse(result);
        },
        err => {
          this.contactLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyGetContactResponse(response) {
    const result = response.result;
    const error = response.error;
    if (result === undefined || result.error === 1 || error === 1) {
      const message = result ? result.message : error ? response.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.contact = response.record;
    }
  }

  private verify() {
    if (this.id) {
      this.editContact();
    } else {
      this.createContact();
    }
  }

  private createContact() {
    this.contactLoader.start('Guardando...');
    delete this.contact.id;
    this.contactsService.create(this.contact)
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyCreateContactResponse(result);
        },
        err => {
          this.contactLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyCreateContactResponse(response) {
    const result = response.result;
    const records = response.records;
    if (result === undefined || result.error === 1 || records[0].error === 1) {
      const message = result ? result.message : records ? records[0].messageError : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Empresa creada exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
      this.contact = new Contact();
    }
  }

  private editContact() {
    this.contactLoader.start('Guardando...');
    this.contact.id = this.id;
    this.contactsService.edit(this.contact)
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyEditContactResponse(result);
        },
        err => {
          this.contactLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyEditContactResponse(response) {
    const error = response.error;
    if (error === 1) {
      const message = response.message || 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Contacto editado exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
    }
  }

  private getAccounts() {
    this.contactLoader.start('Obteniendo...');
    this.bussinesService.list()
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyListAccountsResponse(result);
        },
        error => {
          this.contactLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyListAccountsResponse(response) {
    const result = response.result;
    const view = response.view;
    if (result === undefined || result.error === 1) {
      const message = result ? result.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.accounts = view;
    }
  }

  private getUsers() {
    this.contactLoader.start('Obteniendo...');
    this.usersService.list()
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyListUsersResponse(result);
        },
        error => {
          this.contactLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyListUsersResponse(response) {
    const result = response.result;
    const view = response.view;
    if (result === undefined || result.error === 1) {
      const message = result ? result.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.users = view;
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
