import EventList from "@/components/eventlist/ListEvent";
import Layout from "@/components/Layout";
import Slider from "react-slick";
import { EventType } from "@/types/EventType";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ArrowBack, ArrowForward, CachedOutlined } from "@mui/icons-material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
        <div>
          <CarouselComponents />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center pb-20 mt-3">
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
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="section-title pb-20">
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "35px",
                    fontWeight: "bold",
                    color: "#152955",
                  }}
                >
                  Loket Screen
                </span>
                <p className="text"></p>
              </div>
              <CarouselLoketScreen />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const FetchEventList = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
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
          <div className="col-md-12">
            <Slider
              autoplay={false}
              autoplaySpeed={3000}
              infinite={true}
              accessibility={false}
              arrows={true}
              centerMode={isMobile ? false : true}
              slidesToShow={isMobile ? 1 : 3}
              centerPadding="50px"
              nextArrow={<ArrowForward sx={{ color: "#152955" }} />}
              prevArrow={<ArrowBack sx={{ color: "#152955" }} />}
            >
              {data?.data.map((event: EventType) => (
                <EventList key={event.id} value={event} />
              ))}
            </Slider>
          </div>

          <div className="col-md-12 text-center mt-5">
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
              }}
              startIcon={<CachedOutlined />}
            >
              <Typography
                sx={{ fontWeight: "bold" }}
                fontFamily={"monospace"}
                color={"white"}
              >
                Load more ...
              </Typography>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const CarouselComponents: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        autoplay={true}
        autoplaySpeed={3000}
        accessibility={false}
        arrows={false}
        centerMode={isMobile ? false : true}
        slidesToShow={isMobile ? 1 : 3}
        className="mx-2"
      >
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className="img-thumbnail"
            style={{ width: "100%", height: "50%" }}
            src="https://api.yesplis.com/images/banner/8e78db2964bc29686b1c0ac1dfc4e985678d6220.png.webp"
          />
        </Grid>
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className="img-thumbnail"
            style={{ width: "100%", height: "50%" }}
            src="https://api.yesplis.com/images/banner/1313f5deb522848001ffd55058092671d8cae4c8.png.webp"
          />
        </Grid>
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className="img-thumbnail"
            style={{ width: "100%", height: "50%" }}
            src="https://api.yesplis.com/images/banner/50eb493c779b4b8e6b268eab1a6484b5a29fcb1f.png.webp"
          />
        </Grid>
      </Slider>
    </Box>
  );
};

const CarouselLoketScreen: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid container sx={{ padding: 0 }}>
      <Grid item xs={12} md={12} sx={{ padding: 0, margin: 0 }}>
        <Slider
          autoplay={true}
          autoplaySpeed={3000}
          infinite={true}
          accessibility={false}
          arrows={true}
          centerMode={isMobile ? false : true}
          slidesToShow={isMobile ? 2 : 3}
          centerPadding="50px"
          nextArrow={<ArrowForward sx={{ color: "#152955" }} />}
          prevArrow={<ArrowBack sx={{ color: "#152955" }} />}
        >
          <div>
            <Card
              elevation={3}
              sx={{ borderRadius: 5, marginX: 0.5, width: "90%" }}
            >
              <CardMedia
                style={{ height: "100", paddingTop: "50vh" }}
                image="/vina.jpg"
              />
            </Card>
          </div>
          <div>
            <Card
              elevation={3}
              sx={{ borderRadius: 5, marginX: 0.5, width: "90%" }}
            >
              <CardMedia
                style={{ height: "100", paddingTop: "50vh" }}
                image="/test.jpg"
              />
            </Card>
          </div>
          <div>
            <Card
              elevation={3}
              sx={{ borderRadius: 5, marginX: 0.5, width: "90%" }}
            >
              <CardMedia
                style={{ height: "100", paddingTop: "50vh" }}
                image="/haikyu.jpg"
              />
            </Card>
          </div>
        </Slider>
      </Grid>
    </Grid>
  );
};
