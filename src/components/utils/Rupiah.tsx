const formatRupiah = (value: number) => {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
  return formattedValue.replace("IDR", "Rp");
};

export default formatRupiah;
