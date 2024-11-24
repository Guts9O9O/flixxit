import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      try {
        const { response, err } = await mediaApi.getList({
          mediaType,
          mediaCategory,
          page: 1,
        });

        console.log("API Response:", response); // Debugging the response
        console.log("Error:", err);

        if (response && Array.isArray(response.results)) {
          setMedias(response.results); // Update state only if results is an array
        } else {
          setMedias([]); // Set to an empty array as a fallback
          toast.error(err?.message || "Failed to fetch media");
        }
      } catch (error) {
        console.error("Error fetching medias:", error);
        toast.error("An unexpected error occurred.");
      }
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias && medias.length > 0 ? (
        medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))
      ) : (
        <div>Loading or no media available.</div>
      )}
    </AutoSwiper>
  );
};

export default MediaSlide;
