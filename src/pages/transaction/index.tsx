import Layout from "@/components/Layout";
import api from "@/components/utils/axios";
import formatRupiah from "@/components/utils/Rupiah";
import { QrCode } from "@mui/icons-material";
import { Button, Card, CardContent, Skeleton, Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

const client = new QueryClient();
const TransactionPage = () => {
  return (
    <QueryClientProvider client={client}>
      <Transaction />
    </QueryClientProvider>
  );
};
function Transaction() {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const fetchHistory = async () => {
    const response = await api.get("/transaction-event");
    setShowLoading(true);
    return response.data;
  };

  const { data, isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ["transaction"],
    queryFn: fetchHistory,
  });

  if (isError) {
    return (
      <Layout>
        <h3>{error?.message || "Something went wrong"}</h3>
      </Layout>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowLoading(false);
      }, 500);
    }
  }, [isSuccess]);

  console.log(data?.data);
  return (
    <Layout>
      <section id="about" className="about-area pb-130 pt-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 mt-5">
              {showLoading ? (
                <Skeleton variant="rectangular" width="100%" height="200px" />
              ) : (
                <Card>
                  <CardContent>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Events Name</th>
                          <th>Total Tickets</th>
                          <th>Total Amount</th>
                          <th>Status Payments</th>
                          <th>QR Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.map((value: any, index: number) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{value.kegiatan_nama}</td>
                              <td>{value.jumlah_tiket} Tickets</td>
                              <td>{formatRupiah(value.jumlah_pembayaran)}</td>
                              <td>
                                {value.status_pembayaran == 1 ? (
                                  <span className="badge bg-success text-white">
                                    Unpaid
                                  </span>
                                ) : (
                                  <span className="badge bg-danger text-white">
                                    Paid
                                  </span>
                                )}
                              </td>
                              <td>
                                <Button
                                  variant="contained"
                                  startIcon={<QrCode />}
                                >
                                  <Typography
                                    color={"white"}
                                    textTransform={"capitalize"}
                                    fontWeight={"bold"}
                                    fontFamily={"monospace"}
                                  >
                                    Show QR
                                  </Typography>
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default TransactionPage;
