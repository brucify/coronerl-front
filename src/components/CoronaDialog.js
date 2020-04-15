import React from 'react';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CoronaDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedValues([]);
    setOpen(false);
  };

  const handleAdd = () => {
    console.log(selectedValues);
    props.fetchForCountry(selectedValues.map((x) => x.id));
    setOpen(false);
    setSelectedValues([]);
  };

  const handleChange = (e, v) => {
    console.log(v);
    setSelectedValues(v);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        Add datasets
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add datasets</DialogTitle>
        <DialogContent className="add-dataset-dialig" >
          <DialogContentText>
            Start typing
          </DialogContentText>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={props.datasets}
            onChange={handleChange}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
             <TextField
               {...params}
               variant="outlined"
               label="Datasets"
               placeholder="Datasets"
             />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
