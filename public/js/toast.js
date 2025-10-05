const toastBackgound = {
  success: {
    color: "#fff!important;",
    background: "RGBA(var(--bs-success-rgb),var(--bs-bg-opacity,1))!important",
  },

  danger: {
    color: "#fff!important;",
    background: "RGBA(var(--bs-danger-rgb),var(--bs-bg-opacity,1))!important",
  },
};

let showToast = (text, bgColor = toastBackgound.success) => {
  Toastify({
    text: text,
    duration: 3000,
    style: bgColor,
  }).showToast();
};
