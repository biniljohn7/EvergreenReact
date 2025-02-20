import Wrapper from "../newpage.style";
import img1 from "../../../assets/images/gallery/gallery-img-7.png";
import img2 from "../../../assets/images/gallery/gallery-img-8.png";
import img3 from "../../../assets/images/gallery/gallery-img-9.png";
import img4 from "../../../assets/images/gallery/gallery-img-10.png";
const GalleryThree = () => {
    return(
        <Wrapper>
            <dir className="container">
                <div className="gallery-three">
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
                        <div className="image-box">
                            <img src={img4} alt="gallery" />
                        </div>
                    </div>
                </div>
            </dir>
        </Wrapper>
    );
}

export default GalleryThree;