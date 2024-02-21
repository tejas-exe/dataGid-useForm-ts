import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormValues } from '../Types/users-types';

interface PopupProps {
  open: boolean;
  selectedCellValue: FormValues;
  handleClose: () => void;
  handleDeleteConfirm: (data: FormValues) => void;
}

const Popup: React.FC<PopupProps> = ({
  open,
  selectedCellValue,
  handleClose,
  handleDeleteConfirm,
}) => {
  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          {'Are you sure you want to delete this contacts ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {`Caution: ${selectedCellValue.first_name} ${selectedCellValue.last_name} will be deleted from your list`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleClose();
              handleDeleteConfirm(selectedCellValue);
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Popup;
