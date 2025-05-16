import Wrapper from "../newpage.style";
import img1 from "../../../assets/images/gallery/gallery-img-4.png";
import img2 from "../../../assets/images/gallery/gallery-img-5.png";
import img3 from "../../../assets/images/gallery/gallery-img-6.png";
const GalleryTwo = () => {
    return(
        <Wrapper>
            <dir className="container">
                <div className="gallery-two">
                    <div className="gallery-box">
                        <div className="image-box">
                            <img src={img1} alt="gallery" />
                        </div>
                        <div className="image-box">
                            <img src={img2} alt="gallery" />
                        </div>
                        <div className="image-box">
                            <img src={img3} alt="gallery" />
                        </div>
                    </div>
                </div>
            </dir>
        </Wrapper>
    );
}

export default GalleryTwo;