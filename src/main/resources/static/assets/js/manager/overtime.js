$("#overtime-table").DataTable({
  ajax: {
    url: "/api/overtime/manager",
    dataSrc: "",
  },
  success: (res) => {
    console.log(res);
  },

  columns: [
    {
      data: "null",
      render: (data, type, row, meta) => {
        return meta.row + 1;
      },
    },
    { data: "jobTask" },
    { data: "date" },
    { data: "start" },
    { data: "end" },
    {
      data: null,
      render: function (data) {
        return rupiah(data.overtimePay);
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
    {
      data: null,
      render: function (data, type, row, meta) {
        let isActive = data.status == "PROCESS" ? "" : "disabled";
        return `
                <td class="d-flex justify-content-center align-items-center text-center">
                    <button
                    type="button"
                    class="btn bg-gradient-primary mb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#detail-overtime"
                    onclick="getDetail(${data.id})"
                    >
                    <i class="fa-solid fa-magnifying-glass"></i>
                </td>
            `;
      },
    },
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

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

getProjectById = () => {
  $.ajax({
    method: "GET",
    url: "/api/project/employee/",
    dataType: "JSON",
    success: (res) => {
      const selectElement = $("#project");
      const selectElementUpdate = $("#update-project");
      const text = "<option selected disabled>Select Project</option>";
      selectElement.empty();
      selectElementUpdate.empty();
      selectElement.append(text);
      selectElementUpdate.append(text);
      res.forEach((project) => {
        const option = `<option value="${project.id}">${project.name}</option>`;
        selectElement.append(option);
        selectElementUpdate.append(option);
      });
    },
  });
};

getDetail = (id) => {
  $.ajax({
    method: "GET",
    url: "/api/overtime/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#detail-status").removeClass();
      let color = bgStatus(res.status);
      $("#detail-id").val(res.id);
      $("#detail-jobTask").val(res.jobTask);
      $("#detail-date").val(res.date);
      $("#detail-start").val(res.start);
      $("#detail-end").val(res.end);
      $("#detail-pay").val(rupiah(res.overtimePay));
      $("#detail-status").val(res.status);
      $("#detail-status").addClass(
        color +
          " text-light fw-bold form-control form-control-alternative text-center"
      );
      $("#detail-project").val(res.project.name);
    },
  });
};

approveOT = () => {
  let id = $("#detail-id").val();
  $.ajax({
    method: "PUT",
    url: "/api/overtime/approve/" + id,
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#detail-overtime").modal("hide");
      $("#overtime-table").DataTable().ajax.reload();
      Swal.fire({
        icon: "success",
        title: "Approve Overtime",
        text: "SUCCESS",
      });
    },
  });
};
rejectOT = () => {
  let id = $("#detail-id").val();
  $.ajax({
    method: "PUT",
    url: "/api/overtime/reject/" + id,
    beforeSend: addCsrfToken(),
    success: (res) => {
      console.log(res);
      $("#detail-overtime").modal("hide");
      $("#overtime-table").DataTable().ajax.reload();
      Swal.fire({
        icon: "success",
        title: "Reject Overtime",
        text: "SUCCESS",
      });
    },
  });
};
