const today = () => {
  var d = new Date();

  const day = d.getDay();
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let str = hari[day] + ", " + date + " " + bulan[month] + " " + year;

  return str;
};

module.exports = today();
