import EventList from "@/components/eventlist/ListEvent";
import Layout from "@/components/Layout";
import { Skeleton, Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
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
  const fetchEvent = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

  if (isError) {
    return (
      <div>
        <Typography>Terjadi kesalahan</Typography>
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <>
          {data.map((event: any) => (
            <EventList key={event.id} />
          ))}
        </>
      )}
    </>
  );
};
