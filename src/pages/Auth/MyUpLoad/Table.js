import React, { useCallback, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useEffect } from "react";
import { format } from "date-fns";
import moment from "moment/moment";

const Example = (props) => {

  //   const [createModalOpen, setCreateModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    if (props.data) {
      setTableData(props.data);
    }
  }, [props.data]);
  const handleDeleteFile = (fileId) => {
    const updatedTableData = tableData.filter((file) => file.id !== fileId);
    setTableData(updatedTableData);
  };
  const handleConfirmDelete = (file) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the file ${file.fileName}?`
    );
    if (confirmed) {
      handleDeleteFile(file.id);
    }
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { year: "numeric", month: "short", day: "numeric" };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   return formattedDate;
  // };

  // const formattedDate = formatDate(userAbout?.files.uploadDate);

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const formatDate = (dateString) => {
    const date = moment.utc(dateString).toDate();
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  };
  const columnsOrder = ["fileName", "View", "likeFile", "Download"];
  const columns = useMemo(
    () => [
      {
        accessorKey: "fileName",
        header: "File",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 250,
      },
      {
        accessorKey: "likeFile",
        header: "Like",
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "view",
        header: "View",
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "Download",
        header: "Download",
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "uploadDate",
        header: "Date Upload",
        size: 50,
        enableSorting: true,
        Cell: ({ cell }) => formatDate(cell.value),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

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
        renderRowActions={({ table, row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="right" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => handleConfirmDelete(row.original)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default Example;
