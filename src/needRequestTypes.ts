import { LeadSource, NeedReason, NeedType, RequestStatus } from "./RequestAPI";

export enum RadioButtonState {
  UNSET = "",
  YES = "yes",
  NO = "no",
}

export interface GroceriesType {
  milk: boolean;
  eggs: boolean;
  bread: boolean;
  butter: boolean;
  tortillas: boolean;
  rice: boolean;
  beans: boolean;
  cheese: boolean;
  beef: boolean;
  hotdogs: boolean;
  lunchMeat: boolean;
  fruit: boolean;
  peanutButter: boolean;
  jelly: boolean;
}

export interface MovingType {
  withinRange: RadioButtonState;
  itemCount: number;
  haveTransportation: RadioButtonState;
  haveSpecialConditions: string;
  driveway: boolean;
  stairs: boolean;
  unpavedRoad: boolean;
  other: boolean;
  otherDetails: string;
  liabilityAck: boolean;
}

export const defaultGroceries: GroceriesType = {
  milk: false,
  eggs: false,
  bread: false,
  butter: false,
  tortillas: false,
  rice: false,
  beans: false,
  cheese: false,
  beef: false,
  hotdogs: false,
  lunchMeat: false,
  fruit: false,
  peanutButter: false,
  jelly: false,
};

export const defaultMoving: MovingType = {
  withinRange: RadioButtonState.UNSET,
  itemCount: 0,
  haveTransportation: RadioButtonState.UNSET,
  haveSpecialConditions: "",
  driveway: false,
  stairs: false,
  unpavedRoad: false,
  other: false,
  otherDetails: "",
  liabilityAck: false,
};

export const defaultHomeRepair: HomeRepairType = {
  plumbing: false,
  electrical: false,
  painting: false,
  yardwork: false,
  other: false,
  details: "",
};

export interface SelfOrOtherGQL {
  forSelf?: boolean | null;
  usedOtherResources?: boolean | null;
  otherResources?: string | null;
  requestFor?: string | null;
  requestIsKnown?: boolean | null;
}

export interface GroceriesGQL {
  milk?: boolean | null;
  eggs?: boolean | null;
  bread?: boolean | null;
  tortillas?: boolean | null;
  rice?: boolean | null;
  beans?: boolean | null;
  cheese?: boolean | null;
  beef?: boolean | null;
  hotdogs?: boolean | null;
  lunchMeat?: boolean | null;
  fruit?: boolean | null;
  peanutButter?: boolean | null;
  jelly?: boolean | null;
}

export interface FoodInfoGQL {
  familyMembers?: number | null;
  children?: string | null;
  haveAllergies?: boolean | null;
  allergies?: string | null;
  foodInfoGroceriesId?: string | null;
}

export interface MovingInfoGQL {
  itemCount?: number | null;
  haveTransportation?: boolean | null;
  steepDriveway?: boolean | null;
  stairs?: boolean | null;
  unpavedRoad?: boolean | null;
  other?: boolean | null;
  otherDetails?: string | null;
  liabilityAck?: boolean | null;
}

export interface NeedRequestGQL {
  dateOfRequest: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  city: string;
  zipCode?: number | null;
  phone?: string | null;
  email?: string | null;
  spanishOnly?: boolean | null;
  preferredContactTime?: string | null;
  request?: string | null;
  leadSource: LeadSource;
  leadOtherDetails?: string | null;
  requestSelfOrOtherInfoId: string | null;
  requestFoodRequestId: string | null;
  requestMovingRequestId: string | null;
  resumeHelp?: boolean | null;
  coverLetterHelp?: boolean | null;
  needReason: Array<NeedReason | null>;
  needTypes: Array<NeedType | null>;
  status: RequestStatus;
  note?: string | null;
  needFulfiller?: string | null;
  dateFulfilled?: string | null;
  followUp?: string | null;
}

export interface HomeRepairType {
  plumbing: boolean;
  electrical: boolean;
  painting: boolean;
  yardwork: boolean;
  other: boolean;
  details: string;
}

export interface NeedRequestType {}
