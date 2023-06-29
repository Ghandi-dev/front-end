$("#employee-table").DataTable({
  ajax: {
    url: "/api/employee",
    dataSrc: "",
  },
  columns: [
    {
      data: "null",
      render: (data, type, row, meta) => {
        return meta.row + 1;
      },
    },
    { data: "name" },
    { data: "email" },
    { data: "phone" },
    {
      data: null,
      render: function (data) {
        return `${data.manager === null ? "-" : data.manager.name}`;
      },
    },
    { data: "job.name" },
    {
      data: null,
      render: function (data, type, row, meta) {
        return `
                <td class="d-flex justify-content-center align-items-center text-center">
                    <button
                    type="button"
                    class="btn bg-gradient-primary mb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#detail-employee"
                    onclick="getDetail(${data.id})"
                    >
                    <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button
                    type="button"
                    class="btn bg-gradient-warning mb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#update-employee"
                    onclick="getUpdate(${data.id})"
                    >
                    Update
                    </button>
                    <button
                    type="button"
                    class="btn bg-gradient-danger mb-0"
                    onclick="deleteEmployee(${data.id})"
                    >
                    <i class="fa-solid fa-trash"></i>
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

getManager = () => {
  getJob();
  $.ajax({
    method: "GET",
    url: "/api/employee/all-manager",
    dataType: "JSON",
    success: (res) => {
      const selectElement = $("#manager");
      const selectElementUpdate = $("#update-manager");
      const text = "<option selected disabled>Select Manager</option>";
      selectElement.empty();
      selectElementUpdate.empty();
      selectElement.append(text);
      selectElementUpdate.append(text);
      res.forEach((employee) => {
        const option = `<option value="${employee.id}">${employee.name}</option>`;
        selectElement.append(option);
        selectElementUpdate.append(option);
      });
    },
  });
};
getJob = () => {
  $.ajax({
    method: "GET",
    url: "/api/job",
    dataType: "JSON",
    success: (res) => {
      const selectElement = $("#job");
      const selectElementUpdate = $("#update-job");
      const text = "<option selected disabled>Select Job</option>";
      selectElement.empty();
      selectElementUpdate.empty();
      selectElement.append(text);
      selectElementUpdate.append(text);
      res.forEach((job) => {
        const option = `<option value="${job.id}">${job.name}</option>`;
        selectElement.append(option);
        selectElementUpdate.append(option);
      });
    },
  });
};

getDetail = (id) => {
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      console.log(res);
      $("#user-photo").empty();
      $("#user-photo").append(`<img class="w-100 rounded-3 shadow-lg"
      src="http://localhost:9001/api/user/photo/${res.photo}">`);
      $("#detail-name").val(res.name);
      $("#detail-email").val(res.email);
      $("#detail-phone").val(res.phone);
      $("#detail-manager").val(res.manager.name);
      $("#detail-job").val(res.job.name);
    },
  });
};

function getUpdate(id) {
  getManager();
  $.ajax({
    method: "GET",
    url: "/api/employee/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#user-photo").empty();
      $("#user-photo").append(`<img class="w-100 rounded-3 shadow-lg"
      src="http://localhost:9001/api/user/photo/${res.photo}">`);
      $("#update-id").val(res.id);
      $("#update-name").val(res.name);
      $("#update-email").val(res.email);
      $("#update-phone").val(res.phone);
      $("#update-manager").val(res.manager.id);
      $("#update-job").val(res.job.id);
      $("#update-file").val(res.photo);
    },
  });
}

updateEmployee = () => {
  let id = $("#update-id").val();
  let nameVal = $("#update-name").val();
  let emailVal = $("#update-email").val();
  let phoneVal = $("#update-phone").val();
  let managerVal = $("#update-manager").find(":selected").val();
  let jobVal = $("#update-job").find(":selected").val();
  let photo = $("#update-file").val();
  $.ajax({
    method: "PUT",
    url: "/api/employee/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      photo: photo,
      manager: {
        id: managerVal,
      },
      job: {
        id: jobVal,
      },
    }),
    success: (res) => {
      $("#update-employee").modal("hide");
      $("#employee-table").DataTable().ajax.reload();
      Swal.fire({
        icon: "success",
        title: "Update Overtime",
        text: "The request has been updated",
      });
    },
  });
};

deleteEmployee = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "DELETE",
        url: "/api/employee/" + id,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        contentType: "application/json",
        success: (res) => {
          $("#employee-table").DataTable().ajax.reload();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${res.name} has been deleted`,
          });
        },
      });
    }
  });
};
