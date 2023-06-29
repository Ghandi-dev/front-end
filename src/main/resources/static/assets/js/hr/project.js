$("#project-table").DataTable({
  ajax: {
    url: "/api/project/",
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
                      data-bs-target="#detailProject"
                      onclick="getDetail(${data.id})"
                      >
                      Detail
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

getDetail = (id) => {
  emptyDetail();
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
      <h4 class="card-title text-capitalize">${res.manager.name}</h4>
      <h6 class="category text-success text-uppercase text-gradient">${res.manager.job.name}
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
                                    <h4 class="card-title text-capitalize">${employee.name}</h4>
                                    <h6 class="category text-success text-uppercase text-gradient">${employee.job.name}
                                    </h6>
                                </div>
                            </div>
                        </div>`;
      });
      $("#employee").append(dataEmployee);
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
