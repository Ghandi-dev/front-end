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
        { data: "budget" },
        { data: "client" },
        { data: "start_date" },
        { data: "end_date" },
        { data: "description" },
        { data: "employee.id" },
        
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
 
  
  function createProject() {
    let nameVal = $("#create-name").val();
    let budget = $("#create-budget").val();
    let clientVal = $("#create-client").val();
    let startDate = $("#create-start").val();
    let endDate = $("#create-end").val();
    let description = $("#create-description").val();
    let employee = $("#create-employee").val();

  
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
        budget: budget,
        decrri: endDate,
      }),
      success: (res) => {
        $("#create").modal("hide");
        $("#project-table").DataTable().ajax.reload();
      },
    });
  }