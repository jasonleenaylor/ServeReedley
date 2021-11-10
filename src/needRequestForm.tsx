import { isNonModelFieldType } from "@aws-amplify/datastore";
import {
  Button,
  Card,
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
import { createRequest } from "./graphql/mutations";
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      preferredContactTime: "",
      request: "" + needType,
      leadSource: lead,
      leadOtherDetails: leadOther,
      needReason: getReasons(needReason),
      needTypes: getNeedTypes(needType),
      status: RequestStatus.NEW,
      note: "",
      needFulfiller: "Form not complete",
      dateFulfilled: "",
      followUp: "",
    };

    alert("submitting");
    try {
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
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(changeEvent: any) => setPhone(changeEvent.target.value)}
        autoComplete="tel"
        fullWidth
        required
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
          inputmode: "numeric",
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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Number of family members"
            inputProps={{
              inputmode: "numeric",
              pattern: "[0-9][0-9]?",
              maxLength: 2,
            }}
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
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography>Are there any food allergies?</Typography>
          <RadioGroup
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
            <Typography>Please list allergies</Typography>
            <TextField required></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
  const groceriesCard = (
    <Card style={cardStyle}>
      <FormControl required>
        <FormGroup>
          <Typography>
            Below is a list of items that we can provide. Please check the items
            you would use.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.meals}
                onChange={handleNeedTypeChange}
                name="meals"
              />
            }
            label="Gallon of milk"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.groceries}
                onChange={handleNeedTypeChange}
                name="groceries"
              />
            }
            label="Dozen eggs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.moving}
                onChange={handleNeedTypeChange}
                name="moving"
              />
            }
            label="Bread"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.jobTraining}
                onChange={handleNeedTypeChange}
                name="jobTraining"
              />
            }
            label="20 count flour tortillas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.carRepair}
                onChange={handleNeedTypeChange}
                name="carRepair"
              />
            }
            label="Pound of long grain rice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.homeRepair}
                onChange={handleNeedTypeChange}
                name="homeRepair"
              />
            }
            label="2 Pounds of pinto beans"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.housing}
                onChange={handleNeedTypeChange}
                name="housing"
              />
            }
            label="12oz American cheese singles"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.furniture}
                onChange={handleNeedTypeChange}
                name="furniture"
              />
            }
            label="Pound of ground beef"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.other}
                onChange={handleNeedTypeChange}
                name="other"
              />
            }
            label="8 count hot dogs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.carRepair}
                onChange={handleNeedTypeChange}
                name="carRepair"
              />
            }
            label="Turkey lunch meat"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.homeRepair}
                onChange={handleNeedTypeChange}
                name="homeRepair"
              />
            }
            label="Fresh or canned fruit"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.housing}
                onChange={handleNeedTypeChange}
                name="housing"
              />
            }
            label="Pound of unsalted butter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.clothing}
                onChange={handleNeedTypeChange}
                name="clothing"
              />
            }
            label="Peanut butter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.furniture}
                onChange={handleNeedTypeChange}
                name="furniture"
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
      <Grid container spacing={4}>
        <Grid item>
          {" "}
          <FormControl>
            <Typography>
              How many items need to be moved (couch, appliance, whole
              household)?
            </Typography>
            <TextField required></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Could you provide pictures or measurements if requested?
          </Typography>
          <RadioGroup
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
              What tools or equipment will be needed for the move?
            </Typography>
            <TextField required></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Do you have transportation such as your own truck or a rented UHaul?
          </Typography>
          <RadioGroup
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
            <Typography>What type of transportation will you need?</Typography>
            <TextField required></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Distance of travel? (We can only help with moves less than 30
              miles)
            </Typography>
            <TextField required></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Any conditions that need to be taken into consideration? (Steep
            driveway, dirt roads, stairs, etc.)
          </Typography>
          <RadioGroup
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
            <TextField required label="Please list conditions"></TextField>
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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>Do you need help with your resume?</Typography>
          <RadioGroup
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
          <Typography>
            Do you have a list of references? Need at least 3 minimum
          </Typography>
          <RadioGroup
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
          //            value={agent}
          //            onChange={(changeEvent: any) => setAllergies(changeEvent.target.value)}
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
