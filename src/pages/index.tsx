import EventList from "@/components/eventlist/ListEvent";
import Layout from "@/components/Layout";
import Slider from "react-slick";
import { EventType } from "@/types/EventType";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
export default function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <Layout>
      <section id="about" className="about-area pb-130 pt-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center mb-5">
              <CarouselComponents />
            </div>
            <div className="col-lg-8">
              <div className="section-title text-center pb-20">
                <h2 className="title">Popular Event</h2>
                <p className="text">
                  Find your favorite events, and let's have fun
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center events-list">
            <QueryClientProvider client={queryClient}>
              <FetchEventList />
            </QueryClientProvider>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const FetchEventList = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const fetchEvent = async (): Promise<any> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/fetch-events`);
    return response.json();
  };

  const {
    data,
    isError,
    error,
    isLoading,
  }: { data: any; isError: any; isLoading: any; error: any } = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

  if (isError) {
    return (
      <div>
        <Typography>{error.message ?? "Terjadi kesalahan"}</Typography>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width={300} height={300} />
      ) : (
        <>
          {data?.data.map((event: EventType) => (
            <EventList key={event.id} value={event} />
          ))}
        </>
      )}
    </>
  );
};

const CarouselComponents: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider autoplay={true} autoplaySpeed={3000} accessibility={false} arrows={false} centerMode={true} slidesToShow={2} centerPadding="60px">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "100%", height: "50%" }}
              className="img-thumbnail"
              src="https://api.yesplis.com/images/banner/8e78db2964bc29686b1c0ac1dfc4e985678d6220.png.webp"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "100%", height: "50%" }}
              className="img-thumbnail"
              src="https://api.yesplis.com/images/banner/1313f5deb522848001ffd55058092671d8cae4c8.png.webp"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "100%", height: "50%" }}
              className="img-thumbnail"
              src="https://api.yesplis.com/images/banner/50eb493c779b4b8e6b268eab1a6484b5a29fcb1f.png.webp"
            />
          </Grid>
        </Grid>
      </Slider>
    </Box>
  );
};
