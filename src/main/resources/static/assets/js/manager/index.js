{
  $.ajax({
    method: "GET",
    url: "/api/data/",
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      console.log(res);
      $("#total-project").text(res.countProjectByManager);
      $("#total-overtime").text(res.countOvertimeByManager);
    },
  });
}

$("#history-table").DataTable({
  ajax: {
    url: "/api/history/manager",
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
// {
//   $.ajax({
//     method: "GET",
//     url: "/api/history/news",
//     dataType: "JSON",
//     contentType: "application/json",
//     success: (res) => {
//       let text = ``;
//       res.forEach((element) => {
//         let color =
//           element.status == "REJECTED" ? "text-danger" : "text-success";
//         text += `<div class="timeline-block mb-3">
//         <span class="timeline-step">
//             <i class="ni ni-check-bold ${color} text-gradient"></i>
//         </span>
//         <div class="timeline-content">
//             <h6 class="text-dark text-sm font-weight-bold mb-0">${element.status}</h6>
//             <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">${element.createAt}</p>
//         </div>
//     </div>`;
//       });
//       $("#progress-timeline").append(text);
//     },
//   });
// }
