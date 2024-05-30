import EventList from "@/components/eventlist/ListEvent";
import Layout from "@/components/Layout";
import { EventType } from "@/types/EventType";
import { Skeleton, Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import axios from 'axios';
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
  }: { data: any; isError: any; isLoading: any, error: any } = useQuery({
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
