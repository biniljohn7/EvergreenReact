import Wrapper from "../newpage.style";
import img1 from "../../../assets/images/gallery/gallery-img-1.png";
import img2 from "../../../assets/images/gallery/gallery-img-2.png";
import img3 from "../../../assets/images/gallery/gallery-img-3.png";
const GalleryOne = () => {
    return(
        <Wrapper>
            <dir className="container">
                <div className="gallery-one">
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

export default GalleryOne;