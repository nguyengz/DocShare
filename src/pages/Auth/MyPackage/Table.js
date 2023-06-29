import React, { useCallback, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useEffect } from "react";
import { format } from "date-fns";
import moment from "moment/moment";

const Table = (props) => {
  //   const [createModalOpen, setCreateModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (props.data) {
      setTableData(props.data);
    }
  }, [props.data]);
  const packageName = useCallback((rowData) => {
    return rowData.name || "";
  }, []);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { year: "numeric", month: "short", day: "numeric" };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   return formattedDate;
  // };

  // const formattedDate = formatDate(userAbout?.files.uploadDate);

  const formatDate = (dateString) => {
    const date = moment.utc(dateString).toDate();
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  const columnsOrder = ["name", "price", "createdAt", "numOfAccess"];
  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "Package",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 150,
      muiTableBodyCellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    //   Cell: ({ cell }) => packageName(cell.row),
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 50,
      muiTableBodyCellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      accessorKey: "createdAt",
      header: "CreatedAt",
      size: 50,
      Cell: ({ cell }) => formatDate(cell.value),
    },
    {
      accessorKey: "numOfAccess",
      header: "NumOfAccess",
      size: 50,
    },
    {
      accessorKey: "uploadDate",
      header: "Date Upload",
      size: 50,
      enableSorting: true,
      Cell: ({ cell }) => formatDate(cell.value),
    },
  ]);
  const centeredColumns = columns.map((column) => column.accessorKey); // danh sách tất cả các cột

  const columnDefs = columns.map((column) => ({
    ...column,
    muiTableBodyCellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));
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
        columns={columnDefs}
        columnsOrder={columnsOrder}
        enableColumnOrdering
      />
    </>
  );
};

export default Table;
