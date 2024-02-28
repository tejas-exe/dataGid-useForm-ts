import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  defaultCellValue,
  fetchUserData,
  openCloseModal,
  selectCellValue,
} from '../Redux/Reducers/UserSlice/UserSlice';
import { Button, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import Popup from './Popup';
import AddUpdatePopup from './AddUpdatePopup';

const DataGridUsers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userReducerState = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    dispatch(
      fetchUserData({
        page: userReducerState.offset,
        pageSize: userReducerState.limit,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              dispatch(selectCellValue(params.row));

              dispatch(
                openCloseModal({
                  component: 'openEditForm',
                  action: true,
                  isEditable: true,
                }),
              );
            }}
          >
            <Edit />
          </IconButton>

          <IconButton
            aria-label='delete'
            color='error'
            onClick={() => {
              dispatch(selectCellValue(params.row));
              dispatch(
                openCloseModal({
                  component: 'openDeletePopup',
                  action: true,
                  isEditable: false,
                }),
              );
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
        updateField={userReducerState.isEditable}
        openForm={userReducerState.openEditForm}
        selectedCellValue={userReducerState.cellValue}
        handleCloseForm={() =>
          dispatch(
            openCloseModal({
              component: 'openEditForm',
              action: false,
              isEditable: false,
            }),
          )
        }
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
          dispatch(selectCellValue(defaultCellValue));
          dispatch(
            openCloseModal({
              component: 'openEditForm',
              action: true,
              isEditable: false,
            }),
          );
        }}
        startIcon={<Add />}
        variant='contained'
        color='success'
      >
        Add user
      </Button>
      <DataGrid
        onPaginationModelChange={({ page, pageSize }) => {
          dispatch(
            fetchUserData({
              page,
              pageSize,
            }),
          );
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
        open={userReducerState.openDeletePopup}
        selectedCellValue={userReducerState.cellValue}
        handleClose={() =>
          dispatch(
            openCloseModal({
              component: 'openDeletePopup',
              action: false,
              isEditable: false,
            }),
          )
        }
        handleDeleteConfirm={(data) => {
          console.log('Delete this =>', data);
        }}
      />
    </Box>
  );
};

export default DataGridUsers;
