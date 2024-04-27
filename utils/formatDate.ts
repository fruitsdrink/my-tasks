var moment = require("moment");

const formatDate = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export { formatDate };
