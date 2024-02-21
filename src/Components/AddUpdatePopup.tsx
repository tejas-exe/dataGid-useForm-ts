import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  DialogActions,
  FormHelperText,
  MenuItem,
  Select,
} from '@mui/material';
import { FormValues } from '../Types/users-types';
import { useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import { Add, Close } from '@mui/icons-material';

interface OpenFormProps {
  openForm: boolean;
  updateField: boolean;
  selectedCellValue: FormValues;
  handleCloseForm: () => void;
  handleSubmitForm: (data: FormValues) => void;
}

const AddUpdatePopup: React.FC<OpenFormProps> = ({
  openForm,
  updateField,
  selectedCellValue,
  handleCloseForm,
  handleSubmitForm,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: selectedCellValue,
  });
  useForm({ values: selectedCellValue });
  useForm({
    resetOptions: {
      keepTouched: true,
      keepDirtyValues: true,
      keepErrors: true,
      keepDefaultValues: true,
      keepValues: true,
    },
  });

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const date = new Date(selectedCellValue.date_of_birth);
    const formattedDate = formatDate(date);
    reset({
      ...selectedCellValue,
      first_name: selectedCellValue.first_name,
      date_of_birth: formattedDate,
    });
  }, [reset, selectedCellValue]);

  const handleClose = () => {
    reset();
    handleCloseForm();
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSubmitForm(data as FormValues);
    reset();
  };

  const validateDateOfBirth = (value: string) => {
    const currentDate = new Date();
    const userDateOfBirth = new Date(value);
    const userAge = currentDate.getFullYear() - userDateOfBirth.getFullYear();
    if (userAge < 18) {
      return 'You must be at least 18 years old.';
    }
    return true;
  };

  return (
    <>
      <DevTool control={control} />
      <Dialog
        open={openForm}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{updateField ? `Update user` : `Add user`}</DialogTitle>
        <DialogContent>
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              InputLabelProps={{ shrink: watch('email') !== '' }}
              margin='dense'
              autoFocus
              id='email'
              label='Email Address'
              type='email'
              fullWidth
              required
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid Email',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('first_name') !== '' }}
              margin='dense'
              id='first_name'
              label='First Name'
              fullWidth
              required
              {...register('first_name', { required: true })}
              error={!!errors.first_name}
              helperText={errors.first_name ? errors.first_name.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('last_name') !== '' }}
              margin='dense'
              id='last_name'
              label='Last Name'
              fullWidth
              required
              {...register('last_name', { required: true })}
              error={!!errors.last_name}
              helperText={errors.last_name ? errors.last_name.message : ''}
            />
            <Select
              value={watch('gender')}
              sx={{ margin: '10px auto' }}
              {...register('gender', {
                required: true,
                // { value: true, message: 'Gender is required field' }
              })}
              displayEmpty
              fullWidth
              required
              error={!!errors.gender}
              inputProps={{ id: 'gender' }}
            >
              <MenuItem value='' disabled>
                Select Gender *
              </MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
            {errors.gender && (
              <FormHelperText error sx={{ marginTop: '-10px' }}>
                {errors.gender.message}
              </FormHelperText>
            )}
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              margin='dense'
              id='date_of_birth'
              label='Date of Birth'
              type='date'
              fullWidth
              {...register('date_of_birth', {
                required: true,
                validate: validateDateOfBirth,
              })}
              error={!!errors.date_of_birth}
              helperText={
                errors.date_of_birth ? errors.date_of_birth.message : ''
              }
            />
            <TextField
              InputLabelProps={{ shrink: watch('job') !== '' }}
              margin='dense'
              id='job'
              label='Job'
              fullWidth
              required
              {...register('job', { required: true })}
              error={!!errors.job}
              helperText={errors.job ? errors.job.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('city') !== '' }}
              margin='dense'
              id='city'
              label='City'
              fullWidth
              required
              {...register('city', { required: true })}
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('zipcode') !== '' }}
              margin='dense'
              id='zipcode'
              label='Zip Code'
              fullWidth
              required
              {...register('zipcode', {
                required: true,
                validate: (value) => {
                  const valString = value.toString();
                  return valString.length >= 4 || 'zip code validation failed';
                },
              })}
              error={!!errors.zipcode}
              helperText={errors.zipcode ? errors.zipcode.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('street') !== '' }}
              margin='dense'
              id='street'
              label='Street'
              fullWidth
              required
              {...register('street', { required: true })}
              error={!!errors.street}
              helperText={errors.street ? errors.street.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('state') !== '' }}
              margin='dense'
              id='state'
              label='State'
              fullWidth
              required
              {...register('state', { required: true })}
              error={!!errors.state}
              helperText={errors.state ? errors.state.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('country') !== '' }}
              margin='dense'
              id='country'
              label='Country'
              fullWidth
              required
              {...register('country', { required: true })}
              error={!!errors.country}
              helperText={errors.country ? errors.country.message : ''}
            />
            <TextField
              InputLabelProps={{ shrink: watch('profile_picture') !== '' }}
              margin='dense'
              id='profile_picture'
              label='Profile Picture URL'
              fullWidth
              required
              {...register('profile_picture', { required: true })}
              error={!!errors.profile_picture}
              helperText={
                errors.profile_picture ? errors.profile_picture.message : ''
              }
            />
            <TextField
              InputLabelProps={{ shrink: watch('phone') !== '' }}
              margin='dense'
              id='phone'
              label='Phone'
              fullWidth
              required
              {...register('phone', {
                required: true,
                validate: {
                  // validateNumber: (value) => {
                  //   const stringValue = value.toString();
                  //   return (
                  //     /^\d{10}$/.test(stringValue) ||
                  //     'Invalid phone number format'
                  //   );
                  // },
                  validateLength: (value) => {
                    const stringValue = value.toString();
                    return (
                      stringValue.length >= 10 ||
                      'Phone number must be 10 digits'
                    );
                  },
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ''}
            />

            {/* <TextField
              margin='dense'
              id='latitude'
              label='Latitude'
              fullWidth
              required
              {...register('latitude', { required: true })}
              error={!!errors.latitude}
              helperText={errors.latitude && 'Latitude is required'}
            />
            <TextField
              margin='dense'
              id='longitude'
              label='Longitude'
              fullWidth
              required
              {...register('longitude', { required: true })}
              error={!!errors.longitude}
              helperText={errors.longitude && 'Longitude is required'}
            /> */}

            <DialogActions>
              <Button
                onClick={handleClose}
                color='error'
                variant='contained'
                startIcon={<Close />}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                color='success'
                variant='contained'
                startIcon={<Add />}
              >
                Add
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUpdatePopup;
