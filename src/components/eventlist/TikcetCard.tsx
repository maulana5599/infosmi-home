import { EventTicketType } from "@/types/EventType";
import { Remove } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useState } from "react";
import formatRupiah from "../utils/Rupiah";

type TikcetCardProps = {
  value: EventTicketType;
  addTicket: (e: React.MouseEvent<HTMLButtonElement>, tiket: any) => void;
  removeTicket: (e: React.MouseEvent<HTMLButtonElement>, tiket: any) => void;
};

const TicketCard: React.FC<TikcetCardProps> = ({
  value,
  addTicket,
  removeTicket,
}: TikcetCardProps) => {
  const price = formatRupiah(value.biaya_tiket);
  return (
    <>
      <Card className="mt-2" elevation={3}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    fontFamily={"monospace"}
                    gutterBottom
                    component="p"
                  >
                    {value.nama_tiket}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    fontFamily={"monospace"}
                    gutterBottom
                    component="p"
                  >
                    {price}
                  </Typography>
                </div>
                <div>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={(e: any) => removeTicket(e, value)}
                  >
                    <Remove />
                  </IconButton>
                  <Input
                    value={value.counter_tiket ?? 0}
                    inputProps={{ style: { textAlign: "center" } }}
                    sx={{ width: 20, height: 20 }}
                  />
                  <IconButton
                    aria-label="add"
                    color="primary"
                    onClick={(e: any) => addTicket(e, value)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default TicketCard;
