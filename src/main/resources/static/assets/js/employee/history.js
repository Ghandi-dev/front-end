$("#history-table").DataTable({
  ajax: {
    url: "/api/history/employee",
    dataSrc: "",
  },
  columns: [
    {
      data: "null",
      render: (data, type, row, meta) => {
        return meta.row + 1;
      },
    },
    {
      data: null,
      render: function (data, type, roe, mete) {
        let color = bgStatus(data.status);
        return `<td class="text-center">
                <span class="badge badge-sm ${color}">${data.status}</span>
              </td>`;
      },
    },
    { data: "createAt" },
  ],
  columnDefs: [
    {
      targets: "_all",
      className: "dt-body-center",
    },
  ],
});

function bgStatus(status) {
  const colorStatus = {
    PROCESS: "bg-gradient-secondary",
    APPROVED_MANAGER: "bg-gradient-warning",
    APPROVED_HR: "bg-gradient-success",
    REJECTED: "bg-gradient-danger",
  };

  return colorStatus[status];
}
