export const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    const imageToLoad = new Image();
    imageToLoad.src = image;
    imageToLoad.onload = () => {
      resolve(imageToLoad);
    };
    imageToLoad.onerror = (error) => reject(error);
  });
};

export const inBetween = (max, min, status) => !!(min <= status && status <= max);

export const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTg5NTgwMSwiZXhwIjoxOTM1NDcxODAxfQ.cWy3o6eoT-s_xHeQsb-TEKuQFWm27l-hyEs0FzGKtyE";

export const BASE_URL = "https://yymklxbmdokoeuqykqtv.supabase.co/rest/v1/";
