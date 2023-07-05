import React, { useCallback, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useEffect } from "react";
import { format } from "date-fns";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "~/slices/message";
import Swal from "sweetalert2";
import { deletedFile } from "~/slices/user";
import FormUpdateFile from "./FormUpdateFile";
import { Link } from "react-router-dom";

const Example = (props) => {
  const dispatch = useDispatch();
  //   const [createModalOpen, setCreateModalOpen] = useState(false);
  const deleleted = useSelector((state) => state.userAbout.data);
  const [tableData, setTableData] = useState([]);
  const [openDialogDl, setOpenDialogDl] = useState(false);
  const [dialogDataDl, setDialogDataDl] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  useEffect(() => {
    if (props.data) {
      setTableData(props.data);
    }
  }, [props.data]);
  const handleOpenDialogDl = (row) => {
    setDialogDataDl(row);
    setOpenDialogDl(true);
  };
  const handleCloseDialogDl = () => {
    setOpenDialogDl(false);
  };
  const handleDeleteFile = async (dialogDataDl) => {
    const dataDelete = {
      user_id: dialogDataDl.userId,
      file_id: dialogDataDl.id,
      drive_id: dialogDataDl.link,
    };

    try {
      const response = await dispatch(deletedFile(dataDelete));

      if (response.payload !== undefined && response.payload !== null) {
        // Remove the deleted file from the table data
        const updatedTableData = tableData.filter(
          (row) => row.id !== dialogDataDl.id
        );
        setTableData(updatedTableData);

        setMessage("File deleted successfully");
      } else {
        setMessage("An error occurred while deleting the file");
      }
      setOpenDialogDl(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message || "An error occurred while deleting the file");
    }
  };
  const handleCancelEditRow = () => {
    setEditingRow(null);
  };

  const formatDate = (dateString) => {
    const date = moment.utc(dateString).toDate();
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };
  const columnsOrder = [
    "fileName",
    "description",
    "View",
    "likeFile",
    "Download",
  ];
  const columns = useMemo(() => [
    {
      accessorKey: "fileName",
      header: "File",
      enableColumnOrdering: false,
      width: "20%",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      Cell: ({ row }) => (
        <Link to={`/fileDetail/${row.original?.id}`} target="_blank">
          {row.original?.fileName}
        </Link>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      enableColumnOrdering: false,
      width: "20%",
      enableEditing: false, //disable editing on this column
      enableSorting: false,
    },
    {
      accessorKey: "likeFile",
      header: "Like",
      size: 50,
      width: "20%",
    },
    {
      accessorKey: "view",
      header: "View",
      size: 50,
      width: "20%",
    },
    {
      accessorKey: "Download",
      header: "Download",
      size: 50,
      width: "20%",
    },
    {
      accessorKey: "uploadDate",
      header: "Date Upload",
      size: 50,
      width: "20%",
      enableSorting: true,
      Cell: ({ row }) => formatDate(row.original.uploadDate),
    },
  ]);

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellStyle: {
              paddingRight: "10px",
              display: "flex",
              justifyContent: "flex-end",
            },
            size: 120,
          },
        }}
        data={tableData}
        columns={columns}
        columnsOrder={columnsOrder}
        enableEditing
        enableColumnOrdering
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="right" title="Edit">
              <IconButton onClick={() => setEditingRow(row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => handleOpenDialogDl(row.original)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        editingRow={editingRow} // Pass editingRow state variable to the component
      />
      {editingRow !== null && (
        <FormUpdateFile row={editingRow} onCancel={handleCancelEditRow} />
      )}
      <Dialog open={openDialogDl} onClose={handleCloseDialogDl}>
        <DialogTitle>
          <Typography variant="h4" color="red">
            Delete file !{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="initial">
            {" "}
            Are you sure you want to Delete file: {dialogDataDl?.fileName} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDl}>Cancel</Button>
          <Button
            onClick={() => handleDeleteFile(dialogDataDl)}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <style>
        {`
         table {
          min-height: 500px;
          max-height: 400px;
          overflow-y: hidden;
        }
        tr > td:{
          max-width: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        tr > td:nth-child(2),
        tr > td:nth-child(3) {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
       
      `}
      </style>
    </>
  );
};

export default Example;
