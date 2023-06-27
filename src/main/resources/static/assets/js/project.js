$(document).ready(() => {
 
  
    // Initialize DataTable
    $("#project-table").DataTable({
      ajax: {
        url: "api/project",
        dataSrc: "",
      },
      columns: [
        {
          data: null,
          render: (data, type, row, meta) => {
            return meta.row + 1;
          },
        },
        { data: "name" },
        { data: "client" },
        { data: "start_date" },
        { data: "end_date" },
        
        {
          data: null,
          render: function (data, type, row, meta) {
            return `
           
            
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#update"
                onclick="getUpdateData(${data.id})"
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-danger mt-3"
                onclick="deleteCountry(${data.id})"
              >
                Delete
              </button>
            `;
          },
        },
      ],
    });
  });
  function logout() {
    Swal.fire({
      title: 'Are you sure want to logout this page?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          method: "POST",
          url: "logout",
          dataType: "JSON",
          beforeSend: addCsrfToken()
        });
        window.location = "http://localhost:9001/login"
      }
    })
  }
 
  
  function deleteCountry(id) {
    if (confirm("Are you sure you want to delete this country?")) {
      $.ajax({
        method: "DELETE",
        url: `/api/country/${id}`,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
          $("#country-table").DataTable().ajax.reload();
        },
      });
    }
  }
  

  
  function getUpdateData(id) {
    $.ajax({
      method: "GET",
      url: "api/country/" + id,
      dataType: "JSON",
      contentType: "application/json",
      success: (res) => {
        $("#update-code").val(res.code);
        $("#update-name").val(res.name);
        $("#update-region").val(res.region.id);
        $("#country-id").val(res.id);
      },
    });
  }
  
  function updateCountry() {
    let codeVal = $("#update-code").val();
    let nameVal = $("#update-name").val();
    let regionId = $("#update-region").val();
    let countryId = $("#country-id").val();
  
    $.ajax({
      method: "PUT",
      url: `/api/country/${countryId}`,
      dataType: "JSON",
      contentType: "application/json",
      data: JSON.stringify({
        id: countryId,
        code: codeVal,
        name: nameVal,
        region: { id: regionId },
      }),
      success: (res) => {
        $("#update").modal("hide");
        $("#country-table").DataTable().ajax.reload();
      },
    });
  }
  
  function createProject() {
    let nameVal = $("#create-name").val();
    let clientVal = $("#create-client").val();
    let startDate = $("#create-start").val();
    let endDate = $("#create-end").val();
  
    $.ajax({
      method: "POST",
      url: "/api/project",
      dataType: "JSON",
      contentType: "application/json",
      data: JSON.stringify({
    
        name: nameVal,
        client: clientVal,
        start: startDate,
        end: endDate,
      }),
      success: (res) => {
        $("#create").modal("hide");
        $("#project-table").DataTable().ajax.reload();
      },
    });
  }