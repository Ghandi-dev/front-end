updateUser = () => {
  let usernameVal = $("#username").val();
  let oldpasswordVal = $("#old-password").val();
  let newpasswordVal = $("#new-password").val();
  $.ajax({
    method: "PUT",
    url: "/api/user/",
    beforeSend: addCsrfToken(),
    data: jQuery.param({
      username: usernameVal,
      oldPassword: oldpasswordVal,
      newPassword: newpasswordVal,
    }),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: (res) => {
      Swal.fire({
        icon: "success",
        title: "Username and Password updated",
        text: "Data saved success",
      });
      window.location = "http://localhost:9001/login";
    },
    error: function () {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your old password is wrong!",
      });
    },
  });
};

$.ajax({
  method: "GET",
  url: "/api/employee/id",
  dataType: "JSON",
  contentType: "application/json",
  success: (res) => {
    $("#name").val(res.name);
    $("#phone").val(res.phone);
    $("#email").val(res.email);
  },
});
