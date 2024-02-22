import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../Store/Index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserData } from '../Store/Slices/UserSlice';
import { FormValues } from '../Types/users-types';
import { Button, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import Popup from './Popup';
import AddUpdatePopup from './AddUpdatePopup';
// import AddUpdatePopup from './AddUpdatePopup';
// GridValueGetterParams;

const DataGridUsers: React.FC = () => {
  const initialStateFormValue: FormValues = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    job: '',
    city: '',
    zipcode: '',
    street: '',
    state: '',
    country: '',
    profile_picture: '',
    phone: '',
    latitude: 0,
    longitude: 0,
  };
  const dispatch: AppDispatch = useDispatch();
  const userReducerState = useSelector((state: RootState) => state.userReducer);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [updateField, setUpdateField] = useState<boolean>(false);
  const [selectedCellValue, setSelectedCellValue] = useState<FormValues>(
    initialStateFormValue,
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        fetchUserData({
          page: page,
          pageSize: pageSize,
        }),
      );
    };
    fetchData();
    console.log(page, pageSize);
  }, [dispatch, page, pageSize]);

  const columns: GridColDef[] = [
    {
      sortable: false,
      filterable: false,
      field: 'profile_picture',
      headerName: 'Profile Pic',
      width: 90,
      hideable: false,
      renderCell: (params) => (
        <img
          src={params.value as string}
          alt='Profile'
          style={{
            width: 40,
            height: 40,
            borderRadius: '100%',
          }}
        />
      ),
    },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 90,
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 90,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      type: 'string',
      width: 80,
    },
    {
      field: 'city',
      headerName: 'City',
      type: 'string',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 290,
    },
    {
      field: 'job',
      headerName: 'Job',
      type: 'string',
      width: 210,
    },
    {
      field: 'id',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 170,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          display='flex'
          width={'100%'}
          justifyContent='space-around'
          height='100%'
        >
          <IconButton
            aria-label='edit'
            onClick={() => {
              setSelectedCellValue(params.row);
              setUpdateField(true);
              setOpenForm(true);
            }}
          >
            <Edit />
          </IconButton>

          <IconButton
            aria-label='delete'
            color='error'
            onClick={() => {
              setSelectedCellValue(params.row);
              setOpen(true);
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 371, width: { lg: '1160px', xl: '1200px' } }}>
      <AddUpdatePopup
        updateField={updateField}
        openForm={openForm}
        selectedCellValue={selectedCellValue}
        handleCloseForm={() => setOpenForm(false)}
        handleSubmitForm={(data) => {
          if (data.id) {
            console.log('update this data=>', data);
          } else {
            console.log('Add this data=>', data);
          }
        }}
      />
      <Button
        sx={{ marginBottom: '10px' }}
        onClick={() => {
          setSelectedCellValue(initialStateFormValue);
          setUpdateField(false);
          setOpenForm(true);
        }}
        startIcon={<Add />}
        variant='contained'
        color='success'
      >
        Add user
      </Button>
      <DataGrid
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        disableRowSelectionOnClick={true}
        rows={userReducerState.users}
        columns={columns}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rowCount={userReducerState.total_users}
        paginationMode='server'
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
      <Popup
        open={open}
        selectedCellValue={selectedCellValue}
        handleClose={() => setOpen(false)}
        handleDeleteConfirm={(data) => {
          console.log('Delete this =>', data);
        }}
      />
    </Box>
  );
};

export default DataGridUsers;
