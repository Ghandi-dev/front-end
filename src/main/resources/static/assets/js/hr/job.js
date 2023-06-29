$("#job-table").DataTable({
  ajax: {
    url: "/api/job",
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
    {
      data: null,
      render: function (data, type, row, meta) {
        return `
                  <td class="d-flex justify-content-center align-items-center text-center">
                      <button
                      type="button"
                      class="btn bg-gradient-warning mb-0"
                      data-bs-toggle="modal"
                      data-bs-target="#update-job"
                      onclick="getUpdate(${data.id})"
                      >
                      Update
                      </button>
                      <button
                      type="button"
                      class="btn bg-gradient-danger mb-0"
                      onclick="deleteJob(${data.id})"
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

getUpdate = (id) => {
  $.ajax({
    method: "GET",
    url: "/api/job/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#update-id").val(res.id);
      $("#update-name").val(res.name);
    },
  });
};

addJob = () => {
  let nameVal = $("#add-name").val();

  $.ajax({
    method: "POST",
    url: "/api/job",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      name: nameVal,
    }),
    success: (res) => {
      $("#add-job").modal("hide");
      $("#job-table").DataTable().ajax.reload();
      $("#add-name").val("");
      Swal.fire({
        icon: "success",
        title: "Add Job",
        text: "Data saved success",
      });
    },
  });
};
updateJob = () => {
  let id = $("#update-id").val();
  let nameVal = $("#update-name").val();

  $.ajax({
    method: "PUT",
    url: "/api/job/" + id,
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      name: nameVal,
    }),
    success: (res) => {
      $("#update-job").modal("hide");
      $("#job-table").DataTable().ajax.reload();
      $("#update-name").val("");
      Swal.fire({
        icon: "success",
        title: "Update Job",
        text: "Data saved success",
      });
    },
  });
};

deleteJob = (id) => {
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
        url: "/api/job/" + id,
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        contentType: "application/json",
        success: (res) => {
          $("#job-table").DataTable().ajax.reload();
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
