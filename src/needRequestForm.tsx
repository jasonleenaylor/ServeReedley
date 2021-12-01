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
  createMovingInfo,
  createRequest,
  createSelfOrOtherInfo,
} from "./graphql/mutations";
import { LeadSource, NeedReason, NeedType, RequestStatus } from "./RequestAPI";

export const NeedRequestForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [agent, setAgent] = useState<"" | "yes" | "no">("");
  const [usedOtherResources, setUsedOtherResources] = useState<
    "" | "yes" | "no"
  >("");
  const [otherResoources, setOtherResources] = useState("");
  const [referee, setReferee] = useState("");
  const [refereeKnows, setRefereeKnows] = useState<"" | "yes" | "no">("");
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
  const [groceries, setGroceries] = useState({
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
  });
  const [moving, setMoving] = useState({
    itemCount: 0,
    haveTransportation: true,
    distance: 0.0,
    haveSpecialConditions: false,
    specialConditions: "",
    liabilityAck: false,
  });
  const [jobTraining, setJobTraining] = useState<{
    resumeHelp: "" | "yes" | "no";
    coverLetterHelp: "" | "yes" | "no";
  }>({
    resumeHelp: "",
    coverLetterHelp: "",
  });

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

    let selfOrOther = {
      forSelf: agent == "yes",
      usedOtherResources: usedOtherResources == "yes",
      otherResources: otherResoources,
      requestFor: referee,
      requestIsKnown: refereeKnows == "yes",
    };

    let food = {
      familyMembers: foodInfo.familyMembers,
      children: foodInfo.children,
      haveAllergies: foodInfo.haveAllergies,
      allergies: foodInfo.allergies,
      foodInfoGroceriesId: "",
    };

    let groceriesInfo = {
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

    let movingInfo = {
      itemCount: moving.itemCount,
      distance: moving.distance,
      haveTransportation: moving.haveTransportation,
      specialConditions: moving.specialConditions,
      liabilityAck: moving.liabilityAck,
    };

    let request = {
      dateOfRequest: new Date().toUTCString(),
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      zipCode: zip ? zip : undefined,
      phone: phone,
      email: email,
      spanishOnly: true,
      requestSelfOrOtherInfoId: "",
      requestFoodRequestId: "",
      requestMovingRequestId: "",
      preferredContactTime: "",
      request: "" + needType,
      leadSource: lead,
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
        request.resumeHelp = jobTraining.resumeHelp == "yes";
        request.coverLetterHelp = jobTraining.coverLetterHelp == "yes";
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

  const clothingCard = <Card style={cardStyle}>C</Card>;
  const furnitureCard = <Card style={cardStyle}>F</Card>;
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
            <Typography>
              Distance of travel? (We can only help with moves less than 30
              miles)
            </Typography>
            <TextField
              required
              value={moving.distance}
              onChange={(changeEvent: any) =>
                handleMovingChange({
                  distance: changeEvent.target.value,
                })
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Any conditions that need to be taken into consideration? (Steep
            driveway, dirt roads, stairs, etc.)
          </Typography>
          <RadioGroup
            value={moving.haveSpecialConditions}
            onChange={
              (changeEvent: any) => alert(changeEvent.target.value)
              // handleMovingChange({
              //   haveSpecialConditions: changeEvent.target.value,
              // })
            }
          >
            <FormControlLabel
              value={true}
              control={<Radio required={true} />}
              label="Yes"
            />
            <FormControlLabel
              value={false}
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            {moving.haveSpecialConditions && (
              <TextField
                label="Please list conditions"
                value={moving.specialConditions}
                onChange={(changeEvent: any) =>
                  handleMovingChange({
                    specialConditions: changeEvent.target.value,
                  })
                }
              ></TextField>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            value="false"
            control={<Checkbox required={true} />}
            label="I understand that I'm responsible for packing and wrapping."
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            value="false"
            control={<Checkbox required={true} />}
            label="I understand that this is a volunteer operation and that I am responsible for any damage."
          />
        </Grid>
        <Grid item xs={12}>
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
  const housingCard = <Card style={cardStyle}>House</Card>;
  const carRepairCard = <Card style={cardStyle}>Car</Card>;

  const homeRepairCard = <Card style={cardStyle}>Home</Card>;
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
