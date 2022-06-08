import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  green,
  lightBlue,
  blue,
  indigo,
  deepPurple,
  pink,
  purple
} from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  GroupingPanel,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher
} from "@devexpress/dx-react-scheduler-material-ui";
import { data as appointments } from "./demo-data/grouping";

const PREFIX = "Demo";
// #FOLD_BLOCK
const classes = {
  formControlLabel: `${PREFIX}-formControlLabel`,
  text: `${PREFIX}-text`
};
// #FOLD_BLOCK
const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme: { spacing, palette, typography } }) => ({
    [`&.${classes.formControlLabel}`]: {
      padding: spacing(2),
      paddingLeft: spacing(10)
    },
    [`&.${classes.text}`]: {
      ...typography.caption,
      color: palette.text.secondary,
      fontWeight: "bold",
      fontSize: "1rem"
    }
  })
);

const isWeekOrMonthView = (viewName) =>
  viewName === "Week" || viewName === "Month";

const priorityData = [
  { text: "Table 1", id: 1, color: lightBlue },
  { text: "Table 2", id: 2, color: green },
  { text: "Table 3", id: 3, color: green },
  { text: "Table 4", id: 4, color: green },
  { text: "Table 5", id: 5, color: green },
  { text: "Table 6", id: 6, color: green },
  { text: "Table 7", id: 7, color: green },
  { text: "Table 8", id: 8, color: green },
  { text: "Table 9", id: 9, color: green },
  { text: "Table 10", id: 10, color: green },
  { text: "Table 11", id: 11, color: green },
  { text: "Table 12", id: 12, color: green },
  { text: "Table 13", id: 13, color: green },
  { text: "Table 14", id: 14, color: green },
  { text: "Table 15", id: 15, color: green },
  { text: "Table 16", id: 16, color: green },
  { text: "Table 17", id: 17, color: green },
  { text: "Table 18", id: 18, color: green },
  { text: "Table 19", id: 19, color: green },
  { text: "Table 20", id: 20, color: green },
  { text: "Table 21", id: 21, color: green },
  { text: "Table 22", id: 22, color: green },
  { text: "Table 23", id: 23, color: green },
  { text: "Table 24", id: 24, color: green },
  { text: "Table 25", id: 25, color: green }
];

const GroupOrderSwitcher = ({ isGroupByDate, onChange }) => (
  <StyledFormControlLabel
    control={
      <Checkbox checked={isGroupByDate} onChange={onChange} color="primary" />
    }
    label="Group by Date First"
    className={classes.formControlLabel}
    classes={{ label: classes.text }}
  />
);

export default class GridView extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: appointments.filter((appointment) => appointment.priorityId < 26),
        resources: [
          {
            fieldName: "priorityId",
            title: "Priority",
            instances: priorityData
          }
        ],
        grouping: [
          {
            resourceName: "priorityId"
          }
        ],
        groupByDate: isWeekOrMonthView,
        isGroupByDate: true
      };

      console.log(this.state.data)
  
      this.commitChanges = this.commitChanges.bind(this);
      this.onGroupOrderChange = () => {
        const { isGroupByDate } = this.state;
        this.setState({
          isGroupByDate: !isGroupByDate,
          groupByDate: isGroupByDate ? undefined : isWeekOrMonthView
        });
      };
    }
  
    commitChanges({ added, changed, deleted }) {
      this.setState((state) => {
        let { data } = state;
        if (added) {
          const startingAddedId =
            data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];
          console.log(data)
        }
        if (changed) {
          data = data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          );
        }
        if (deleted !== undefined) {
          data = data.filter((appointment) => appointment.id !== deleted);
        }
        return { data };
      });
    }
  
    render() {
      const {
        data,
        resources,
        grouping,
        groupByDate,
        isGroupByDate
      } = this.state;
  
      return (
        <div>
          <GroupOrderSwitcher
            isGroupByDate={isGroupByDate}
            onChange={this.onGroupOrderChange}
          />
          <Paper>
            <Scheduler data={data} height={660}>
              <ViewState defaultCurrentDate="2018-05-30" />
              <EditingState onCommitChanges={this.commitChanges} />
              <GroupingState grouping={grouping} groupByDate={groupByDate} />
  
              <WeekView
                startDayHour={0}
                endDayHour={24}
                excludedDays={[0, 6]}
              />
              <MonthView />
  
              <Appointments />
              <Resources data={resources} mainResourceName="priorityId" />
              <IntegratedGrouping />
              <IntegratedEditing />
  
              <AppointmentTooltip />
              <AppointmentForm />
  
              <Toolbar />
              <ViewSwitcher />
              <GroupingPanel />
              <DragDropProvider />
            </Scheduler>
          </Paper>
        </div>
      );
    }
  }
  