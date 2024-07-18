import EventList from "@/components/eventlist/ListEvent";
import Layout from "@/components/Layout";
import { EventType } from "@/types/EventType";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Link from "next/link";

export default function TicketPage() {
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
          <div className="row">
            <div className="col-md-12">
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
                    Loket Screen
                  </span>
                </div>
              </div>
            </div>
          </div>
          <QueryClientProvider client={queryClient}>
            <FetchEventList />
          </QueryClientProvider>
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
        <div className="row">
          {data?.data.map((event: EventType) => (
            <Link
              className="col-sm-12 col-md-4 mb-3"
              key={event.id}
              href={`/detail-event/${event.slug}`}
              passHref
            >
              <Card
                elevation={3}
                sx={{
                  borderRadius: 5,
                  marginX: 0.5,
                  width: "100%",
                  minHeight: isMobile ? "350px" : "400px",
                  maxHeight: isMobile ? "400px" : "500px",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  style={{ height: "100", paddingTop: "30vh"}}
                  image={`${process.env.NEXT_PUBLIC_BASE_URL}storage/images/${event?.foto}`}
                />
                <CardContent>
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"monospace"}
                    gutterBottom
                    component="p"
                  >
                    {event?.kegiatan_nama}
                  </Typography>
                  <Typography
                    fontFamily={"monospace"}
                    gutterBottom
                    component="p"
                  >
                    {new Date(event?.tanggal_event as string).toDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
