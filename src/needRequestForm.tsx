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
} from "./needRequestTypes";

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
  const [needReason, setNeedReason] = useState({
    covid: false,
    illness: false,
    financial: false,
  });
  const [needType, setNeedType] = useState({
    meals: false,
    groceries: false,
    moving: false,
    jobTraining: false,
    homeRepair: false,
    carRepair: false,
    housing: false,
    clothing: false,
    furniture: false,
    other: false,
  });
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
  const [furnitureSize, setFurnitureSize] = useState("");
  const cardStyle = { padding: 12 };

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
      itemCount: moving.itemCount,
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
        request.furnitureSize = furnitureSize;
      }
      alert("Request Submitted.");
      await API.graphql(graphqlOperation(createRequest, { input: request }));
    } catch (err) {
      alert("error: " + JSON.stringify(err));
    }
  };

  const nameCard = (
    <Card style={cardStyle}>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(changeEvent: any) => setFirstName(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(changeEvent: any) => setLastName(changeEvent.target.value)}
        fullWidth
        required
      />
    </Card>
  );

  const contactCard = (
    <Card style={cardStyle}>
      <PhoneInput
        value={phone}
        onChange={(changeEvent: any) => setPhone(changeEvent.value)}
        disableCountryCode={true}
        disableCountryGuess={true}
        disableDropdown={true}
        country={"us"}
        placeholder={"(559) 555-5555"}
        inputProps={{
          autoComplete: "tel",
          required: true,
        }}
      />
      <TextField
        label="Email Address"
        value={email}
        onChange={(changeEvent: any) => setEmail(changeEvent.target.value)}
        autoComplete="email"
        fullWidth
      />
      <TextField
        label="Street Address"
        value={address}
        onChange={(changeEvent: any) => setAddress(changeEvent.target.value)}
        autoComplete="address-line1"
        multiline
        fullWidth
      />
      <TextField
        label="City"
        value={city}
        onChange={(changeEvent: any) => setCity(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Zip Code"
        value={zip}
        onChange={(changeEvent: any) => setZip(changeEvent.target.value)}
        inputProps={{
          inputMode: "numeric",
          pattern: "[1-9][0-9]{4}}",
          maxLength: 5,
          minLength: 5,
        }}
        autoComplete="postal-code"
        fullWidth
      />
    </Card>
  );

  const forYouOrOtherCard = (
    <Card style={cardStyle}>
      <Typography>Is this request for you?</Typography>
      <RadioGroup
        aria-label="Is this request for you?"
        value={agent}
        onChange={(changeEvent: any) => setAgent(changeEvent.target.value)}
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
    </Card>
  );

  const forSelfDetailsCard = (
    <Card style={cardStyle}>
      {" "}
      <Typography>Have you used any other resources?</Typography>
      <RadioGroup
        aria-label="Have you used any other resources?"
        value={usedOtherResources}
        onChange={(changeEvent: any) =>
          setUsedOtherResources(changeEvent.target.value)
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
      {usedOtherResources === "yes" && (
        <TextField
          label="Please list resources"
          value={otherResoources}
          onChange={(changeEvent: any) =>
            setOtherResources(changeEvent.target.value)
          }
        />
      )}
    </Card>
  );

  const forOtherDetailsCard = (
    <Card style={cardStyle}>
      <TextField
        label="Who is the request for?"
        value={referee}
        onChange={(changeEvent: any) => setReferee(changeEvent.target.value)}
      />
      <Typography>
        Does the person know you are submitting this for them?
      </Typography>{" "}
      <RadioGroup
        value={refereeKnows}
        onChange={(changeEvent: any) =>
          setRefereeKnows(changeEvent.target.value)
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
    </Card>
  );

  const leadTracingCard = (
    <Card style={cardStyle}>
      <FormControl>
        <Typography>How did you hear about us?</Typography>
        <RadioGroup
          value={lead}
          onChange={(changeEvent: any) => setLead(changeEvent.target.value)}
        >
          <FormControlLabel
            value={LeadSource.REDEEMERS}
            control={<Radio required={true} />}
            label="Redeemer's Church"
          />
          <FormControlLabel
            value={LeadSource.FAMILY}
            control={<Radio required={true} />}
            label="Family Member"
          />
          <FormControlLabel
            value={LeadSource.FRIEND}
            control={<Radio required={true} />}
            label="Friend"
          />
          <FormControlLabel
            value={LeadSource.OTHER}
            control={<Radio required={true} />}
            label="Other"
          />
        </RadioGroup>
        {lead === LeadSource.OTHER && (
          <TextField
            value={leadOther}
            onChange={(changeEvent: any) =>
              setLeadOther(changeEvent.target.value)
            }
          />
        )}
      </FormControl>
    </Card>
  );

  const needRequestCard = (
    <Card style={cardStyle}>
      {" "}
      <FormControl required>
        <FormGroup>
          <Typography>
            Please select the type(s) of assistance needed.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.meals}
                onChange={handleNeedTypeChange}
                name="meals"
              />
            }
            label="Meals"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.groceries}
                onChange={handleNeedTypeChange}
                name="groceries"
              />
            }
            label="Groceries"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.moving}
                onChange={handleNeedTypeChange}
                name="moving"
              />
            }
            label="Moving Assistance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.jobTraining}
                onChange={handleNeedTypeChange}
                name="jobTraining"
              />
            }
            label="Job Preparedness"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.carRepair}
                onChange={handleNeedTypeChange}
                name="carRepair"
              />
            }
            label="Car Repair or Maintenance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.homeRepair}
                onChange={handleNeedTypeChange}
                name="homeRepair"
              />
            }
            label="Home Repair or Maintenance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.housing}
                onChange={handleNeedTypeChange}
                name="housing"
              />
            }
            label="Housing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.clothing}
                onChange={handleNeedTypeChange}
                name="clothing"
              />
            }
            label="Clothing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.furniture}
                onChange={handleNeedTypeChange}
                name="furniture"
              />
            }
            label="Furniture"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.other}
                onChange={handleNeedTypeChange}
                name="other"
              />
            }
            label="Other"
          />
        </FormGroup>
      </FormControl>
    </Card>
  );

  const needReasonCard = (
    <Card style={cardStyle}>
      <FormControl required error={false}>
        <FormGroup>
          <Typography>
            Why do you need assistance? (Select all that apply)
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.covid}
                onChange={handleNeedReasonChange}
                name="covid"
              />
            }
            label="Loss of loved one due to Covid-19 or other complications"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.illness}
                onChange={handleNeedReasonChange}
                name="illness"
              />
            }
            label="Sick or recovering from sickness"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.financial}
                onChange={handleNeedReasonChange}
                name="financial"
              />
            }
            label="Financially struggling"
          />
        </FormGroup>
      </FormControl>
    </Card>
  );

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
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>
              What is the measurement of the space you need to fit the furniture
              in?
            </Typography>
            <TextField
              required
              value={furnitureSize}
              onChange={(changeEvent: any) =>
                setFurnitureSize(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
  const movingCard = (
    <Card style={cardStyle}>
      <CardHeader title="Moving" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item>
          {" "}
          <FormControl>
            <Typography>
              How many items need to be moved (couch, appliance, whole
              household)?
            </Typography>
            <TextField
              required
              value={moving.itemCount}
              onChange={(changeEvent: any) =>
                handleMovingChange({ itemCount: changeEvent.target.value })
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Do you have transportation such as your own truck or a rented UHaul?
          </Typography>
          <RadioGroup
            value={moving.haveTransportation}
            onChange={(changeEvent: any) =>
              handleMovingChange({
                haveTransportation: changeEvent.target.value,
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
          <FormControl>
            <Typography>Is this move within 30 miles of Reedley?</Typography>
            <RadioGroup
              value={moving.withinRange}
              onChange={(changeEvent: any) => {
                handleMovingChange({
                  withinRange: changeEvent.target.value,
                });
                if (!moving.withinRange) {
                  alert(
                    "We can only help with moves within 30 miles of Reedley."
                  );
                }
              }}
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
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Any conditions that need to be taken into consideration? (Steep
            driveway, dirt roads, stairs, etc.)
          </Typography>
          <RadioGroup
            value={moving.haveSpecialConditions}
            onChange={(changeEvent: any) =>
              handleMovingChange({
                haveSpecialConditions: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        {moving.haveSpecialConditions === "yes" && (
          <Grid item xs={12}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.driveway}
                      onChange={handleMovingConditions}
                      name="driveway"
                    />
                  }
                  label="Steep Driveway"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.stairs}
                      onChange={handleMovingConditions}
                      name="stairs"
                    />
                  }
                  label="Stairs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.unpavedRoad}
                      onChange={handleMovingConditions}
                      name="unpavedRoad"
                    />
                  }
                  label="Unpaved Road"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.other}
                      onChange={handleMovingConditions}
                      name="other"
                    />
                  }
                  label="Other?"
                />
              </FormGroup>

              {moving.other && (
                <FormControl>
                  <Typography>What other things should we know?</Typography>
                  <TextField
                    value={moving.otherDetails}
                    onChange={(changeEvent: any) =>
                      setMoving({
                        ...moving,
                        otherDetails: changeEvent.target.value,
                      })
                    }
                    required
                  ></TextField>
                </FormControl>
              )}
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            value="false"
            control={<Checkbox required={true} />}
            label="I understand that I'm responsible for packing and wrapping."
          />
          <FormControlLabel
            value="false"
            control={<Checkbox required={true} />}
            label="I understand that this is a volunteer operation and that I am responsible for any damage."
          />
          <FormControlLabel
            value="false"
            control={<Checkbox required={true} />}
            label="If the move is to a storage unit I agree to make all arrangements prior to the move."
          />
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
          <Grid item>{nameCard}</Grid>
          <Grid item>{contactCard}</Grid>
          <Grid item>{forYouOrOtherCard}</Grid>
          <Grid item>
            {agent === "yes" && forSelfDetailsCard}
            {agent === "no" && forOtherDetailsCard}
          </Grid>
          <Grid item xs={12}>
            {leadTracingCard}
          </Grid>
          <Grid item xs={12}>
            {needReasonCard}
          </Grid>
          <Grid item>{needRequestCard}</Grid>
          {(needType.meals || needType.groceries) && (
            <Grid item>{foodInfoCard}</Grid>
          )}
          {needType.groceries && <Grid item>{groceriesCard}</Grid>}
          {needType.moving && <Grid item>{movingCard}</Grid>}
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

function getNeedTypes(needType: {
  meals: boolean;
  groceries: boolean;
  moving: boolean;
  jobTraining: boolean;
  homeRepair: boolean;
  carRepair: boolean;
  housing: boolean;
  clothing: boolean;
  furniture: boolean;
  other: boolean;
}) {
  let types: NeedType[] = [];
  if (needType.meals) types.push(NeedType.MEALS);
  if (needType.groceries) types.push(NeedType.GROCERIES);
  if (needType.moving) types.push(NeedType.MOVING);
  if (needType.carRepair) types.push(NeedType.CARREPAIR);
  if (needType.housing) types.push(NeedType.HOUSING);
  if (needType.homeRepair) types.push(NeedType.HOMEREPAIR);
  if (needType.jobTraining) types.push(NeedType.JOBTRAINING);
  if (needType.clothing) types.push(NeedType.CLOTHING);
  if (needType.furniture) types.push(NeedType.FURNITURE);
  if (needType.other) types.push(NeedType.OTHER);
  return types;
}
