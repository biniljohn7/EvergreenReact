import styled from "styled-components";
import mediaBg from "../../../assets/images/gift-net.png";

export const Wrapper = styled.div`

    background-color:#fff;
    
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


        .no-content {
            width: 100%;
            text-align: center;
            padding: 150px 0;
            
            &.show-more{
                padding:30px 0;
            }
        }

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

                .gift-above-btn {
                    padding-left: 15px;
                    color: #925da1;
                    font-size: 15px;

                    p {
                        margin: 0;
                        padding: 5px;
                    }
                    
                    .gift-note {
                        text-transform: uppercase;
                        display: inline-block;
                        background-color: #f3e9f5;
                        color: #560c6e;
                        font-size: 12px;
                        padding: 5px 15px;
                        border-radius: 50px;
                    }
                    .gift-worth {
                        color: #5b2166;

                        span {
                            font-size: 24px;
                        }
                    }
                }
                
                .btn-container {
                    text-align: center;
                    border-top: dashed 3px #d9c6dd;
                    padding-top: 20px;
                }

            }
        }
    }
    
    .btn-main{
        margin: 0 5px;
        line-height: 30px;
        border: 0;
        border-radius: 25px;
        padding: 5px 35px;
        text-transform: uppercase;
        font-size: 12px;
    }

    .btn-purple{
        background-color: #500c68;
        color: #fff;
        &:hover{
            background-color: #6f0295;
        }
    }
    .btn-plain{
        background-color: #d0b8d7;
        color: #500c68;
    }
    .btn-del:hover{
        background-color: #c00;
        color: #fff;
    }
    .btn-long{
        padding:7px 50px;
    }
`