import styled from 'styled-components'

const SupportWp = styled.div`
.fl-box {
    display:flex;
    flex-wrap:wrap;

    @media screen and (max-width:767px){
        display:block;
    }

    .form-box {
        width:40%;
        max-width:600px;

        @media screen and (max-width:767px){
            width:auto;
            max-width:none;
        }
    }
    .map-box {
        flex:1 1 0;
        margin-left:100px;
        position:relative;
        display:flex;
        flex-direction:column;

        @media screen and (max-width:1024px){
            margin-left:40px;
        }

        .loc-address {
            margin-bottom:20px;
        }

        @media screen and (min-width:768px){
            .locmap {
                position:relative !important;
                flex:1 1 0;
            }
        }

        @media screen and (max-width:767px){
            margin-top:40px;
            margin-left:0;

            .locmap {
                position: relative !important;
                width:auto !important;
                height:auto !important;

                > div {
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                }

                &::after {
                    content:'';
                    display:block;
                    padding-top:70%;
                }
            }
        }
    }
}
`;

export default SupportWp;