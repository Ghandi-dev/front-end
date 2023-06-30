{
  $.ajax({
    method: "GET",
    url: "/api/data/",
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      $("#total-project").text(res.countProjectByEmployee);
      $("#total-overtime").text(res.countOvertimeByEmployee);
    },
  });
}
{
  $.ajax({
    method: "GET",
    url: "/api/history/news",
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      let text = ``;
      res.forEach((element) => {
        let color =
          element.status == "REJECTED" ? "text-danger" : "text-success";
        text += `<div class="timeline-block mb-3">
        <span class="timeline-step">
            <i class="ni ni-check-bold ${color} text-gradient"></i>
        </span>
        <div class="timeline-content">
            <h6 class="text-dark text-sm font-weight-bold mb-0">${element.status}</h6>
            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">${element.createAt}</p>
        </div>
    </div>`;
      });
      $("#progress-timeline").append(text);
    },
  });
}


