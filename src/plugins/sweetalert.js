import swal from 'sweetalert'

export default {
  danger: function (text) {
    swal({
      title: 'Thất bại',
      text: text,
      dangerMode: true,
      timer: 2000,
    })
  },
  success: function (text) {
    swal({
      title: 'Thành công',
      text: text,
      icon: 'success',
      timer: 2000,
    })
  },
  confirm: async function (title, text) {
    return await swal({
      dangerMode: true,
      title: title,
      text: text,
      buttons: ['Hủy', 'Đồng ý'],
    })
  },
}
