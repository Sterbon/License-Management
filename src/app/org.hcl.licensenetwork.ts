import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.hcl.licensenetwork{
   export enum BusinessEntities {
      SOFTWARE_SELLER,
      CORPORATE,
      CORPORATE_SUBSIDARY,
      CORPORATE_PARTNER,
      CORPORATE_CLIENT,
      CORPORATE_JOINT_VENTURE,
   }
   export class Software extends Asset {
      softwareID: string;
      softwareName: string;
      description: string;
      totalQuantity: number;
      availableQuantity: number;
      licenseKey: string;
   }
   export class BusinessEntity extends Participant {
      businessEntityID: string;
      businessEntity: BusinessEntities;
      bName: string;
      software: Software;
      availableQuantity: number;
      totalQuantity: number;
   }
   export class EmployeeEntity extends Participant {
      employeeEntityID: string;
      businessEnties: BusinessEntities;
      eName: string;
      claimed: boolean;
      businessEntity: BusinessEntity;
      software: Software;
   }
   export class businessClaim extends Transaction {
      software: Software;
      businessEntity: BusinessEntity;
      totalClaims: number;
   }
   export class businessRelease extends Transaction {
      software: Software;
      businessEntity: BusinessEntity;
      totalRelease: number;
   }
   export class employeeClaim extends Transaction {
      software: Software;
      employeeEntity: EmployeeEntity;
   }
   export class employeeRelease extends Transaction {
      software: Software;
      employeeEntity: EmployeeEntity;
   }
// }
