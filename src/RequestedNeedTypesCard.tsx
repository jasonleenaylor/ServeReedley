import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { t } from "i18next";
import {
  INeedTypes,
  NeedRequestType,
  needTypeMapping,
} from "./needRequestTypes";
import { cardStyle } from "./needRequestForm";
import NeedSummaryForTeam from "./NeedSummaryForTeam";
import { useTeams } from "./useTeams";
import { NeedType, Team } from "./RequestAPI";
import { API } from "aws-amplify";
import { createTeamRequest } from "./graphql/mutations";

function NeedCheckbox({
  checked,
  onChange,
  needType,
  request,
  label,
  displayAll,
  handleOpenDialog,
}: {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  needType: NeedType;
  request: NeedRequestType | undefined;
  label: string;
  displayAll: boolean;
  handleOpenDialog:
    | undefined
    | ((type: NeedType, request: NeedRequestType) => void);
}): JSX.Element {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={displayAll ? 12 : 6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              name={needTypeMapping[needType]}
            />
          }
          label={label}
        />
      </Grid>
      {!displayAll && request && handleOpenDialog && (
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginLeft: "auto",
              fontSize: "8pt",
              whiteSpace: "nowrap",
            }}
            onClick={() => handleOpenDialog(needType, request)}
          >
            {t("send_to_team", { team: label })}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

function SendToTeamDialog({
  open,
  onClose,
  needType,
  request,
}: {
  open: boolean;
  onClose: (submitted: boolean) => void;
  needType: NeedType;
  request: NeedRequestType;
}): JSX.Element {
  const [note, setNote] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | "">("");
  const { teams, loading } = useTeams();
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  useEffect(() => {
    const filtered = teams.filter((team) => team.teamType === needType);
    setFilteredTeams(filtered);
    if (filtered.length === 1) {
      setSelectedTeam(filtered[0].id);
    } else {
      setSelectedTeam("");
    }
  }, [teams, needType]);

  const onSubmit = async () => {
    try {
      const input = {
        requestID: request.id,
        teamID: selectedTeam,
        type: needType,
        note,
        askDate: new Date().toISOString(),
      };
      await API.graphql({
        query: createTeamRequest,
        variables: { input },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      onClose(true);
      navigator.clipboard.writeText(
        `https://crn.servereedley.org/team${selectedTeam}`
      );
    } catch (error) {
      console.error("Error creating team request:", error);
    }
  };

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTeam(event.target.value as string);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Send need to ${t(needType)}`}</DialogTitle>
      <DialogContent>
        <NeedSummaryForTeam needType={needType} request={request} />
        {loading ? (
          <CircularProgress />
        ) : (
          <FormControl fullWidth margin="dense">
            <InputLabel id="team-select-label">{t("Choose Team")}</InputLabel>
            <Select
              labelId="team-select-label"
              id="team-select"
              value={selectedTeam}
              onChange={handleTeamChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>{t("Choose Team")}</em>
              </MenuItem>
              {filteredTeams.map((team: Team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.teamName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="note"
          label={t("Additional Notes")}
          type="text"
          fullWidth
          variant="standard"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>{t("cancel")}</Button>
        <Button onClick={onSubmit} disabled={!selectedTeam}>
          {t("submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function RequestedNeedTypesCard(
  needType: INeedTypes,
  handleNeedTypeChange: (event: ChangeEvent<HTMLInputElement>) => void,
  completed?: INeedTypes,
  displayAll: boolean = true,
  request: NeedRequestType | undefined = undefined,
  toast: ((message: string) => void) | undefined = undefined
): JSX.Element {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNeedType, setSelectedNeedType] = useState(NeedType.OTHER);

  const handleOpenDialog = (type: NeedType, request: NeedRequestType) => {
    setSelectedNeedType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = (submitted: boolean) => {
    setOpenDialog(false);
    if (submitted && toast) toast("Team link copied to clipboard");
  };

  return (
    <Card style={cardStyle}>
      <FormControl required>
        <FormGroup>
          {(displayAll || needType.groceries) && (
            <NeedCheckbox
              checked={
                displayAll ? needType.groceries : completed?.groceries || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.GROCERIES}
              request={request}
              label={t("groceries")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {needType.meals && (
            <NeedCheckbox
              checked={displayAll ? needType.meals : completed?.meals || false}
              onChange={handleNeedTypeChange}
              needType={NeedType.MEALS}
              request={request}
              label={t("meals")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.clothing) && (
            <NeedCheckbox
              checked={
                displayAll ? needType.clothing : completed?.clothing || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.CLOTHING}
              request={request}
              label={t("clothing")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.furniture) && (
            <NeedCheckbox
              checked={
                displayAll ? needType.furniture : completed?.furniture || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.FURNITURE}
              request={request}
              label={t("furniture")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.carRepair) && (
            <NeedCheckbox
              checked={
                displayAll ? needType.carRepair : completed?.carRepair || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.CARREPAIR}
              request={request}
              label={t("car_repair")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.homeRepair) && (
            <NeedCheckbox
              checked={
                displayAll
                  ? needType.homeRepair
                  : completed?.homeRepair || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.HOMEREPAIR}
              request={request}
              label={t("home_repair")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.hygeneItems) && (
            <NeedCheckbox
              checked={
                displayAll
                  ? needType.hygeneItems
                  : completed?.hygeneItems || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.HYGENEITEMS}
              request={request}
              label={t("hygene_items")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.householdItems) && (
            <NeedCheckbox
              checked={
                displayAll
                  ? needType.householdItems
                  : completed?.householdItems || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.HOUSEHOLDITEMS}
              request={request}
              label={t("household_items")}
              displayAll={displayAll}
              handleOpenDialog={handleOpenDialog}
            />
          )}
          {(displayAll || needType.housing) && (
            <NeedCheckbox
              checked={
                displayAll ? needType.housing : completed?.housing || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.HOUSING}
              request={request}
              label={t("housing")}
              displayAll={displayAll}
              handleOpenDialog={undefined}
            />
          )}
          {(displayAll || needType.jobTraining) && (
            <NeedCheckbox
              checked={
                displayAll
                  ? needType.jobTraining
                  : completed?.jobTraining || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.JOBTRAINING}
              request={request}
              label={t("job_prep")}
              displayAll={displayAll}
              handleOpenDialog={undefined}
            />
          )}
          {(displayAll || needType.moving) && (
            <NeedCheckbox
              checked={
                displayAll ? needType.moving : completed?.moving || false
              }
              onChange={handleNeedTypeChange}
              needType={NeedType.MOVING}
              request={request}
              label={t("moving_assistance")}
              displayAll={displayAll}
              handleOpenDialog={undefined}
            />
          )}
          {(displayAll || needType.other) && (
            <NeedCheckbox
              checked={displayAll ? needType.other : completed?.other || false}
              onChange={handleNeedTypeChange}
              needType={NeedType.OTHER}
              request={request}
              label={t("other")}
              displayAll={displayAll}
              handleOpenDialog={undefined}
            />
          )}
        </FormGroup>
      </FormControl>
      <SendToTeamDialog
        open={openDialog}
        onClose={handleCloseDialog}
        needType={selectedNeedType}
        request={request!} // request is guaranteed to be set when needed in this workflow
      />
    </Card>
  );
}
