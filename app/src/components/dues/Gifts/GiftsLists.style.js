import styled from "styled-components";
import mediaBg from "../../../assets/images/gift-net.png";

export const Wrapper = styled.div`

    background-color:#ff9;

    .no-content{
        width: 100%;
        text-align: center;
        padding: 150px 0;
    }
    .gift-container{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        margin: 0 -15px;

        .gift-wrapper {
            border: #500c68 1px solid;
            border-radius: 50px;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            margin: 20px 15px 0 15px;
            width: calc(50% - 30px);

            @media only screen and (max-width:991px) {
                width: 100%;
            }
            @media only screen and (max-width:480px) {
                flex-direction: column;
            }
            
            .gift-media {
                width: 35%;
                border-radius: 48px;
                position: relative;
                background-size: 100%;
                background-position: bottom, center;
                background-repeat: repeat-x;
                padding-bottom: 15px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                @media only screen and (max-width:640px) {
                    width: 40%;
                    background-size: 100%;
                }
                @media only screen and (max-width:480px) {
                    width: 100%;
                    background-size: 100%;
                    padding-bottom: 10px;
                }

                img {
                    width: 80%;
                    max-width: 300px;
                    margin: 0 auto;
                    margin-bottom: 20px;
                }

                .gift-validity {
                    display: inline-block;
                    background-color: #fff;
                    width: 100px;
                    margin: 0 auto;
                    margin-top: -20px;
                    line-height: 24px;
                    font-size: 12px;
                    text-transform: uppercase;
                    border-radius: 15px;
                    font-weight: bold;
                    text-align: center;
                }
            }
            .gift-content {
                width: 62%;
                margin-left: 2%;
                padding: 20px 0;
            }
        }
    }
`