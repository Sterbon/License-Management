/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SoftwareService } from './Software.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-software',
  templateUrl: './Software.component.html',
  styleUrls: ['./Software.component.css'],
  providers: [SoftwareService]
})
export class SoftwareComponent implements OnInit {

  createAssetForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  softwareID = new FormControl('', Validators.required);
  softwareName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  totalQuantity = new FormControl('', Validators.required);
  availableQuantity = new FormControl('', Validators.required);
  licenseKey = new FormControl('', Validators.required);

  constructor(public serviceSoftware: SoftwareService, fb: FormBuilder) {
    this.createAssetForm = fb.group({
      softwareID: this.softwareID,
      softwareName: this.softwareName,
      description: this.description,
      totalQuantity: this.totalQuantity,
      availableQuantity: this.availableQuantity,
      licenseKey: this.licenseKey
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSoftware.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.hcl.licensenetwork.Software',
      'softwareID': this.softwareID.value,
      'softwareName': this.softwareName.value,
      'description': this.description.value,
      'totalQuantity': this.totalQuantity.value,
      'availableQuantity': this.availableQuantity.value,
      'licenseKey': this.licenseKey.value
    };

    this.createAssetForm.setValue({
      'softwareID': null,
      'softwareName': null,
      'description': null,
      'totalQuantity': null,
      'availableQuantity': null,
      'licenseKey': null
    });

    return this.serviceSoftware.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.createAssetForm.setValue({
        'softwareID': null,
        'softwareName': null,
        'description': null,
        'totalQuantity': null,
        'availableQuantity': null,
        'licenseKey': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.hcl.licensenetwork.Software',
      'softwareName': this.softwareName.value,
      'description': this.description.value,
      'totalQuantity': this.totalQuantity.value,
      'availableQuantity': this.availableQuantity.value,
      'licenseKey': this.licenseKey.value
    };

    return this.serviceSoftware.updateAsset(form.get('softwareID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceSoftware.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceSoftware.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'softwareID': null,
        'softwareName': null,
        'description': null,
        'totalQuantity': null,
        'availableQuantity': null,
        'licenseKey': null
      };

      if (result.softwareID) {
        formObject.softwareID = result.softwareID;
      } else {
        formObject.softwareID = null;
      }

      if (result.softwareName) {
        formObject.softwareName = result.softwareName;
      } else {
        formObject.softwareName = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.totalQuantity) {
        formObject.totalQuantity = result.totalQuantity;
      } else {
        formObject.totalQuantity = null;
      }

      if (result.availableQuantity) {
        formObject.availableQuantity = result.availableQuantity;
      } else {
        formObject.availableQuantity = null;
      }

      if (result.licenseKey) {
        formObject.licenseKey = result.licenseKey;
      } else {
        formObject.licenseKey = null;
      }

      this.createAssetForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.createAssetForm.setValue({
      'softwareID': null,
      'softwareName': null,
      'description': null,
      'totalQuantity': null,
      'availableQuantity': null,
      'licenseKey': null
      });
  }

}
