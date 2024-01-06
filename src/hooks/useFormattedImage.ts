export function useFormattedImage() {

    function isImageURL(imageURL: string) {
        return imageURL.includes('http')
    }

    return {
        isImageURL
    }
}