useEffect(() => {
  const getMedias = async () => {
    const { response, err } = await mediaApi.getList({
      mediaType,
      mediaCategory,
      page: 1,
    });

    console.log("API Response:", response);
    console.log("API Error:", err);

    if (response && Array.isArray(response.results)) {
      console.log("Media results are valid:", response.results);
      setMedias(response.results);
    } else {
      console.warn("Invalid media results, setting medias to empty array.");
      setMedias([]); // Fallback to empty
    }
  };

  getMedias();
}, [mediaType, mediaCategory]);
