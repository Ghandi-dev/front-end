$("#overtime-table").DataTable({
  ajax: {
    url: "/api/overtime/employee",
    dataSrc: "",
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
                    data-bs-target="#detail"
                    onclick="getDetail(${data.id})"
                    >
                    Detail
                    </button>
                    <button
                    type="button"
                    class="btn bg-gradient-warning mb-0 ${isActive}"
                    data-bs-toggle="modal"
                    data-bs-target="#update"
                    onclick="getUpdate(${data.id})"
                    >
                    Update
                    </button>
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

addOvertime = () => {
  let jobTaskVal = $("#jobTask").val();
  let dateVal = $("#date").val();
  let startVal = $("#start").val();
  let endVal = $("#end").val();
  let payVal = $("#pay").val();
  let projectId = $("#project").find(":selected").val();
  $.ajax({
    method: "POST",
    url: "/api/overtime",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      jobTask: jobTaskVal,
      date: dateVal,
      start: startVal + ":00",
      end: endVal + ":00",
      overtimePay: payVal,
      message: "",
      employee: {
        id: userId,
      },
      project: {
        id: projectId,
      },
    }),
    success: (res) => {
      $("#addOvertime").modal("hide");
      $("#overtime-table").DataTable().ajax.reload();
      Swal.fire({
        icon: "success",
        title: "Add Overtime",
        text: "The request has been sent",
      });
    },
  });
};

function getUpdate(id) {
  getProjectById();
  $.ajax({
    method: "GET",
    url: "/api/overtime/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#update-id").val(res.id);
      $("#update-jobTask").val(res.jobTask);
      $("#update-date").val(res.date);
      $("#update-start").val(res.start);
      $("#update-end").val(res.end);
      $("#update-pay").val(res.overtimePay);
      $("#update-status").val(res.status);
      $("#update-project").val(res.project.id);
    },
  });
}

updateOvertime = () => {
  let id = $("#update-id").val();
  let jobTaskVal = $("#update-jobTask").val();
  let dateVal = $("#update-date").val();
  let startVal = $("#update-start").val();
  let endVal = $("#update-end").val();
  let payVal = $("#update-pay").val();
  let statusVal = $("#update-status").val();
  let projectId = $("#update-project").find(":selected").val();
  $.ajax({
    method: "PUT",
    url: "/api/overtime/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      jobTask: jobTaskVal,
      date: dateVal,
      start: startVal,
      end: endVal,
      overtimePay: payVal,
      message: "",
      status: statusVal,
      employee: {
        id: userId,
      },
      project: {
        id: projectId,
      },
    }),
    success: (res) => {
      $("#update").modal("hide");
      $("#overtime-table").DataTable().ajax.reload();
      Swal.fire({
        icon: "success",
        title: "Update Overtime",
        text: "The request has been updated",
      });
    },
  });
};
