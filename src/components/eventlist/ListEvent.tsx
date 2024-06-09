import { EventType } from "@/types/EventType";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ListProps {
  value?: EventType;
}

const EventList: React.FC<ListProps> = ({ value }: ListProps) => {
  return (
    <div className="p-1">
      <Link
        href={`/detail-event/${value?.slug}`}
        className="wow fadeIn"
        data-wow-duration="1s"
        data-wow-delay="0s"
        style={{ width: "100%", cursor: "pointer" }}
      >
        <Card
          sx={{ borderRadius: 3, marginTop: 3, height: "350px", marginX: 2 }}
          elevation={3}
        >
          <CardMedia
            component="img"
            image={`${process.env.NEXT_PUBLIC_BASE_URL}storage/images/${value?.foto}`}
            style={{ width: "100%", height: "200px" }}
            alt="Paella dish"
            loading="lazy"
          />
          <CardContent>
            <Box maxHeight={"100px"}>
              <Typography
                fontWeight={"bold"}
                fontFamily={"monospace"}
                gutterBottom
                component="p"
              >
                {value?.kegiatan_nama.slice(0, 20) + "..."}
              </Typography>
              <Typography fontFamily={"monospace"} gutterBottom component="p">
                {new Date(value?.tanggal_event as string).toDateString()}
              </Typography>
            </Box>
            <hr />
            <Box>
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Grid>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vh"
                    style={{ width: "40px", height: "40px" }}
                    src="/profile.webp"
                    alt="vina"
                  />
                </Grid>
                <Grid>
                  <Typography
                    fontFamily={"monospace"}
                    gutterBottom
                    component="p"
                    className="mt-2 mx-2"
                  >
                    PT Visinema Group
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default EventList;
