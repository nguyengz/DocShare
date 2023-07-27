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

  const columnsOrder = [
    "packages",
    "price",
    "numOfAccess",
    "storageSize",
    "createdAt",
  ];
  const columns = useMemo(() => [
    {
      accessorKey: "packages",
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
      Cell: ({ row }) => row.original?.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 50,
      Cell: ({ row }) => row.original?.price,
      muiTableBodyCellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      accessorKey: "numOfAccess",
      header: "Download",
      size: 50,
      Cell: ({ row }) =>
        row.original?.dowloads === 0
          ? "Unlimit"
          : row.original?.numOfAccess + "/" + row.original?.dowloads,
    },
    {
      accessorKey: "storageSize",
      header: "StorageSize",
      size: 50,
      Cell: ({ row }) =>
        row.original?.storageSize > 1024 && row.original?.storageSize === 1024
          ? row.original?.storageSize / 1024 + " GB"
          : row.original?.storageSize + " MB",
    },
    {
      accessorKey: "createdAt",
      header: "End Date",
      size: 50,
      Cell: ({ row }) => formatDate(row.original?.createdAt),
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
