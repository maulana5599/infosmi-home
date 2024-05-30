import Layout from "@/components/Layout";
import { EventTicketType, EventType } from "@/types/EventType";
import { Skeleton } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import TicketCard from "@/components/eventlist/TikcetCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import formatRupiah from "@/components/utils/Rupiah";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addProduct } from "@/redux/reducers";
interface DetailEventProps {
  slug: string | string[];
}

export default function DetailEventPage() {
  const router = useRouter();
  const query = new QueryClient();
  if (router.isReady) {
    const slugitem = router.query.slug ?? "";
    if (slugitem === "") {
      return (
        <Layout>
          <h3>Events not found</h3>
        </Layout>
      );
    }

    return (
      <Layout>
        <QueryClientProvider client={query}>
          <DetailEvent slug={slugitem} />
        </QueryClientProvider>
      </Layout>
    );
  }
}

const DetailEvent: React.FC<DetailEventProps> = ({
  slug,
}: DetailEventProps) => {
  const [eventData, setEventData] = useState<any>({} as EventType);
  const [eventId, setEventId] = useState<any>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<EventTicketType[]>([]);
  const [checkout, setCheckout] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchDetailEvent = async (): Promise<AxiosResponse> => {
    const response = await axios.get(
      `http://localhost:8084/api/detail-event?slug=${slug}`
    );
    return response;
  };

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["detail-events"],
    queryFn: fetchDetailEvent,
  });

  if (isError) {
    return (
      <Layout>
        <h3>{error?.message || "Something went wrong"}</h3>
      </Layout>
    );
  }

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setEventData(data.data.kegiatan);
      setTicket(data?.data.tiket);
      setEventId(data?.data.kegiatan_id)
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    }
  }, [isSuccess]);

  const addTicket = (e: React.MouseEvent<HTMLButtonElement>, tiket: any) => {
    const findCheckout = checkout.findIndex(
      (item) => item.tiket_id === tiket.tiket_id
    );
    if (findCheckout !== -1) {
      const findIndex = ticket.findIndex(
        (item) => item.tiket_id === tiket.tiket_id
      );

      if (ticket[findIndex] !== undefined) {
        if (ticket[findIndex].counter_tiket >= 4) {
          toast.warn("Ticket tidak boleh lebih dari 4 !");
          return;
        }

        const updateTicket: any = {
          ...ticket[findIndex],
          counter_tiket: ticket[findIndex].counter_tiket + 1,
        };

        ticket.splice(findIndex, 1, updateTicket);
        checkout.splice(findCheckout, 1);

        const copyObject = { ...updateTicket };
        const updateCheckout = [...checkout, copyObject];
        setCheckout(updateCheckout);
      }
    } else {
      tiket.counter_tiket = 1;
      const newCheckout = [...checkout, tiket];
      setCheckout(newCheckout);
    }
  };

  const removeTicket = (e: React.MouseEvent<HTMLButtonElement>, tiket: any) => {
    const findCheckout = checkout.findIndex(
      (item) => item.tiket_id === tiket.tiket_id
    );

    if (findCheckout !== -1) {
      const existingTicket = ticket.find(
        (item) => item.tiket_id === tiket.tiket_id
      );

      if (existingTicket) {
        if (existingTicket.counter_tiket <= 0) {
          return;
        }
        existingTicket.counter_tiket =
          existingTicket.counter_tiket === undefined
            ? 0
            : existingTicket.counter_tiket - 1;

        /**
         * Kondisi kalo misalnya kosong
         */
        let updateCheckout = [];
        if (existingTicket.counter_tiket === 0) {
          updateCheckout = [...checkout];
        } else {
          updateCheckout = [...checkout, existingTicket];
        }

        updateCheckout.splice(findCheckout, 1);
        setCheckout(updateCheckout);
      }
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = checkout.reduce(
        (acc, cur) => acc + cur.biaya_tiket * cur.counter_tiket,
        0
      );
      setTotalPrice(totalPrice);
    };

    if (checkout.length > 0) {
      calculateTotalPrice();
    } else {
      setTotalPrice(0);
    }
  }, [checkout]);
  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedCheckout: any = [...checkout];
    if (updatedCheckout.length > 0) {
      const value: any = {
        checkout_ticket : updatedCheckout,
        event: eventData,
        event_id: eventId
      }

      dispatch(addProduct(value));
      router.push(`/checkout/${eventData?.kegiatan_nama}`);
    }
  };

  return (
    <Layout>
      <section id="about" className="about-area pb-130 pt-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {showLoading ? (
                <div style={{ height: "315px" }}>
                  <Skeleton variant="rectangular" sx={{ height: "100%" }} />
                </div>
              ) : (
                <div
                  className="about-image mt-50 wow fadeInLeft"
                  data-wow-duration="1s"
                >
                  <img
                    className="img-thumbnail"
                    src={`http://localhost:8084/storage/images/${eventData?.foto}`}
                    alt="About"
                  />
                </div>
              )}
            </div>
            <div className="col-lg-6">
              {showLoading ? (
                <>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton
                    variant="rectangular"
                    sx={{ marginTop: 2, padding: 0 }}
                    height={100}
                  />
                </>
              ) : (
                <div
                  className="about-content mt-45 wow fadeInRight"
                  data-wow-duration="1s"
                >
                  <div className="section-title">
                    <h2 className="title">{eventData?.kegiatan_nama}</h2>
                  </div>
                  <p className="date">
                    <span>
                      25<sup>th</sup>
                    </span>
                    December’ 19
                  </p>
                  <p className="mt-4">
                    <i className="lni lni-map-marker" />
                    <span>Stadion Mandala Krida | Mandala Krida</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-3 ">
              <h3>Description</h3>
              <hr />
              <div>
                <p className="text mt- text-justify">{eventData.deskripsi}</p>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <h3>Category Ticket</h3>
              <hr />
              <div className="card">
                <div className="card-header">All Ticket</div>
                <div className="card-body">
                  {showLoading ? (
                    <>
                      <Skeleton variant="rectangular" height={100} />
                    </>
                  ) : (
                    <>
                      {ticket.map((value) => (
                        <TicketCard
                          value={value}
                          removeTicket={(e: any, tiket: any) =>
                            removeTicket(e, tiket)
                          }
                          addTicket={(e: any, tiket: any) =>
                            addTicket(e, tiket)
                          }
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <h5>Subtotal</h5>
                  <h5 className="total-checkout">{formatRupiah(totalPrice)}</h5>
                </div>
                <div>
                  <button
                    type="button"
                    id="checkout-page"
                    className="btn btn-danger"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
