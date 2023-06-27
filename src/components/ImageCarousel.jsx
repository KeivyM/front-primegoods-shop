import React, { useEffect, useRef, useState } from "react";
import Zoom from "react-medium-image-zoom";
import { CardMedia, Grid } from "@mui/material";
import "../css/ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(0, images.length);

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      }
    }
  };

  // const handleRightClick = () => {
  //   if (images && images.length > 0) {
  //     let newIdx = selectedImageIndex + 1;
  //     if (newIdx >= images.length) {
  //       newIdx = 0;
  //     }
  //     handleSelectedImageChange(newIdx);
  //   }
  // };

  // const handleLeftClick = () => {
  //   if (images && images.length > 0) {
  //     let newIdx = selectedImageIndex - 1;
  //     if (newIdx < 0) {
  //       newIdx = images.length - 1;
  //     }
  //     handleSelectedImageChange(newIdx);
  //   }
  // };

  return (
    <>
      {/* <h2 className="header">Image Carousel</h2> */}
      {/* <div className="selected-image" style={{ backgroundImage: `url(${selectedImage?.url})` }} /> */}
      <Grid
        item
        sx={{
          border: "1px solid #0005",
          p: 1,
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Zoom>
          <CardMedia
            component="img"
            image={selectedImage?.url}
            alt={`Image-${selectedImage?.id}`}
            sx={{
              // maxWidth: "600px",
              // maxHeight: "600px",
              // width: "600px",
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
              // margin: "0 auto",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          />
        </Zoom>
      </Grid>
      <Grid
        container
        flexDirection={"row"}
        gap={1}
        sx={{
          background: "#ccc8",
          border: "1px solid #aaa",
          // borderRadius: "0 0 5px 15px ",
          overflow: "hidden",
          flexWrap: "nowrap",
          position: "relative",
          p: 2,
        }}
      >
        {/* <div className="carousel"> */}
        {images &&
          images.map((image, idx) => (
            <Grid
              item
              sx={{
                borderRadius: "10px",
                filter: "contrast(90%)",
                "&:hover": {
                  cursor: "pointer",
                  filter: "contrast(100%)",
                },
              }}
              key={idx}
            >
              <img
                src={image.url}
                alt="dhgjgf"
                width="100px"
                height="100px"
                style={{
                  objectFit: "cover",
                  userSelect: "none",
                  borderRadius: "5px",
                  border: "1px solid #bbb",
                }}
                // onClick={() => handleImageSelected(i)}
                className={`carousel__image ${selectedImageIndex === idx && "carousel__image-selected"}`}
                ref={(el) => (carouselItemsRef.current[idx] = el)}
                onClick={() => handleSelectedImageChange(idx)}
              />
            </Grid>
          ))}
      </Grid>
      {/* <div className="carousel__images">
          {images &&
            images.map((image, idx) => (
              <div
                onClick={() => handleSelectedImageChange(idx)}
                style={{ backgroundImage: `url(${image.url})` }}
                key={image.id}
                className={`carousel__image ${selectedImageIndex === idx && "carousel__image-selected"}`}
                ref={(el) => (carouselItemsRef.current[idx] = el)}
              />
            ))}
        </div> */}
      {/* <button className="carousel__button carousel__button-left" onClick={handleLeftClick}>
          Prev
        </button>
        <button className="carousel__button carousel__button-right" onClick={handleRightClick}>
          Next
        </button> */}
      {/* </div> */}
    </>
  );
};

export default ImageCarousel;
