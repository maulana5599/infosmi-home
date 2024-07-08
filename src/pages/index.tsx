import EventList from "@/components/eventlist/ListEvent";
import Layout from "@/components/Layout";
import Slider from "react-slick";
import Image from "next/image";
import { EventType } from "@/types/EventType";
import {
  Box,
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
import { ArrowBack, ArrowForward, ArrowForwardIos } from "@mui/icons-material";
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
        <div className="mb-5">
          <CarouselComponents />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title pb-2 mt-3">
                <div>
                  <span
                    className="text-custom p-0"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "#152955",
                    }}
                  >
                    Rekomendasi Event Pilihan
                  </span>
                  <p>Find your favorite events, and let's have fun</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center events-list">
            <QueryClientProvider client={queryClient}>
              <FetchEventList />
            </QueryClientProvider>
          </div>
          <div className="row" style={{ marginTop: 50, marginBottom: 50 }}>
            <div className="col-md-12">
              <Image
                width={0}
                height={0}
                sizes="100vh"
                style={{ width: "100%", height: "120px", borderRadius: 20 }}
                src={"/adsense.jpg"}
                alt="adsense"
                className="img-thumbnail"
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="section-title pb-20 d-flex justify-content-between align-items-center">
                <div>
                  <span
                    className="text-custom"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "#152955",
                    }}
                  >
                    LOKET Screen
                  </span>
                </div>
                <div
                  className="font-weight-medium"
                  style={{ cursor: "pointer", color: "#152955" }}
                >
                  Lihat Semua <ArrowForwardIos />{" "}
                </div>
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
          <div className="p-2">
            <img
              style={{
                width: "100%",
                height: "50%",
                maxHeight: "450px",
                borderRadius: 20,
              }}
              src="https://api.yesplis.com/images/banner/8e78db2964bc29686b1c0ac1dfc4e985678d6220.png.webp"
            />
          </div>
        </Grid>
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <div className="p-2">
            <img
              style={{
                width: "100%",
                height: "50%",
                maxHeight: "450px",
                borderRadius: 20,
              }}
              src="https://api.yesplis.com/images/banner/1313f5deb522848001ffd55058092671d8cae4c8.png.webp"
            />
          </div>
        </Grid>
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <div className="p-2">
            <img
              style={{
                width: "100%",
                height: "50%",
                maxHeight: "450px",
                borderRadius: 20,
              }}
              src="https://api.yesplis.com/images/banner/50eb493c779b4b8e6b268eab1a6484b5a29fcb1f.png.webp"
            />
          </div>
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
