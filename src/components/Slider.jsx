import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  {
    id: 1,
    name: "Producto 1",
    image:
      "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/laptops/list-d14.jpg",
  },
  {
    id: 2,
    name: "Producto 2",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_807085-MLA48914822861_012022-V.jpg",
  },
  {
    id: 3,
    name: "Producto 3",
    image:
      "https://www.incimages.com/uploaded_files/image/1920x1080/getty_1208082286_427081.jpg",
  },
  // agregar más productos si es necesario
];
function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} width="200px" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
