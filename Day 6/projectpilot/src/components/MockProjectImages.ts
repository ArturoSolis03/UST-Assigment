
const mockImageUrls: string[] = [
  "/assets/placeimg_500_300_arch1.jpg",
  "/assets/placeimg_500_300_arch2.jpg",
      "/assets/placeimg_500_300_arch3.jpg",
      "/assets/placeimg_500_300_arch4.jpg",
      "/assets/placeimg_500_300_arch5.jpg",
      "/assets/placeimg_500_300_arch6.jpg",
      "/assets/placeimg_500_300_arch7.jpg",
      "/assets/placeimg_500_300_arch8.jpg",
      "/assets/placeimg_500_300_arch9.jpg",
      "/assets/placeimg_500_300_arch10.jpg",
      "/assets/placeimg_500_300_arch11.jpg",
      "/assets/placeimg_500_300_arch12.jpg",
];
 
export function getRandomImageUrl() {
  const randomIndex = Math.floor(Math.random() * mockImageUrls.length);
  return mockImageUrls[randomIndex];
}