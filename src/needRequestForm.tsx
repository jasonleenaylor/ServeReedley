import parsePhoneNumber from "libphonenumber-js";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import React, { SetStateAction, useState } from "react";
import { t } from "i18next";
import {
  createFoodInfo,
  createHomeRepairType,
  createHouseholdItems,
  createMovingInfo,
  createRequest,
  createSelfOrOtherInfo,
} from "./graphql/mutations";
import { LeadSource, NeedReason, RequestStatus } from "./RequestAPI";
import {
  defaultGroceries,
  defaultMoving,
  RadioButtonState,
  SelfOrOtherGQL,
  FoodInfoGQL,
  MovingInfoGQL,
  NeedRequestGQL,
  IHomeRepairType,
  defaultHomeRepair,
  defaultNeedType,
  defaultNeedReason,
  getNeedTypes,
  defaultFoodInfo,
  IJobTraining,
  IMovingType,
  HouseholdItemsGQL,
  ILocalizeProps,
} from "./needRequestTypes";
import {
  carRepairCard,
  clothingCard,
  contactCard,
  foodInfoCard,
  forOtherDetailsCard,
  forSelfDetailsCard,
  forYouOrOtherCard,
  furnitureCard,
  groceriesCard,
  homeRepairCard,
  householdItemsCard,
  jobTrainingCard,
  leadTracingCard,
  movingCard,
  nameCard,
  needReasonCard,
  needRequestCard,
  otherNeedCard,
} from "./needFormCards";
import { useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export const NeedRequestForm = (props: ILocalizeProps) => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [agent, setAgent] = useState<RadioButtonState>(RadioButtonState.UNSET);
  const [usedOtherResources, setUsedOtherResources] =
    useState<RadioButtonState>(RadioButtonState.UNSET);
  const [otherResoources, setOtherResources] = useState("");
  const [referee, setReferee] = useState("");
  const [refereeKnows, setRefereeKnows] = useState<RadioButtonState>(
    RadioButtonState.UNSET
  );
  const [lead, setLead] = useState<LeadSource | null>(null);
  const [leadOther, setLeadOther] = useState("");
  const [needReason, setNeedReason] = useState(defaultNeedReason);
  const [needType, setNeedType] = useState(defaultNeedType);
  const [foodInfo, setFoodInfo] = useState(defaultFoodInfo);
  const [groceries, setGroceries] = useState(defaultGroceries);
  const [moving, setMoving] = useState(defaultMoving);
  const [jobTraining, setJobTraining] = useState<IJobTraining>({
    resumeHelp: RadioButtonState.UNSET,
    coverLetterHelp: RadioButtonState.UNSET,
  });
  const [carRepairDetails, setCarRepairDetails] = useState("");
  const [homeRepairDetails, setHomeRepairDetails] =
    useState<IHomeRepairType>(defaultHomeRepair);
  const [clothingType, setClothingType] = useState("");
  const [clothingSize, setClothingSize] = useState("");
  const [furnitureType, setFurnitureType] = useState("");
  const [housingHelp, setHousingHelp] = useState<RadioButtonState>(
    RadioButtonState.UNSET
  );
  const [otherNeeds, setOtherNeeds] = useState("");
  const [householdItems, setHouseholdItems] = useState<HouseholdItemsGQL>({});

  function handleCheckboxChange<T>(
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (value: SetStateAction<T>) => void,
    currentValue: T
  ) {
    setter({ ...currentValue, [event.target.name]: event.target.checked });
  }

  const handleFoodInfoChange = (newFoodInfo: {}) => {
    setFoodInfo({
      ...foodInfo,
      ...newFoodInfo,
    });
  };

  const handleMovingChange = (newMovingInfo: IMovingType) => {
    setMoving({
      ...moving,
      ...newMovingInfo,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let selfOrOther: SelfOrOtherGQL = {
      forSelf: agent === RadioButtonState.YES,
      usedOtherResources: usedOtherResources === RadioButtonState.YES,
      otherResources: otherResoources,
      requestFor: referee,
      requestIsKnown: refereeKnows === RadioButtonState.YES,
    };

    let food: FoodInfoGQL = {
      familyMembers: foodInfo.familyMembers,
      children: foodInfo.children,
      haveAllergies: foodInfo.haveAllergies === RadioButtonState.YES,
      allergies: foodInfo.allergies,
      milk: groceries.milk,
      eggs: groceries.eggs,
      bread: groceries.bread,
      tortillas: groceries.tortillas,
      rice: groceries.rice,
      beans: groceries.beans,
      cheese: groceries.cheese,
      beef: groceries.beef,
      hotdogs: groceries.hotdogs,
      lunchMeat: groceries.lunchMeat,
      fruit: groceries.fruit,
      peanutButter: groceries.peanutButter,
      jelly: groceries.jelly,
    };

    let movingInfo: MovingInfoGQL = {
      items: moving.items,
      haveTransportation: moving.haveTransportation === RadioButtonState.YES,
      steepDriveway: moving.steepDriveway,
      stairs: moving.stairs,
      unpavedRoad: moving.unpavedRoad,
      other: moving.other,
      otherDetails: moving.otherDetails,
      liabilityAck: moving.liabilityAck,
    };

    let homeRepairInfo: IHomeRepairType = {
      plumbing: homeRepairDetails.plumbing,
      electrical: homeRepairDetails.electrical,
      painting: homeRepairDetails.painting,
      yardwork: homeRepairDetails.yardwork,
      other: homeRepairDetails.other,
      details: homeRepairDetails.details,
    };

    let request: NeedRequestGQL = {
      dateOfRequest: new Date().toUTCString(),
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      zipCode: isNaN(parseInt(zip)) ? parseInt(zip) : null,
      phone: phone,
      email: email,
      spanishOnly: true,
      requestSelfOrOtherInfoId: "",
      requestFoodRequestId: "",
      requestMovingRequestId: "",
      preferredContactTime: "",
      request: "" + needType,
      leadSource: lead!,
      leadOtherDetails: leadOther,
      resumeHelp: false,
      coverLetterHelp: false,
      needReason: getReasons(needReason),
      needTypes: getNeedTypes(needType),
      status: RequestStatus.NEW,
      housingHelp: housingHelp === RadioButtonState.YES,
      otherNeeds: otherNeeds,
      needFulfiller: "",
      dateFulfilled: "",
      followUp: "",
    };

    try {
      let result: any = await API.graphql(
        graphqlOperation(createSelfOrOtherInfo, { input: selfOrOther })
      );
      request.requestSelfOrOtherInfoId = result.data.createSelfOrOtherInfo.id;
      if (needType.meals || needType.groceries) {
        try {
          result = await API.graphql(
            graphqlOperation(createFoodInfo, { input: food })
          );
          request.requestFoodRequestId = result.data.createFoodInfo.id;
        } catch (err) {
          alert("food info: " + JSON.stringify(err));
        }
      }
      if (needType.moving) {
        let result: any = await API.graphql(
          graphqlOperation(createMovingInfo, { input: movingInfo })
        );
        request.requestMovingRequestId = result.data.createMovingInfo.id;
      }
      if (needType.jobTraining) {
        request.resumeHelp = jobTraining.resumeHelp === "yes";
        request.coverLetterHelp = jobTraining.coverLetterHelp === "yes";
      }
      if (needType.carRepair) {
        request.carRepairDetails = carRepairDetails;
      }
      if (needType.homeRepair) {
        try {
          result = await API.graphql(
            graphqlOperation(createHomeRepairType, { input: homeRepairInfo })
          );
          request.requestHomeRepairTypeId = result.data.createHomeRepairType.id;
        } catch (err) {
          alert("home maintenance error: " + JSON.stringify(err));
        }
      }
      if (needType.householdItems) {
        try {
          result = await API.graphql(
            graphqlOperation(createHouseholdItems, { input: householdItems })
          );
          request.requestHouseholdItemsId = result.data.createHouseholdItems.id;
        } catch (err) {
          alert("household items error: " + JSON.stringify(err));
        }
      }
      if (needType.clothing) {
        request.clothingSize = clothingSize;
        request.clothingType = clothingType;
      }
      if (needType.furniture) {
        request.furnitureType = furnitureType;
      }
      await API.graphql(graphqlOperation(createRequest, { input: request }));
      history.push("/need-submitted");
    } catch (err) {
      alert("error: " + JSON.stringify(err));
    }
  };

  function housingPhone(phone: string) {
    let formattedPhone = parsePhoneNumber(phone, "US")?.formatNational();
    let phoneUri = parsePhoneNumber(phone, "US")?.getURI();
    return (
      <Trans i18nKey="housing_phone_field">
        Phone: <a href={phoneUri}>{{ formattedPhone }}</a>
      </Trans>
    );
  }

  const housingCard = (
    <Card style={cardStyle}>
      <CardHeader
        title={t("housing")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>HOPE Sanger</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5598757677")}
            </Grid>
            <Grid item xs={12}>
              {t("address_label", {
                address: "502 L Street, Sanger, CA 93657",
              })}
            </Grid>
            <Grid item xs={12}>
              {t("housing_hope_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Marjaree Mason Center</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5592334357")}
            </Grid>
            <Grid item xs={12}>
              {t("housing_marjaree_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Faith House</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5594034342")}
            </Grid>
            <Grid item xs={12}>
              {t("housing_faithhouse_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>River Harvest Community Center</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5596388882")}
            </Grid>
            <Grid item xs={12}>
              {t("address_label", {
                address: "856 S. Reed Ave. Reedley, CA 93654",
              })}
            </Grid>
            <Grid item xs={12}>
              {t("housing_riverharvest_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Map Point</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5595126777")}
            </Grid>
            <Grid item xs={12}>
              {t("housing_mappoint_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Evangel Home</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5592644714")}
            </Grid>
            <Grid item xs={12}>
              {t("housing_evangel_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Fresno Housing Authority</Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("18558328082")}
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5592644714ext.4475")}
            </Grid>
            <Grid item xs={12}>
              {t("address_label", {
                address: "1331 Fulton Street, Fresno, CA",
              })}
            </Grid>
            <Grid item xs={12}>
              {t("housing_fha_criteria")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>
                Westcare Continuum of Care Program for Homeless Persons
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {housingPhone("5592654800")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={housingHelp === RadioButtonState.YES}
                onChange={(event) =>
                  setHousingHelp(
                    event.target.checked
                      ? RadioButtonState.YES
                      : RadioButtonState.NO
                  )
                }
                name="housingHelp"
              />
            }
            label={t("housing_help")}
          />
        </Grid>
      </Grid>
    </Card>
  );

  return (
    <Container>
      <Toolbar>
        <Grid container>
          <Grid item xs={1}>
            <FormControl variant="outlined">
              <Select
                labelId="lng-label"
                id="lng"
                value={i18n.language}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  i18n.changeLanguage(e.target.value as string);
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={11}
            style={{ textAlign: "center", verticalAlign: "center" }}
          >
            <Typography>COMMUNITY RESOURCE NETWORK</Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <Grid container>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography>{t("crn_limitations")}</Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item>
            {nameCard(firstName, setFirstName, lastName, setLastName)}
          </Grid>
          <Grid item>
            {contactCard(
              phone,
              setPhone,
              email,
              setEmail,
              address,
              setAddress,
              city,
              setCity,
              zip,
              setZip
            )}
          </Grid>
          <Grid item>{forYouOrOtherCard(agent, setAgent)}</Grid>
          <Grid item>
            {agent === "yes" &&
              forSelfDetailsCard(
                usedOtherResources,
                setUsedOtherResources,
                otherResoources,
                setOtherResources,
                props.t
              )}
            {agent === "no" &&
              forOtherDetailsCard(
                referee,
                setReferee,
                refereeKnows,
                setRefereeKnows
              )}
          </Grid>
          <Grid item xs={12}>
            {leadTracingCard(lead, setLead, leadOther, setLeadOther, props.t)}
          </Grid>
          <Grid item xs={12}>
            {needReasonCard(needReason, (event) =>
              handleCheckboxChange(event, setNeedReason, needReason)
            )}
          </Grid>
          <Grid item>
            {needRequestCard(needType, (event) =>
              handleCheckboxChange(event, setNeedType, needType)
            )}
          </Grid>
          {(needType.meals || needType.groceries) && (
            <Grid item>
              {foodInfoCard(needType.meals, foodInfo, handleFoodInfoChange)}
            </Grid>
          )}
          {needType.groceries && (
            <Grid item>
              {groceriesCard(groceries, (event) =>
                handleCheckboxChange(event, setGroceries, groceries)
              )}
            </Grid>
          )}
          {needType.moving && (
            <Grid item>{movingCard(moving, handleMovingChange)}</Grid>
          )}
          {needType.jobTraining && (
            <Grid item>{jobTrainingCard(jobTraining, setJobTraining)}</Grid>
          )}
          {needType.carRepair && (
            <Grid item>
              {carRepairCard(carRepairDetails, setCarRepairDetails)}
            </Grid>
          )}
          {needType.homeRepair && (
            <Grid item>
              {homeRepairCard(homeRepairDetails, setHomeRepairDetails)}
            </Grid>
          )}
          {needType.housing && <Grid item>{housingCard}</Grid>}
          {needType.householdItems && (
            <Grid item>
              {householdItemsCard(householdItems, (event) =>
                handleCheckboxChange(event, setHouseholdItems, householdItems)
              )}
            </Grid>
          )}
          {needType.clothing && (
            <Grid item>
              {clothingCard(
                clothingType,
                clothingSize,
                setClothingType,
                setClothingSize
              )}
            </Grid>
          )}
          {needType.furniture && (
            <Grid item>{furnitureCard(furnitureType, setFurnitureType)}</Grid>
          )}
          {needType.other && (
            <Grid item>{otherNeedCard(otherNeeds, setOtherNeeds)}</Grid>
          )}
          <Grid item>
            <Button type="submit">Submit</Button>
          </Grid>{" "}
        </Grid>
      </form>
    </Container>
  );
};

function getReasons(needReason: {
  covid: boolean;
  illness: boolean;
  financial: boolean;
}) {
  let reasons: NeedReason[] = [];
  if (needReason.covid) reasons.push(NeedReason.COVID);
  if (needReason.illness) reasons.push(NeedReason.ILLNESS);
  if (needReason.financial) reasons.push(NeedReason.FINANCIAL);
  return reasons;
}

export const cardStyle = { padding: 12 };
