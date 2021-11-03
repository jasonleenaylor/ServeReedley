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
import { useState } from "react";
import { createRequest } from "./graphql/mutations";

export const NeedRequestForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [agent, setAgent] = useState<"" | "yes" | "no">("");
  const [usedOtherResources, setUsedOtherResources] = useState<
    "" | "yes" | "no"
  >("");
  const [otherResoources, setOtherResources] = useState("");
  const [referee, setReferee] = useState("");
  const [refereeKnows, setRefereeKnows] = useState<"" | "yes" | "no">("");
  const [lead, setLead] = useState<
    "" | "Redeemers" | "Family" | "Friend" | "Other"
  >("");
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
      address1: address1,
      address2: address2,
      city: city,
      zipCode: zip ? zip : undefined,
      phone: phone,
      email: email,
      spanishOnly: true,
      preferredContactTime: "",
      request: "" + needType,
      specificNeed: "Form Not Complete",
      status: "New",
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
        fullWidth
        required
      />
      <TextField
        label="Email Address"
        value={email}
        onChange={(changeEvent: any) => setEmail(changeEvent.target.value)}
        fullWidth
      />
      <TextField
        label="Street Address 1"
        value={address1}
        onChange={(changeEvent: any) => setAddress1(changeEvent.target.value)}
        fullWidth
      />
      <TextField
        label="Street Address 2"
        value={address2}
        onChange={(changeEvent: any) => setAddress2(changeEvent.target.value)}
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
            value="Redeemer"
            control={<Radio required={true} />}
            label="Redeemer's Church"
          />
          <FormControlLabel
            value="Family"
            control={<Radio required={true} />}
            label="Family Member"
          />
          <FormControlLabel
            value="Friend"
            control={<Radio required={true} />}
            label="Friend"
          />
          <FormControlLabel
            value="Other"
            control={<Radio required={true} />}
            label="Other"
          />
        </RadioGroup>
        {lead === "Other" && (
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
      {needType.meals && (
        <FormControl required>
          <TextField label="Meals" />
        </FormControl>
      )}
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
          <Grid item>
            <Button type="submit">Submit</Button>
          </Grid>{" "}
        </Grid>
      </form>
    </Container>
  );
};
