$("#project-table").DataTable({
  ajax: {
    url: "/api/project/manager/",
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
    { data: "client" },
    {
      data: null,
      render: function (data) {
        let header = `<div class="avatar-group mt-2">`;
        let body = ``;
        data.employees.forEach((employee) => {
          body += `<a href="javascript:;" class="avatar avatar-xs rounded-circle"
          data-bs-toggle="tooltip" data-bs-placement="bottom"
          title="${employee.name}">
          <img src="http://localhost:9001/api/user/photo/${employee.photo}"
              alt="${employee.name}">
      </a>`;
        });
        return header + body + `</div>`;
      },
    },
    {
      data: null,
      render: function (data) {
        return rupiah(data.budget);
      },
    },
    {
      data: null,
      render: function (data, type, row, meta) {
        return `
                  <td class="d-flex justify-content-center align-items-center text-center">
                      <button
                      type="button"
                      class="btn bg-gradient-primary mb-0"
                      data-bs-toggle="modal"
                      data-bs-target="#detail-project"
                      onclick="getDetail(${data.id})"
                      >
                      <i class="fa-solid fa-magnifying-glass"></i>
                      </button>
                      <button
                      type="button"
                      class="btn bg-gradient-warning mb-0"
                      data-bs-toggle="modal"
                      data-bs-target="#update-project"
                      onclick="getUpdate(${data.id})"
                      >
                      Update
                      </button>
                      <button
                      type="button"
                      class="btn bg-gradient-danger mb-0"
                      onclick="deleteProject(${data.id})"
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

deleteProject = (id) => {
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
        url: "/api/project/" + id,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        contentType: "application/json",
        success: (res) => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${res.name} has been deleted`,
          });
          $("#project-table").DataTable().ajax.reload();
        },
      });
    }
  });
};

getDetail = (id) => {
  $.ajax({
    method: "GET",
    url: "/api/project/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#detail-name").val(res.name);
      $("#detail-client").val(res.client);
      $("#detail-desc").val(res.description);
      $("#detail-start").val(res.date_start);
      $("#detail-end").val(res.date_end);
      $("#detail-budget").val(rupiah(res.budget));
      $("#manager").append(`<a href="javascript:;">
      <img class="avatar avatar-xl shadow"
          src="http://localhost:9001/api/user/photo/${res.manager.photo}">
  </a>

  <div class="card-body">
      <h4 class="card-title">${res.manager.name}</h4>
      <h6 class="category text-success text-gradient">${res.manager.job.name}
      </h6>
  </div>`);
      let dataEmployee = ``;
      res.employees.forEach((employee) => {
        dataEmployee += `<div class="col-md-4">
                            <div class="card card-plain text-center" id="employee">
                                <a href="javascript:;">
                                    <img class="avatar avatar-xl shadow"
                                        src="http://localhost:9001/api/user/photo/${employee.photo}">
                                </a>

                                <div class="card-body">
                                    <h4 class="card-title">${employee.name}</h4>
                                    <h6 class="category text-success text-gradient">${employee.job.name}
                                    </h6>
                                </div>
                            </div>
                        </div>`;
      });
      $("#employee").append(dataEmployee);
    },
  });
};

getUpdate = (id) => {
  getEmployee();
  $.ajax({
    method: "GET",
    url: "/api/project/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#update-id").val(res.id);
      $("#update-name").val(res.name);
      $("#update-client").val(res.client);
      $("#update-description").val(res.description);
      $("#update-start").val(res.date_start);
      $("#update-end").val(res.date_end);
      $("#update-budget").val(res.budget);
    },
  });
};

getEmployee = () => {
  $.ajax({
    method: "GET",
    url: "/api/employee/manager",
    dataType: "JSON",
    success: (res) => {
      const selectElement = $("#add-employee");
      const selectElementUpdate = $("#update-employee");
      const text = "";
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

addProject = () => {
  let nameVal = $("#add-name").val();
  let clientVal = $("#add-client").val();
  let descriptionVal = $("#add-description").val();
  let startVal = $("#add-start").val();
  let endVal = $("#add-end").val();
  let budgetVal = $("#add-budget").val();
  let employeeVal = $("#add-employee").val();
  $.ajax({
    method: "POST",
    url: "/api/project",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      name: nameVal,
      client: clientVal,
      description: descriptionVal,
      date_start: startVal,
      date_end: endVal,
      budget: budgetVal,
      managerId: userId,
      employeesId: employeeVal,
    }),
    success: (res) => {
      $("#add-project").modal("hide");
      $("#project-table").DataTable().ajax.reload();
      // $("#add-name").val("");
      Swal.fire({
        icon: "success",
        title: "Add Project",
        text: "Data saved success",
      });
    },
  });
};

updateProject = () => {
  let id = $("#update-id").val();
  let nameVal = $("#update-name").val();
  let clientVal = $("#update-client").val();
  let descriptionVal = $("#update-description").val();
  let startVal = $("#update-start").val();
  let endVal = $("#update-end").val();
  let budgetVal = $("#update-budget").val();
  let employeeVal = $("#update-employee").val();
  $.ajax({
    method: "PUT",
    url: "/api/project/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      name: nameVal,
      client: clientVal,
      description: descriptionVal,
      date_start: startVal,
      date_end: endVal,
      budget: budgetVal,
      managerId: userId,
      employeesId: employeeVal,
    }),
    success: (res) => {
      // $("#update-project").modal("hide");
      $("#project-table").DataTable().ajax.reload();
      // $("#add-name").val("");
      Swal.fire({
        icon: "success",
        title: "Add Project",
        text: "Data saved success",
      });
    },
  });
};

emptyDetail = () => {
  $("#manager").empty();
  $("#employee").empty();
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
