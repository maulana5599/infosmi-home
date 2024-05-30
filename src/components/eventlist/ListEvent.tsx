import { EventType } from "@/types/EventType";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ListProps {
  value?: EventType;
}

const EventList: React.FC<ListProps> = ({ value }: ListProps) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div
        className="single-features text-center mt-30 wow fadeIn"
        data-wow-duration="1s"
        data-wow-delay="0s"
      >
        <div className="features-icon">
          <Image
            width={350}
            height={150}
            className="img-thumbnail"
            src={`http://localhost:8084/storage/images/${value?.foto}`}
            alt={value?.foto ?? "image-default"}
          />
        </div>
        <div className="features-content">
          <h4 className="features-title height-custom">
            <Link href={`/detail-event/${value?.slug}`}>
              {value?.kegiatan_nama}
            </Link>
          </h4>
          <p className="text" />
        </div>
        <div className="mt-2">
          <div className="pricing-btn">
            <Link className="main-btn" href={`/detail-event/${value?.slug}`}>
              Buy Ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
