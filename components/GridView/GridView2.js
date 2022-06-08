import  React,{ useState, useEffect} from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/FormControl';
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
  ViewSwitcher,
  TodayButton,
  DateNavigator,
  
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



// For More COntrollers
// const editingOptionsList = [
//     { id: 'allowAdding', text: 'Adding' },
//     { id: 'allowDeleting', text: 'Deleting' },
//     { id: 'allowUpdating', text: 'Updating' },
//     { id: 'allowResizing', text: 'Resizing' },
//     { id: 'allowDragging', text: 'Dragging' },
//   ];
  
//   const EditingOptionsSelector = ({
//     options, onOptionsChange,
//   }) => (
//     <StyledDiv className={classes.container}>
//       <Typography className={classes.text}>
//         Enabled Options
//       </Typography>
//       <FormGroup row>
//         {editingOptionsList.map(({ id, text }) => (
//           <FormControlLabel
//             control={(
//               <Checkbox
//                 checked={options[id]}
//                 onChange={onOptionsChange}
//                 value={id}
//                 color="primary"
//               />
//             )}
//             classes={{ label: classes.formControlLabel }}
//             label={text}
//             key={id}
//             disabled={(id === 'allowDragging' || id === 'allowResizing') && !options.allowUpdating}
//           />
//         ))}
//       </FormGroup>
//     </StyledDiv>
//   );


function GridView2() {


    const [data, setData] = React.useState(appointments);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
    }
    setIsAppointmentBeingCreated(false);
  }, [setData, setIsAppointmentBeingCreated, data]);

  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    });
  });

  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  )), [allowAdding]);

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating],
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating],
  );

    const [state,setState]=useState({
        data:appointments,
        resources:[
            {
              fieldName: "priorityId",
              title: "Table Management",
              instances: priorityData
            }
          ],
          grouping: [
            {
              resourceName: "priorityId"
            }
          ],
          groupByDate: isWeekOrMonthView,
        isGroupByDate: true,
        currentDate:"2018-05-30"
    })

    const currentDateChange = (currentDate) => { setState({...state, currentDate }); };

    const onGroupOrderChange = () => {
        const { isGroupByDate } = state;
        setState({
            ...state,
          isGroupByDate: !isGroupByDate,
          groupByDate: isGroupByDate ? undefined : isWeekOrMonthView
        });
      };

      const commitChanges=({ added, changed, deleted }) =>{
        setState((state) => {
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
          return { ...state, data };
        });
      }


  return (
    <div>
         {/* <EditingOptionsSelector
        options={editingOptions}
        onOptionsChange={handleEditingOptionsChange}
      /> */}
          <GroupOrderSwitcher  
          isGroupByDate={state.isGroupByDate}
          onChange={onGroupOrderChange}
          />
          <Paper>
            <Scheduler
              data={data}
              height={660}
            >
              <ViewState
              currentDate={state.currentDate}
                // defaultCurrentDate="2018-05-30"
                onCurrentDateChange={currentDateChange}
              />
              <EditingState
                // onCommitChanges={commitChanges}
                onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
              />
              <GroupingState
                grouping={state.grouping}
                groupByDate={state.groupByDate}
              />

              <WeekView
                startDayHour={8.5}
                endDayHour={17}
                excludedDays={[0, 6]}
                timeTableCellComponent={TimeTableCell}
              />
              <MonthView />

              <Appointments />
              <Resources
                data={state.resources}
                mainResourceName="priorityId"
              />
              <IntegratedGrouping />
              <IntegratedEditing />

              <AppointmentTooltip 
              showOpenButton
              showDeleteButton={allowDeleting}
              />
              <AppointmentForm 
              commandButtonComponent={CommandButton}
              readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
              />

              <Toolbar />
              <DateNavigator />
          <TodayButton />
              <ViewSwitcher />
              <GroupingPanel />
              <DragDropProvider 
              allowDrag={allowDrag}
              allowResize={allowResize}
              />
            </Scheduler>
          </Paper>
        </div>
  )
}

export default GridView2