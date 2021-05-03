export const loadImage = (image) => {
    return new Promise((resolve, reject) => {
        const imageToLoad = new Image();
        imageToLoad.src = image;
        imageToLoad.onload = () => {
            resolve(image);
        };
        imageToLoad.onerror = (error) => reject(error);
    });
};

export const inBetween = (max, min, status) => !!(min <= status && status <= max);
