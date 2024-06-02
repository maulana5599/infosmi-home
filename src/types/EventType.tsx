export interface EventType {
  id: number;
  kegiatan_nama: string;
  tanggal_event: string;
  deskripsi: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  slug: string;
  foto: string;
}

export interface EventDetailsType {
  kegiatan_id: string;
  kegiatan: {
    id: number;
    kegiatan_nama: string;
  };
}

export interface EventTicketType {
  biaya_tiket: number;
  jumlah_tiket: number;
  kegiatan_id: number;
  nama_tiket:  string;
  tiket_id: number;
  counter_tiket: number;
}
