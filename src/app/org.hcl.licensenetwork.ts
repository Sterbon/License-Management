import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
//import { Profile } from 'selenium-webdriver/firefox';
// export namespace org.hcl.licensenetwork{
   export enum BusinessEntities {
      SOFTWARE_SELLER,
      CORPORATE,
      CORPORATE_SUBSIDARY,
      CORPORATE_PARTNER,
      CORPORATE_CLIENT,
      CORPORATE_JOINT_VENTURE,
   }
   export enum EmployeeTypes {
      CORPORATE_EMPLOYEE,
      CORPORATE_SUBSIDARY_EMPLOYEE,
      CORPORATE_PARTNER_EMPLOYEE,
      CORPORATE_CLIENT_EMPLOYEE,
      CORPORATE_JOINT_VENTURE_EMPLOYEE,
   }
   export class BusinessEntity extends Participant {
      businessEntityID: string;
      businessEntity: BusinessEntities;
      name: string;
   }
   export class EmployeeEntity extends Participant {
      employeeEntityID: string;
      businessEntity: BusinessEntities;
      employeeType: EmployeeTypes;
      name: string;
   }
   export class softwareRequest extends Participant {
      softwareRequestID: string;
      softwareID: Software;
      count: number;
   }
   export class Software extends Asset {
      softwareID: string;
      softwareName: string;
      description: string;
      totalQuantity: number;
      availableQuantity: number;
      owner: BusinessEntity;
   }
   export class businessClaim extends Transaction {
      sReq: softwareRequest;
      software: Software;
      owner: BusinessEntity;
      newOwner: BusinessEntity;
   }
   export class businessRelease extends Transaction {
      sReq: softwareRequest;
      software: Software;
      owner: BusinessEntity;
      newOwner: BusinessEntity;
   }
   export class employeeClaim extends Transaction {
      softwareRequestID: softwareRequest;
      owner: BusinessEntity;
      newOwner: BusinessEntity;
   }
   export class employeeRelease extends Transaction {
      softwareRequestID: softwareRequest;
      owner: BusinessEntity;
      newOwner: BusinessEntity;
   }

   
// }
