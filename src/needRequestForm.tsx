import { isNonModelFieldType } from "@aws-amplify/datastore";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Container,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import { FormEvent, useState } from "react";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import {
  createFoodInfo,
  createGroceries,
  createHomeRepairType,
  createMovingInfo,
  createRequest,
  createSelfOrOtherInfo,
} from "./graphql/mutations";
import {
  FoodInfo,
  LeadSource,
  NeedReason,
  NeedType,
  RequestStatus,
} from "./RequestAPI";
import {
  IGroceriesType,
  defaultGroceries,
  defaultMoving,
  RadioButtonState,
  SelfOrOtherGQL,
  FoodInfoGQL,
  GroceriesGQL,
  MovingInfoGQL,
  NeedRequestGQL,
  IHomeRepairType,
  defaultHomeRepair,
  defaultNeedType,
  defaultNeedReason,
  getNeedTypes,
} from "./needRequestTypes";
import {
  contactCard,
  forOtherDetailsCard,
  forSelfDetailsCard,
  forYouOrOtherCard,
  leadTracingCard,
  movingCard,
  nameCard,
  needReasonCard,
  needRequestCard,
} from "./needFormCards";

export const NeedRequestForm = () => {
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
  const [foodInfo, setFoodInfo] = useState({
    familyMembers: null,
    children: "",
    haveAllergies: false,
    allergies: "",
  });
  const [groceries, setGroceries] = useState(defaultGroceries);
  const [moving, setMoving] = useState(defaultMoving);
  const [jobTraining, setJobTraining] = useState<{
    resumeHelp: RadioButtonState;
    coverLetterHelp: RadioButtonState;
  }>({
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

  const handleNeedReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNeedReason({
      ...needReason,
      [event.target.name]: event.target.checked,
    });
  };

  const handleNeedTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeedType({
      ...needType,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMovingConditions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMoving({
      ...moving,
      [event.target.name]: event.target.checked,
    });
  };

  const handleHomeRepair = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHomeRepairDetails({
      ...homeRepairDetails,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGroceriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroceries({
      ...groceries,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFoodInfoChange = (newFoodInfo: {}) => {
    setFoodInfo({
      ...foodInfo,
      ...newFoodInfo,
    });
  };

  const handleMovingChange = (newMovingInfo: {}) => {
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
      haveAllergies: foodInfo.haveAllergies,
      allergies: foodInfo.allergies,
      foodInfoGroceriesId: "",
    };

    let groceriesInfo: GroceriesGQL = {
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
      steepDriveway: moving.driveway,
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
      zipCode: parseInt(zip) === NaN ? parseInt(zip) : null,
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
      note: "",
      needFulfiller: "",
      dateFulfilled: "",
      followUp: "",
    };

    try {
      let result: any = await API.graphql(
        graphqlOperation(createSelfOrOtherInfo, { input: selfOrOther })
      );
      request.requestSelfOrOtherInfoId = result.data.createSelfOrOtherInfo.id;
      let groceriesId = "";
      if (needType.groceries) {
        try {
          result = await API.graphql(
            graphqlOperation(createGroceries, { input: groceriesInfo })
          );
          groceriesId = result.data.createGroceries.id;
        } catch (err) {
          alert("groceries error: " + JSON.stringify(err));
        }
      }
      if (needType.meals || needType.groceries) {
        try {
          food.foodInfoGroceriesId = groceriesId;
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
      if (needType.clothing) {
        request.clothingSize = clothingSize;
        request.clothingType = clothingType;
      }
      if (needType.furniture) {
        request.furnitureType = furnitureType;
      }
      alert("Request Submitted.");
      await API.graphql(graphqlOperation(createRequest, { input: request }));
    } catch (err) {
      alert("error: " + JSON.stringify(err));
    }
  };

  const foodInfoCard = (
    <Card style={cardStyle}>
      <CardHeader
        title={
          needType.meals ? "Family info for meals" : "Family info for groceries"
        }
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Number of family members"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9][0-9]?",
              maxLength: 2,
            }}
            onChange={(changeEvent: any) =>
              handleFoodInfoChange({ familyMembers: changeEvent.target.value })
            }
            value={foodInfo.familyMembers}
            required
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Please list ages of children under the age of 18
            </Typography>
            <TextField
              inputProps={{
                pattern: "([0-9][0-8]?[ -,]?[ ]?)*",
              }}
              helperText="1,4,12"
              value={foodInfo.children}
              onChange={(changeEvent: any) =>
                handleFoodInfoChange({
                  children: changeEvent.target.value,
                })
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography>Are there any food allergies?</Typography>
          <RadioGroup
            value={foodInfo.haveAllergies}
            onChange={(changeEvent: any) =>
              handleFoodInfoChange({
                haveAllergies: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        {foodInfo.haveAllergies && (
          <Grid item xs={12}>
            <FormControl>
              <Typography>Please list allergies</Typography>
              <TextField
                value={foodInfo.allergies}
                onChange={(changeEvent: any) =>
                  handleFoodInfoChange({
                    allergies: changeEvent.target.value,
                  })
                }
                required
              ></TextField>
            </FormControl>
          </Grid>
        )}{" "}
      </Grid>
    </Card>
  );
  const groceriesCard = (
    <Card style={cardStyle}>
      <CardHeader title="Groceries" titleTypographyProps={{ variant: "h6" }} />
      <FormControl required>
        <FormGroup>
          <Typography>
            Below is a list of items that we can provide. Please check the items
            you would use.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.milk}
                onChange={handleGroceriesChange}
                name="milk"
              />
            }
            label="Gallon of milk"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.eggs}
                onChange={handleGroceriesChange}
                name="eggs"
              />
            }
            label="Dozen eggs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.bread}
                onChange={handleGroceriesChange}
                name="bread"
              />
            }
            label="Bread"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.tortillas}
                onChange={handleGroceriesChange}
                name="tortillas"
              />
            }
            label="20 count flour tortillas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.rice}
                onChange={handleGroceriesChange}
                name="rice"
              />
            }
            label="Pound of long grain rice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.beans}
                onChange={handleGroceriesChange}
                name="beans"
              />
            }
            label="2 Pounds of pinto beans"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.cheese}
                onChange={handleGroceriesChange}
                name="cheese"
              />
            }
            label="12oz American cheese singles"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.beef}
                onChange={handleGroceriesChange}
                name="beef"
              />
            }
            label="Pound of ground beef"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.hotdogs}
                onChange={handleGroceriesChange}
                name="hotdogs"
              />
            }
            label="8 count hot dogs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.lunchMeat}
                onChange={handleGroceriesChange}
                name="lunchMeat"
              />
            }
            label="Turkey lunch meat"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.fruit}
                onChange={handleGroceriesChange}
                name="fruit"
              />
            }
            label="Fresh or canned fruit"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.butter}
                onChange={handleGroceriesChange}
                name="butter"
              />
            }
            label="Pound of unsalted butter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.peanutButter}
                onChange={handleGroceriesChange}
                name="peanutButter"
              />
            }
            label="Peanut butter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.jelly}
                onChange={handleGroceriesChange}
                name="jelly"
              />
            }
            label="Jelly"
          />
        </FormGroup>
      </FormControl>
    </Card>
  );

  const clothingCard = (
    <Card style={cardStyle}>
      {" "}
      <CardHeader title="Clothing" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>What type of clothing do you need?</Typography>
            <TextField
              required
              value={clothingType}
              onChange={(changeEvent: any) =>
                setClothingType(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>What size clothing do you need?</Typography>
            <TextField
              required
              value={clothingSize}
              onChange={(changeEvent: any) =>
                setClothingSize(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
  const furnitureCard = (
    <Card style={cardStyle}>
      {" "}
      <CardHeader title="Furniture" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>What type of furniture do you need?</Typography>
            <TextField
              required
              value={furnitureType}
              onChange={(changeEvent: any) =>
                setFurnitureType(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );

  const jobTrainingCard = (
    <Card style={cardStyle}>
      <CardHeader
        title="Job Training"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>Do you need help with your resume?</Typography>
          <RadioGroup
            value={jobTraining.resumeHelp}
            onChange={(changeEvent: any) =>
              setJobTraining({
                ...jobTraining,
                resumeHelp: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography>Do you need help writing a cover letter?</Typography>
          <RadioGroup
            value={jobTraining.coverLetterHelp}
            onChange={(changeEvent: any) =>
              setJobTraining({
                ...jobTraining,
                coverLetterHelp: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Card>
  );
  const housingCard = (
    <Card style={cardStyle}>
      <CardHeader
        title="Housing Referrals"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>HOPE Sanger</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5598757677">(559) 875-7677</a>
            </Grid>
            <Grid item xs={12}>
              Address: 502 L Street, Sanger, CA 93657
            </Grid>
            <Grid item xs={12}>
              Criteria: 17 rooms at a renovated hotel for homeless individuals,
              families, and single parents with children.
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Marjaree Mason Center</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5592334357">(559) 233-4357</a>
            </Grid>
            <Grid item xs={12}>
              Criteria: victims of domestic violence, male or female, families
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Faith House</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5594034342">(559) 403-4342</a>
            </Grid>
            <Grid item xs={12}>
              Criteria: 30-60 day stay for displaced families.
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>River Harvest Community Center</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5596388882">(559) 638-8882</a>
            </Grid>
            <Grid item xs={12}>
              Address: 856 S. Reed Ave. Reedley, CA 93654
            </Grid>
            <Grid item xs={12}>
              Criteria: sober living accommodations for male, female, or
              families
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Map Point</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5595126777">(559) 512-6777</a>
            </Grid>
            <Grid item xs={12}>
              Criteria: Low income housing
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Evangel Home</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5592644714">(559) 264-4714</a>
            </Grid>
            <Grid item xs={12}>
              Criteria: Emergency shelter in Fresno; possible long term housing
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Fresno Housing Authority</Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:18558328082">1-855-832-8082</a> and/or{" "}
              <a href="tel:5594438400">(559) 443-8400</a> x 4475
            </Grid>
            <Grid item xs={12}>
              Address: 1331 Fulton Street, Fresno, CA
            </Grid>
            <Grid item xs={12}>
              Criteria: Emergency Housing
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography>
                Westcare Continuum of Care Program for Homeless Persons
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Phone: <a href="tel:5592654800">(559) 265-4800</a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>I would like additional help with housing</Typography>
        </Grid>
      </Grid>
    </Card>
  );

  const carRepairCard = (
    <Card style={cardStyle}>
      <CardHeader
        title="Car Maintenence/Repair"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>
            Serve Reedley can only help with minor maintenance and repairs.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Please describe the work needed on your vehicle.
            </Typography>
            <TextField
              value={carRepairDetails}
              onChange={(changeEvent: any) =>
                setCarRepairDetails(changeEvent.target.value)
              }
              required
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );

  const homeRepairCard = (
    <Card style={cardStyle}>
      <CardHeader
        title="Home Maintenance/Repair"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>
            Serve Reedley can only help with minor maintenance and repairs.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.plumbing}
                    onChange={handleHomeRepair}
                    name="plumbing"
                  />
                }
                label="Plumbing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.electrical}
                    onChange={handleHomeRepair}
                    name="electrical"
                  />
                }
                label="Electrical"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.painting}
                    onChange={handleHomeRepair}
                    name="painting"
                  />
                }
                label="Painting"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.yardwork}
                    onChange={handleHomeRepair}
                    name="yardwork"
                  />
                }
                label="Yard Work"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.other}
                    onChange={handleHomeRepair}
                    name="other"
                  />
                }
                label="Other?"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Please describe the work needed on your home.
            </Typography>
            <TextField
              value={homeRepairDetails.details}
              onChange={(changeEvent: any) =>
                setHomeRepairDetails({
                  ...homeRepairDetails,
                  details: changeEvent.target.value,
                })
              }
              required
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
  const otherNeedCard = <Card style={cardStyle}>Other</Card>;
  return (
    <Container>
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
                setOtherResources
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
            {leadTracingCard(lead, setLead, leadOther, setLeadOther)}
          </Grid>
          <Grid item xs={12}>
            {needReasonCard(needReason, handleNeedReasonChange)}
          </Grid>
          <Grid item>{needRequestCard(needType, handleNeedTypeChange)}</Grid>
          {(needType.meals || needType.groceries) && (
            <Grid item>{foodInfoCard}</Grid>
          )}
          {needType.groceries && <Grid item>{groceriesCard}</Grid>}
          {needType.moving && (
            <Grid item>
              {movingCard(moving, handleMovingChange, handleMovingConditions)}
            </Grid>
          )}
          {needType.jobTraining && <Grid item>{jobTrainingCard}</Grid>}
          {needType.carRepair && <Grid item>{carRepairCard}</Grid>}
          {needType.homeRepair && <Grid item>{homeRepairCard}</Grid>}
          {needType.housing && <Grid item>{housingCard}</Grid>}
          {needType.clothing && <Grid item>{clothingCard}</Grid>}
          {needType.furniture && <Grid item>{furnitureCard}</Grid>}
          {needType.other && <Grid item>{otherNeedCard}</Grid>}
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
