import { createElement } from "../helpers/elementFactories.js";

const createSlide = (imageSrc, isFancyBox, category, id) => {
  const commonAttributes = {
    class: "product-slider__image-ibg",
  };

  const fancyBoxAttributes = {
    class: "main__image-ibg_contain",
    "data-fancybox": "gallery",
    "data-src": `images/products/${category}/${id}/${imageSrc}`,
  };

  const slideContent = createElement({
    typeElement: "div",
    attributes: isFancyBox ? fancyBoxAttributes : commonAttributes,
    innerHTML: `
			<img src='images/products/${category}/${id}/${imageSrc}' alt=''>
		`,
  });

  return createElement({
    typeElement: "div",
    attributes: { class: "swiper-slide" },
    children: [slideContent],
  });
};

const createSlider = (images, isFancyBox, category, id) => {
  const slides = images.map((img) =>
    createSlide(img, isFancyBox, category, id)
  );

  return createElement({
    typeElement: "div",
    attributes: { class: "swiper-wrapper" },
    children: slides,
  });
};

export default createSlider;
