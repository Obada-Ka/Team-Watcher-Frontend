const hasPermission = (el: any, binding: any) => {
  const Userpermissions = localStorage.getItem("permissions");
  if (
    Userpermissions &&
    !JSON.parse(Userpermissions).includes(
      binding.value.replace(/'/g, "").replace(/"/g, "")
    )
  ) {
    el.style.display = "none";
  }
};

export default hasPermission;
